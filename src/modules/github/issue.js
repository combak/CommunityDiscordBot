const Github = require( "github-api" );

module.exports.props = {
  name: "issue",
  help: "!issue <titel>;<beschreibung>"
};

module.exports.execute = ( message, config ) => {
  let git = new Github( config.auth );
  let args = message.content.split( ";" );

  if( args.length < 2 )
  {
    return message.channel.send({embed:{
      title: "Verwendung",
      description: "!issue <titel>;<beschreibung>"
    }})
    .then( msg => msg.delete( 32000 ) );
  }
  config.repositories.forEach( repo => {
    if( repo.listenOnChannels.includes( message.channel.id ) )
    {
      let issue = git.getIssues( repo.owner, repo.name );
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
};
