"use strict"
const path = require( "path" );
const Discord = require( "discord.js" );
const Command = require( path.resolve( __srcdir, "command/Command.js" ) );

class IssuesCommand extends Command
{
  constructor( github )
  {
    super();

    this.github = github;
  }

  execute( message )
  {
    //let args = message.content.split( " " );
    
    this.github.getRepos().forEach( repo => {
      if( repo.listenOnChannels.includes( message.channel.id ) )
      {
        let issues = this.github.connection.getIssues( repo.owner, repo.name );
        issues.listIssues()
        .then( result => {
          let embed = new Discord.RichEmbed()
            .setTitle( `Offene Issues von ${message.author.username}` )
            .setColor( "66FF66");

          result.data.forEach( issue => {
            if( ( issue.user.login === message.author.username ) ||
              ( issue.body.includes( message.author.username ) ) )
            {
              let preview = issue.body.replace( `**Issue posted by ${message.author.username}:**`, "" );

              if( preview.length > 32 )
              {
                preview = preview.substr( 0, 32 ) + "...";
              }
              embed.addField( `${issue.title} - ${issue.html_url}`, preview );
            }
          });
          message.channel.send( embed )
            .then( msg => msg.delete( 32000 ) );
        });
      }
    });
  }
}
module.exports = IssuesCommand;
