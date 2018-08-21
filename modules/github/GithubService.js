const path = require( "path" );
const Github = require( "github-api" );
const Service = require( path.resolve( global.__srcdir, "service/Service.js" ) );

/**
 * @extends {Service}
 */
class GithubService extends Service
{
	/**
	 * Initilize Github connection
	 */
	init()
	{
		this.connection = new Github( this.config.auth );
	}

	/**
	 * Return available Repositories
	 */
	getRepos()
	{
		return this.config.repositories;
	}
}
module.exports = GithubService;
