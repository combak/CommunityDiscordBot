"use strict";
const path = require( "path" );

class ServiceLocator
{
  constructor( config = {} )
  {
    this.config = config;
    this.services = new Map();
  }

  _createService( name )
  {
    let config = this.config[ name ];
    if( config === undefined ) throw `'${name}' is an unknown service`;
    let service = require( path.resolve( __basedir, `${config.factory}` ) );

    return service.factory( this, config );
  }

  get( name )
  {
    let service;

    if( this.services.has( name ) )
    {
      service = this.services.get( name );
    }
    else
    {
      service = this._createService( name );
      this.services.set( name, service );
    }
    return service;
  }
}
module.exports = ServiceLocator;
