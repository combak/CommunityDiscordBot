const path = require( "path" );
global.__basedir = path.resolve();
global.__srcdir = path.resolve( "src" );
global.__modulesdir = path.resolve( "modules" );

const CommunityDiscordBot = require( path.resolve( __srcdir, "CommunityDiscordBot.js" ) );
const config = require( path.resolve( __basedir, "config/config.json" ) );
const cdb = new CommunityDiscordBot( config );
cdb.init();
cdb.listen();
