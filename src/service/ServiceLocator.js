const path = require( "path" );

/**
 * Creates, provides and manages services
 */
class ServiceLocator
{
	/**
	 * @param {Object} config - Configuration for all available services
	 */
	constructor( config = {} )
	{
		this.config = config;
		this.services = new Map();
	}

	/**
	 * Create and initialize an service object
	 * 
	 * @private
	 * @param {string} name - Name of the service
	 * 
	 * @return {Service} Service object
	 */
	_createService( name )
	{
		let config = this.config[ name ];
		if( config === undefined ) { throw `'${name}' is an unknown service`; }
		let serviceFactory = require( path.resolve( global.__basedir, `${config.factory}` ) );
		let service = serviceFactory.factory( this, config );
		
		service.init();
		
		return service;
	}

	/**
	 * Request an service object
	 * 
	 * @param {string} name - Name of the service
	 * 
	 * @return {Service} Service object
	 */	
	get( name )
	{
		let service;

		if( this.services.has( name ) )
		{
			service = this.services.get( name );
		}
		else
		{
			service = this._createService( name );
			this.services.set( name, service );
		}
		return service;
	}
}
module.exports = ServiceLocator;
