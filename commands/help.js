const Discord = require("discord.js");

module.exports.props = {
  name: "help"
};

module.exports.execute = async (bot, message, args) => {
  let helpEmbed = new Discord.RichEmbed()
    .setDescription( "Commands" )
    .addField( `@${bot.user.username} issue <title>;<text>`, "Postet ein Issue auf Github." );

  message.channel.send( helpEmbed );
};
