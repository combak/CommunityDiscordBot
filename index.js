const config = require( "./config.json" );
const auth = require( "./auth.json" );
const fs = require( "fs" );
const Discord = require( "discord.js" );
const bot = new Discord.Client();

/* **********************************************************************
 * Init
 ********************************************************************** */

bot.commands = new Discord.Collection();

fs.readdir( "./commands/", (err,files) => {
  if( err ) console.log(err);
  let jsFiles = files.filter( file => file.endsWith( ".js" ));

  jsFiles.forEach( (file,index) => {
    let command = require( `./commands/${file}`);
    bot.commands.set(command.props.name, command );

    console.log( `${file} is loaded.` );
  });
});

bot.login( auth.discord.token );

/* **********************************************************************
 * Events
 ********************************************************************** */

bot.on( "ready", async () => {
  console.log( `${bot.user.username} is online.`);
});

bot.on("message", async message => {
  if( message.author.bot ) return;
  if( message.mentions.users.first() != bot.user ) return;
  if( !config.discord.listenOnChannels.includes( message.channel.id ) ) return;

  let args = message.content.split( " " );
  let command = bot.commands.get( args[1] );

  args = args.slice(2);

  if( command )
  {
    command.execute( bot, message, args );
  }
  else
  {
    message.channel.send( `Ich befürchte, dass ich das nicht tun kann, ${message.author.username}` );
  }
});
