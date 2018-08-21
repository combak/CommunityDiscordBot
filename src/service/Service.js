/**
 * Service "interface"
 */
class Service
{
	/**
	 * @param {Object} config - Service configuration.
	 */
	constructor( config = {} )
	{
		this.config = config;
	}

	/**
	 * Initialize this service.
	 */
	init() {}
}
module.exports = Service;
