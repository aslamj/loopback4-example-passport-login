// Copyright Jangul Aslam 2020. All Rights Reserved.
// Node module: @loopback4-example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  inject,
  Provider,
  Interceptor,
  InvocationContext,
  Next,
} from '@loopback/core';
import {
  RestBindings,
  RequestContext,
  toInterceptor,
  ExpressRequestHandler,
} from '@loopback/rest';

export class LinkedinOauthInterceptor implements Provider<Interceptor> {
  constructor(
    @inject('linkedinStrategyMiddleware')
    public linkedinStrategy: ExpressRequestHandler,
  ) {}

  value() {
    return async (invocationCtx: InvocationContext, next: Next) => {
      const requestCtx = invocationCtx.getSync<RequestContext>(
        RestBindings.Http.CONTEXT,
      );
      const request = requestCtx.request;
      if (request.query['oauth2-provider-name'] === 'linkedin') {
        return toInterceptor(this.linkedinStrategy)(invocationCtx, next);
      }
      return next();
    };
  }
}
