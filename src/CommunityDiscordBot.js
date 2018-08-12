"use strict";
const Discord = require( "discord.js" );

class CommunityDiscordBot
{
  constructor( options = {} )
  {
    this.auth = options.auth;
    this.config = options.config;

    this.listenOnChannels = [];

    this.bot = new Discord.Client();
    this.bot.commands = new Discord.Collection();
  }

  init()
  {
    //Dispatcher
    this.config.dispatcher.forEach( element => {
      element.listenOnChannels.forEach( channel => this.listenOnChannels.push( channel ) );
      element.commands.forEach( command => this.bot.commands.set( command, element ) );
    });

    //Discord Client (Bot)
    this.bot.on( "ready", async () => console.log( `${this.bot.user.username} is online.`) );
    this.bot.on( "message", async message => {
      if( message.author.bot ) return;
      if( !this.listenOnChannels.includes( message.channel.id ) ) return;
      if( message.content.charAt(0) != this.config.command.prefix ) return;

      //Command + Args
      let content = message.content.substring( 1 );
      let args = content.split( " " );
      let command = args[0];
      args = args.slice(1);

      //Dispatch
      let commandConf = this.bot.commands.get( command );

      if( commandConf !== undefined )
      {
        let action = require( `./modules/${commandConf.module}/${commandConf.action}`);
        action.execute( this, message, args );
      }
      else
      {
        message.channel
          .send( `Ich befürchte, dass ich das nicht tun kann, ${message.author.username}` )
          .then( msg => msg.delete( 60000 ));
      }
      message.delete( 60000 );
    });
  }

  listen()
  {
    this.bot.login( this.auth.discord.token );
  }
}
module.exports = CommunityDiscordBot;
