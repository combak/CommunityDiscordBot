"use strict";
const DiscordService = require( "./DiscordService.js" );

module.exports.factory = function( services, config = {} )
{
  let service = new DiscordService( config );
  service.init();

  return service;
}
