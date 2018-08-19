"use strict";
const IssuesCommand = require( "./IssuesCommand.js" );

module.exports.factory = function( services )
{
  let github = services.get( "github" );

  return new IssuesCommand( github );
}
