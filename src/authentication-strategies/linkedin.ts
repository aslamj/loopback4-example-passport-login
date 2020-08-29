// Copyright Jangul Aslam 2020. All Rights Reserved.
// Node module: @loopback4-example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {asAuthStrategy, AuthenticationStrategy} from '@loopback/authentication';
import {StrategyAdapter} from '@loopback/authentication-passport';
import {Strategy} from 'passport-linkedin-oauth2';
import {bind, inject, extensionFor} from '@loopback/core';
import {UserProfile} from '@loopback/security';
import {User} from '../models';
import {Request, RedirectRoute} from '@loopback/rest';
import {PassportAuthenticationBindings} from './types';
import {mapProfile} from './types';

@bind(
  asAuthStrategy,
  extensionFor(PassportAuthenticationBindings.OAUTH2_STRATEGY),
)
export class LinkedinOauth2Authorization implements AuthenticationStrategy {
  name = 'oauth2-linkedin';
  protected strategy: StrategyAdapter<User>;

  /**
   * create an oauth2 strategy for linkedin
   */
  constructor(
    @inject('linkedinStrategy')
    public passportStrategy: Strategy,
  ) {
    this.strategy = new StrategyAdapter(
      this.passportStrategy,
      this.name,
      mapProfile.bind(this),
    );
  }

  /**
   * authenticate a request
   * @param request
   */
  async authenticate(request: Request): Promise<UserProfile | RedirectRoute> {
    return this.strategy.authenticate(request);
  }
}
