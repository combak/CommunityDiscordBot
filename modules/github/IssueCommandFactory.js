"use strict";
const IssueCommand = require( "./IssueCommand.js" );

module.exports.factory = function( services )
{
  let github = services.get( "github" );

  return new IssueCommand( github );
}
