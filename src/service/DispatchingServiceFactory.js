const DispatchingService = require( "./DispatchingService.js" );

module.exports.factory = function( services, config = {} )
{
  let service = new DispatchingService( services, config );
  service.init();

  return service;
}
