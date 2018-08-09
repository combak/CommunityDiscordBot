const Discord = require( "discord.js" );
const Github = require( "github-api" );
const config = require( "../config.json" );
const auth = require( "../auth.json" );

const git = new Github({
    username: auth.github.user,
    token: auth.github.token
});

module.exports.props = {
  name: "issue"
};

module.exports.execute = async (bot, message, args) => {
  let parts = args.join( " " ).split( ";" );
  let issue = git.getIssues("DerOli82","test");

  issue.createIssue({
      "title": parts[0],
      "body": `**Issue posted by ${message.author.username}:**\r\n${parts[1]}`
    });
};
