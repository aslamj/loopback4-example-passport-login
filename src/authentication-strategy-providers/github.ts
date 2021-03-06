// Copyright Jangul Aslam 2020. All Rights Reserved.
// Node module: @loopback4-example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Profile} from 'passport';
import {UserIdentityService} from '@loopback/authentication';
import {User} from '../models';
import {StrategyOptions} from 'passport-github2';
import {inject, Provider, bind, BindingScope} from '@loopback/core';
import {UserServiceBindings} from '../services';
import {Strategy as GithubStrategy} from 'passport-github2';
import {verifyFunctionFactory} from '../authentication-strategies/types';

@bind.provider({scope: BindingScope.SINGLETON})
export class GithubOauth implements Provider<GithubStrategy> {
  strategy: GithubStrategy;

  constructor(
    @inject('githubOAuth2Options')
    public oauth2Options: StrategyOptions,
    @inject(UserServiceBindings.PASSPORT_USER_IDENTITY_SERVICE)
    public userService: UserIdentityService<Profile, User>,
  ) {
    this.strategy = new GithubStrategy(
      this.oauth2Options,
      verifyFunctionFactory(this.userService),
    );
  }

  value() {
    return this.strategy;
  }
}
