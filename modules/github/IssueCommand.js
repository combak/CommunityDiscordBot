const path = require( "path" );
const Command = require( path.resolve( global.__srcdir, "command/Command.js" ) );

/**
 * Lists Github issues
 * 
 * @extends {Command}
 */
class IssueCommand extends Command
{
	/**
	 * @param {GithubService} github - Github service wrapper
	 * @param {Options} options - Not used yet
	 */	
	constructor( github, options = {} )
	{
		super( options );
		this.github = github;
	}

	/**
	 * @param {Discord.Message} message - Discord message
	 */	
	execute( message )
	{
		let args = message.content.split( ";" );

		if( args.length < 2 )
		{
			return message.channel.send({embed:{
				title: "Verwendung",
				description: "!issue <titel>;<beschreibung>"
			}})
			.then( msg => msg.delete( 32000 ) );
		}
		this.github.getRepos().forEach( repo => {
			if( repo.listenOnChannels.includes( message.channel.id ) )
			{
				let issue = this.github.connection.getIssues( repo.owner, repo.name );
				issue.createIssue({
					"title": args[0],
					"body": `**Issue posted by ${message.author.username}:**\r\n${args[1]}`
				})
				.then( result => {
					message.channel.send({embed:{
						title: "Erstellt",
						description: `${result.data.html_url}`
					}})
					.then( msg => msg.delete( 64000 ) );
				});
			}
		});
	}
}
module.exports = IssueCommand;
