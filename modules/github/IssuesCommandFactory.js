const IssuesCommand = require( "./IssuesCommand.js" );

/**
 * Create the issues command object
 * 
 * @param {ServiceLocator} services - service locator object 
 * @param {Object} config - Service configuration
 * 
 * @return	{IssuesCommand} Discord service object
 */
module.exports.factory = function( services, options = {} )
{
  let github = services.get( "github" );

  return new IssuesCommand( github );
};
