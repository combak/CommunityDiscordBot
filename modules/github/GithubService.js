"use strict";
const path = require( "path" );
const Github = require( "github-api" );
const Service = require( path.resolve( __srcdir, "service/Service.js" ) );

class GithubService extends Service
{
  init()
  {
    this.connection = new Github( this.config.auth );
  }

  getRepos()
  {
    return this.config.repositories;
  }
}
module.exports = GithubService;
