"use strict";
const path = require( "path" );
const ServiceLocator = require( path.resolve( __srcdir, "service/ServiceLocator.js" ) );

class CommunityDiscordBot
{
  constructor( config = {} )
  {
    this.config = config;
    this.services = new ServiceLocator( this.config.services );
  }

  init()
  {
    this.discord = this.services.get( "discord" );
    this.dispatcher = this.services.get( "dispatcher" );

    //Discord Client (Bot)
    this.discord.client.on( "ready", async () => {
      console.log( `${this.discord.client.user.username} is online.`)
    });
    this.discord.client.on( "message", async message => {
      if( message.author.bot ) return;
      if( message.content.charAt(0) != this.config.command.prefix ) return;

      this.dispatcher.dispatch( message );
     });
  }

  listen()
  {
    this.discord.login()
      .catch( err => console.log( err ) );
  }
}
module.exports = CommunityDiscordBot;
