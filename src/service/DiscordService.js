const Discord = require( "discord.js" );
const Service = require( "./Service.js" );

/**
 * Provides Discord connector and bot command collection
 * @extends {Service}
 */
class DiscordService extends Service
{
	/**
	 * @param {Object} config - Service configuration.
	 */
	constructor( config = {} )
	{
		super( config );
		
		this.client = new Discord.Client();
		this.client.commands = new Discord.Collection();
	}

	/**
	 * @return {Promise<string>} Token of the account used
	 */
	login()
	{
		return this.client.login( this.config.auth.token );
	}
}
module.exports = DiscordService;
