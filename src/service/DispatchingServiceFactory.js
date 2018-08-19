const DispatchingService = require( "./DispatchingService.js" );

module.exports.factory = function( services, config = {} )
{
  let discord = services.get( "discord" );
  let service = new DispatchingService( discord, config );
  service.init();

  return service;
}
