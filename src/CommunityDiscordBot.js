"use strict";
const Discord = require( "discord.js" );
const Dispatcher = require( "./Dispatcher.js" );

class CommunityDiscordBot
{
  constructor( config = {} )
  {
    this.config = config;

    this.bot = new Discord.Client();
    this.bot.commands = new Discord.Collection();

    this.dispatcher = new Dispatcher( this.bot, this.config.dispatcher, this.config.modules );
  }

  init()
  {
    //Dispatcher
    this.dispatcher.init();

    //Discord Client (Bot)
    this.bot.on( "ready", async () => console.log( `${this.bot.user.username} is online.`) );
    this.bot.on( "message", async message => {
      if( message.author.bot ) return;
      if( message.content.charAt(0) != this.config.command.prefix ) return;

      //Dispatch Request
      this.dispatcher.dispatch( message );
     });
  }

  listen()
  {
    this.bot.login( this.config.discord.auth.token )
      .catch( err => console.log( err ) );
  }
}
module.exports = CommunityDiscordBot;
