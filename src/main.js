const CommunityDiscordBot = require( "./CommunityDiscordBot" );
const config = require( "../config/config.json" );
const cdb = new CommunityDiscordBot( config );
cdb.init();
cdb.listen();
