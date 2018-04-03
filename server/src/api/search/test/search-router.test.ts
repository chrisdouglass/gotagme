import * as chai from 'chai';
import {NextFunction, Request, Response, Router} from 'express';
import {suite, test} from 'mocha-typescript';
import * as request from 'supertest';

import {TwitterUsersSearchResponse, TwitterVerifyUserResponse} from '../../../@types/twitter/twitter';
import {Costume} from '../../../model/costume';
import {User} from '../../../model/user';
import {huskysoft} from '../../../protos';
import {RouterTest} from '../../shared/router_provider.test';
import {TwitterFetcher} from '../../twitter/twitter_fetcher';
import {SearchRouterProvider} from '../search-router-provider';

@suite
export class SearchRouterTest extends RouterTest {
  private fakeTwitterFetcher!: FakeTwitterFetcher;

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

  @test.skip
  async zeroStateAutocomplete() {
    // Zero state
    await request(this.app).get('/tag/').expect(200).expect(
        'Content-Type', /json/);
  }

  @test
  async twitterAutocomplete() {
    this.fakeTwitterFetcher.results = [
      {
        id: 123,
        id_str: '123',
        name: 'Raver',
        profile_banner_url: 'http://someurl.com/banner.jpg',
        profile_image_url_https: 'https://someurl.com/banner.jpg',
        screen_name: 'ravertooth',
      } as TwitterUsersSearchResponse,
      {
        id: 456,
        id_str: '456',
        name: 'Radix',
        profile_banner_url: 'http://someurl.com/banner2.jpg',
        profile_image_url_https: 'https://someurl.com/banner2.jpg',
        screen_name: 'radix',
      } as TwitterUsersSearchResponse,
    ];

    const res: request.Response =
        await request(this.app).get('/tag/ra').expect(200).expect(
            'Content-Type', /json/);
    const response: huskysoft.gotagme.tag.GetTagsResponse =
        huskysoft.gotagme.tag.GetTagsResponse.fromObject(res.body);
    chai.expect(response).to.exist(
        'Invalid response returned ' + JSON.stringify(res));
    response.tags.length.should.equal(2);
    for (let i = 0; i < response.tags.length; i++) {
      const tag: huskysoft.gotagme.tag.Tag =
          new huskysoft.gotagme.tag.Tag(response.tags[i]);
      const apiTag: TwitterUsersSearchResponse =
          this.fakeTwitterFetcher.results[i];
      tag.key.should.equal(apiTag.id_str);
      tag.display.should.equal(apiTag.name);
    }
  }

  @test
  async costumeAutocomplete() {
    const user: User = await this.createUser('Raver', 'ravertooth');
    const costumes: Costume[] = [
      await this.createCostume('Radix'),
      await this.createCostume('Raver', user.userID),
    ];
    const res: request.Response =
        await request(this.app).get('/tag/ra').expect(200).expect(
            'Content-Type', /json/);
    const response: huskysoft.gotagme.tag.GetTagsResponse =
        huskysoft.gotagme.tag.GetTagsResponse.fromObject(res.body);
    chai.expect(response).to.exist(
        'Invalid response returned ' + JSON.stringify(res));
    response.tags.length.should.equal(3);


    // Costumes.
    for (let i = 0; i < 2; i++) {
      const tag: huskysoft.gotagme.tag.Tag =
          new huskysoft.gotagme.tag.Tag(response.tags[i]);
      const costume: Costume = costumes[i];
      tag.costume!.id!.should.equal(costume.costumeID);
      tag.key.should.equal(costume.objectID.toHexString());
      tag.display.should.equal(costume.name);
    }

    response.tags[2].taggedUser!.id!.should.equal(user.userID);
    response.tags[2].key!.should.equal(user.objectID.toHexString());
    response.tags[2].display!.should.equal(user.displayName);
  }

  @test.skip
  async userAutocomplete() {}

  @test.skip
  async autocompleteLeadingCharacterFilter() {}
}

class FakeTwitterFetcher extends TwitterFetcher {
  results: TwitterUsersSearchResponse[];
  userInfo: TwitterVerifyUserResponse;

  constructor() {
    // Ensure a crash if something isn't defined.
    super('', '', undefined);
    this.results = [];
    this.userInfo = {} as TwitterVerifyUserResponse;
  }

  async searchForUsers(): Promise<TwitterUsersSearchResponse[]> {
    return this.results;
  }

  async getUserInfo(): Promise<TwitterVerifyUserResponse> {
    return this.userInfo;
  }
}
