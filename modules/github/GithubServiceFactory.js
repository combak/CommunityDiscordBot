const GithubService = require( "./GithubService.js" );

/**
 * Create the github service object
 * 
 * @param {ServiceLocator} services - service locator object 
 * @param {Object} config - Service configuration
 * 
 * @return	{GithubService} Discord service object
 */
module.exports.factory = function( services, config = {} )
{
  let service = new GithubService( config );
  service.init();

  return service;
};
