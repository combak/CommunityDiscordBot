"use strict";

class Dispatcher
{
  constructor( bot, config = {}, modules = {} )
  {
    this.bot = bot;
    this.config = config;
    this.modules = modules;
    this.listenOnChannels = [];
  }

  init()
  {
    this.config.forEach( element => {
      element.listenOnChannels.forEach( channel => this.listenOnChannels.push( channel ) );
      element.commands.forEach( command => this.bot.commands.set( command, element ) );
    });
  }

  dispatch( message )
  {
    if( !this.listenOnChannels.includes( message.channel.id ) ) return;

    message.delete( 10000 );

    let cmdString = message.content.replace(/ .*/,'').slice( 1 );
    message.content = message.content.slice( cmdString.length + 2 );
    let command = this.bot.commands.get( cmdString );

    if( command === undefined )
    {
      return message.channel.send( `Ich befürchte, dass ich das nicht tun kann, ${message.author.username}` )
        .then( msg => msg.delete( 10000 ) );
    }
    let action = require( `./modules/${command.module}/${command.action}`);
    action.execute( message, this.modules[ command.module ] );
  }
}
module.exports = Dispatcher;
