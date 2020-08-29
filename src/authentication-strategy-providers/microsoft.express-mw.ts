// Copyright Jangul Aslam 2020. All Rights Reserved.
// Node module: @loopback4-example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

const passport = require('passport');
import {inject, Provider, bind, BindingScope} from '@loopback/core';
import {Strategy as MicrosoftStrategy} from 'passport-microsoft';
import {ExpressRequestHandler} from '@loopback/rest';

@bind.provider({scope: BindingScope.SINGLETON})
export class MicrosoftOauth2ExpressMiddleware
  implements Provider<ExpressRequestHandler> {
  constructor(
    @inject('microsoftStrategy')
    public microsoftStrategy: MicrosoftStrategy,
  ) {
    passport.use(this.microsoftStrategy);
  }

  value() {
    return passport.authenticate('microsoft');
  }
}
