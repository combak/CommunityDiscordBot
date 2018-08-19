"use strict";
const path = require( "path" );
const Service = require( "./Service.js" );

class DispatchingService extends Service
{
  constructor( services, config = {} )
  {
    super( config );

    this.services = services;
    this.discord = services.get( "discord" );
  }

  init()
  {
    this.listenOnChannels = [];

    this.config.commands.forEach( element => {
      element.listenOnChannels.forEach( channel => this.listenOnChannels.push( channel ) );
      element.commands.forEach( command => this.discord.client.commands.set( command, element ) );
    });
  }

  dispatch( message )
  {
    if( !this.listenOnChannels.includes( message.channel.id ) ) return;

    message.delete( 10000 );

    let cmdString = message.content.replace(/ .*/,'').slice( 1 );
    message.content = message.content.slice( cmdString.length + 2 );
    let command = this.discord.client.commands.get( cmdString );

    if( command === undefined )
    {
      return message.channel.send( `Ich befürchte, dass ich das nicht tun kann, ${message.author.username}` )
        .then( msg => msg.delete( 10000 ) );
    }
    let factory = require( path.resolve( __basedir, `${command.factory}`) );
    factory.factory( this.services ).execute( message );
  }
}
module.exports = DispatchingService;
