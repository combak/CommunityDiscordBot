"use strict";
const GithubService = require( "./GithubService.js" );

module.exports.factory = function( services, config = {} )
{
  let service = new GithubService( config );
  service.init();

  return service;
}
