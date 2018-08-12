const Github = require( "github-api" );

module.exports.props = {
  name: "issue",
  help: "!issue <titel>;<beschreibung>"
};

module.exports.execute = async (cdb, message, args) => {
  let git = new Github( cdb.auth.github );
  let parts = args.join( " " ).split( ";" );

  console.log( parts );
  console.log( parts.length );
  if( parts.length != 2 )
  {
    return message.channel.send( "!issue <titel>;<beschreibung>" )
      .then( msg => msg.delete( 60000 ));
  }
  cdb.config.github.repositories.forEach( repo => {
    if( repo.listenOnChannels.includes( message.channel.id ) )
    {
      let issue = git.getIssues( repo.owner, repo.name );
      issue.createIssue({
        "title": parts[0],
        "body": `**Issue posted by ${message.author.username}:**\r\n${parts[1]}`
      });
    }
  });
};
