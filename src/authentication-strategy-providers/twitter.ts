// Copyright Jangul Aslam 2020. All Rights Reserved.
// Node module: @loopback4-example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Profile} from 'passport';
import {UserIdentityService} from '@loopback/authentication';
import {User} from '../models';
import {IStrategyOption} from 'passport-twitter';
import {inject, Provider, bind, BindingScope} from '@loopback/core';
import {UserServiceBindings} from '../services';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import {verifyFunctionFactory} from '../authentication-strategies/types';

@bind.provider({scope: BindingScope.SINGLETON})
export class TwitterOauth implements Provider<TwitterStrategy> {
  strategy: TwitterStrategy;

  constructor(
    @inject('twitterOAuth2Options')
    public oauth2Options: IStrategyOption,
    @inject(UserServiceBindings.PASSPORT_USER_IDENTITY_SERVICE)
    public userService: UserIdentityService<Profile, User>,
  ) {
    this.strategy = new TwitterStrategy(
      this.oauth2Options,
      verifyFunctionFactory(this.userService),
    );
  }

  value() {
    return this.strategy;
  }
}
