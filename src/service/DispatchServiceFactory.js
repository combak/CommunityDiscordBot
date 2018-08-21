const DispatchService = require( "./DispatchService.js" );

/**
 * Create the dispatcher service object
 * 
 * @param {ServiceLocator} services - service locator object 
 * @param {Object} config - Service configuration
 * 
 * @return {DispatchService} Discord service object
 */
module.exports.factory = function( services, config = {} )
{
	return new DispatchService( services, config );
};
