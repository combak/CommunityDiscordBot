"use strict";
const Discord = require( "discord.js" );
const Service = require( "./Service.js" );

class DiscordService extends Service
{
  init()
  {
    this.client = new Discord.Client();
    this.client.commands = new Discord.Collection();
  }

  login()
  {
    return this.client.login( this.config.auth.token );
  }
}
module.exports = DiscordService;
