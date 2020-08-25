// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

const passport = require('passport');
import {inject, Provider, bind, BindingScope} from '@loopback/core';
import {Strategy as LinkedinStrategy} from 'passport-linkedin-oauth2';
import {ExpressRequestHandler} from '@loopback/rest';

@bind.provider({scope: BindingScope.SINGLETON})
export class LinkedinOauth2ExpressMiddleware
  implements Provider<ExpressRequestHandler> {
  constructor(
    @inject('linkedinStrategy')
    public linkedinStrategy: LinkedinStrategy,
  ) {
    passport.use(this.linkedinStrategy);
  }

  value() {
    return passport.authenticate('linkedin');
  }
}
