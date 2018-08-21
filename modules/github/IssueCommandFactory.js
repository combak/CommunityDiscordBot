const IssueCommand = require( "./IssueCommand.js" );

/**
 * Create the issue command object
 * 
 * @param {ServiceLocator} services - service locator object 
 * @param {Object} config - Service configuration
 * 
 * @return	{IssueCommand} Discord service object
 */
module.exports.factory = function( services, options = {} )
{
  let github = services.get( "github" );

  return new IssueCommand( github );
};
