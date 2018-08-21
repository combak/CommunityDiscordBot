const DiscordService = require( "./DiscordService.js" );

/**
 * Create the discord service object
 * 
 * @param {ServiceLocator} services - service locator object 
 * @param {Object} config - Service configuration
 * 
 * @return	{DiscordService} Discord service object
 */
module.exports.factory = function( services, config = {} )
{
	return new DiscordService( config );
};
