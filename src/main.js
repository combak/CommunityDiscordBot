const CommunityDiscordBot = require( "./CommunityDiscordBot" );
const cdb = new CommunityDiscordBot({
  auth: require( "../config/auth.json" ),
  config: require( "../config/config.json" )
});
cdb.init();
cdb.listen();
