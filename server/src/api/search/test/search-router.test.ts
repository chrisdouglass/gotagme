import * as chai from 'chai';
import {NextFunction, Request, Response, Router} from 'express';
import {suite, test} from 'mocha-typescript';
import * as request from 'supertest';

import {TwitterUsersSearchResponse, TwitterVerifyUserResponse} from '../../../@types/twitter/twitter';
import {huskysoft} from '../../../protos';
import {RouterTest} from '../../shared/router_provider.test';
import {TwitterFetcher} from '../../twitter/twitter_fetcher';
import {SearchRouterProvider} from '../search-router-provider';

@suite
export class SearchRouterTest extends RouterTest {
  private fakeTwitterFetcher!: TwitterFetcher;

  async before() {
    await super.before();
    this.fakeTwitterFetcher = new FakeTwitterFetcher();
    const provider: SearchRouterProvider = new SearchRouterProvider(
        this.connection,
        (req: Request, res: Response, next: NextFunction) =>
            this.authHandler(req, res, next),
        this.fakeTwitterFetcher);
    const router: Router = provider.router();
    this.app.use('/', router);
  }

  @test
  async autocompleteResults() {
    await request(this.app)
        .get('/tag/')  // empty
        .expect(404)
        .expect('Content-Type', /json/);
    const searchTerm = 'oops';
    const res: request.Response = await request(this.app)
                                      .get('/tag/' + searchTerm)
                                      .expect(200)
                                      .expect('Content-Type', /json/);
    const response: huskysoft.gotagme.tag.GetTagsResponse =
        huskysoft.gotagme.tag.GetTagsResponse.fromObject(res.body);
    chai.expect(response).to.exist(
        'Invalid response returned ' + JSON.stringify(res));
    response.tags.length.should.be.greaterThan(0);
  }
}

class FakeTwitterFetcher extends TwitterFetcher {
  constructor() {
    // Ensure a crash if something isn't defined.
    super('', '', undefined);
  }

  async searchForUsers(): Promise<TwitterUsersSearchResponse[]> {
    throw new Error('Not implemented.');
  }

  async getUserInfo(): Promise<TwitterVerifyUserResponse> {
    throw new Error('Not implemented.');
  }
}
