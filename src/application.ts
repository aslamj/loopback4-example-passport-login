// Copyright Jangul Aslam 2020. All Rights Reserved.
// Node module: @loopback4-example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {BootMixin} from '@loopback/boot';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication, toInterceptor} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import {MySequence} from './sequence';
import {AuthenticationComponent} from '@loopback/authentication';
import {
  FaceBookOauth2Authorization,
  GoogleOauth2Authorization,
  LinkedinOauth2Authorization,
  GithubOauth2Authorization,
  TwitterOauth2Authorization,
  MicrosoftOauth2Authorization,
  Oauth2AuthStrategy,
  LocalAuthStrategy,
  SessionStrategy,
  BasicStrategy,
} from './authentication-strategies';
import {
  FacebookOauth,
  GoogleOauth,
  LinkedinOauth,
  GithubOauth,
  TwitterOauth,
  MicrosoftOauth,
  CustomOauth2,
  FacebookOauth2ExpressMiddleware,
  GoogleOauth2ExpressMiddleware,
  LinkedinOauth2ExpressMiddleware,
  GithubOauth2ExpressMiddleware,
  TwitterOauth2ExpressMiddleware,
  MicrosoftOauth2ExpressMiddleware,
  CustomOauth2ExpressMiddleware,
} from './authentication-strategy-providers';
import {
  SessionAuth,
  FacebookOauthInterceptor,
  GoogleOauthInterceptor,
  LinkedinOauthInterceptor,
  GithubOauthInterceptor,
  TwitterOauthInterceptor,
  MicrosoftOauthInterceptor,
  CustomOauth2Interceptor,
} from './authentication-interceptors';
import {PassportUserIdentityService, UserServiceBindings} from './services';
import {ApplicationConfig, createBindingFromClass} from '@loopback/core';
import {CrudRestComponent} from '@loopback/rest-crud';
import passport from 'passport';

export class OAuth2LoginApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.setUpBindings();

    // Set up the custom sequence
    this.sequence(MySequence);

    this.component(AuthenticationComponent);
    this.component(CrudRestComponent);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    passport.serializeUser(function (user: any, done) {
      done(null, user);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    passport.deserializeUser(function (user: any, done) {
      done(null, user);
    });

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  setUpBindings(): void {
    this.bind(UserServiceBindings.PASSPORT_USER_IDENTITY_SERVICE).toClass(
      PassportUserIdentityService,
    );
    // passport strategies
    this.add(createBindingFromClass(FacebookOauth, {key: 'facebookStrategy'}));
    this.add(createBindingFromClass(GoogleOauth, {key: 'googleStrategy'}));
    this.add(createBindingFromClass(LinkedinOauth, {key: 'linkedinStrategy'}));
    this.add(createBindingFromClass(TwitterOauth, {key: 'twitterStrategy'}));
    this.add(createBindingFromClass(MicrosoftOauth, {key: 'microsoftStrategy'}));
    this.add(createBindingFromClass(GithubOauth, {key: 'githubStrategy'}));
    this.add(createBindingFromClass(CustomOauth2, {key: 'oauth2Strategy'}));
    // passport express middleware
    this.add(
      createBindingFromClass(FacebookOauth2ExpressMiddleware, {
        key: 'facebookStrategyMiddleware',
      }),
    );
    this.add(
      createBindingFromClass(GoogleOauth2ExpressMiddleware, {
        key: 'googleStrategyMiddleware',
      }),
    );
    this.add(
      createBindingFromClass(LinkedinOauth2ExpressMiddleware, {
        key: 'linkedinStrategyMiddleware',
      }),
    );
    this.add(
      createBindingFromClass(GithubOauth2ExpressMiddleware, {
        key: 'githubStrategyMiddleware',
      }),
    );
    this.add(
      createBindingFromClass(TwitterOauth2ExpressMiddleware, {
        key: 'twitterStrategyMiddleware',
      }),
    );
    this.add(
      createBindingFromClass(MicrosoftOauth2ExpressMiddleware, {
        key: 'microsoftStrategyMiddleware',
      }),
    );
    this.add(
      createBindingFromClass(CustomOauth2ExpressMiddleware, {
        key: 'oauth2StrategyMiddleware',
      }),
    );
    // LoopBack 4 style authentication strategies
    this.add(createBindingFromClass(LocalAuthStrategy));
    this.add(createBindingFromClass(FaceBookOauth2Authorization));
    this.add(createBindingFromClass(GoogleOauth2Authorization));
    this.add(createBindingFromClass(LinkedinOauth2Authorization));
    this.add(createBindingFromClass(GithubOauth2Authorization));
    this.add(createBindingFromClass(TwitterOauth2Authorization));
    this.add(createBindingFromClass(MicrosoftOauth2Authorization));
    this.add(createBindingFromClass(Oauth2AuthStrategy));
    this.add(createBindingFromClass(SessionStrategy));
    this.add(createBindingFromClass(BasicStrategy));
    // Express style middleware interceptors
    this.bind('passport-init-mw').to(toInterceptor(passport.initialize()));
    this.bind('passport-session-mw').to(toInterceptor(passport.session()));
    this.bind('passport-facebook').toProvider(FacebookOauthInterceptor);
    this.bind('passport-google').toProvider(GoogleOauthInterceptor);
    this.bind('passport-linkedin').toProvider(LinkedinOauthInterceptor);
    this.bind('passport-github').toProvider(GithubOauthInterceptor);
    this.bind('passport-twitter').toProvider(TwitterOauthInterceptor);
    this.bind('passport-microsoft').toProvider(MicrosoftOauthInterceptor);
    this.bind('passport-oauth2').toProvider(CustomOauth2Interceptor);
    this.bind('set-session-user').toProvider(SessionAuth);
  }
}
