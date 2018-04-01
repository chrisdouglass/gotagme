import {NextFunction, Request, Response, Router} from 'express';
import {suite, test} from 'mocha-typescript';
import * as request from 'supertest';

import {Costume} from '../../../model/costume';
import {Photo} from '../../../model/photo';
import {User} from '../../../model/user';
import {huskysoft} from '../../../protos';
import {RouterTest} from '../../shared/router_provider.test';
import {TagRouterProvider} from '../tag_router_provider';

@suite
export class TagRouterTest extends RouterTest {
  async before() {
    await super.before();
    const provider: TagRouterProvider = new TagRouterProvider(
        this.connection,
        (req: Request, res: Response, next: NextFunction) =>
            this.authHandler(req, res, next));
    const router: Router = provider.router();
    this.app.use('/', router);
  }

  @test
  async tagsOfUser() {
    const taggedUser: User = await this.createUser();
    const photoCount = 5;
    for (let i = 0; i < photoCount; i++) {
      const photo: Photo = await this.createPhoto();
      await this.tagStore.addUserTagToPhoto(taggedUser, photo, this.loggedIn);
    }

    const res: request.Response = await request(this.app)
                                      .get('/user/' + taggedUser.userID)
                                      .expect(200)
                                      .expect('Content-Type', /json/);
    const response: huskysoft.gotagme.tag.GetTagsResponse =
        huskysoft.gotagme.tag.GetTagsResponse.fromObject(res.body);
    response.tags.length.should.equal(photoCount);
  }

  @test
  async tagsOfCostume() {
    const costumeName = 'Sunny';
    const taggedCostume: Costume =
        await this.createCostume(costumeName, this.loggedIn.userID);
    const photoCount = 5;
    for (let i = 0; i < photoCount; i++) {
      const photo: Photo = await this.createPhoto();
      await this.tagStore.addCostumeTagToPhoto(
          taggedCostume, photo, this.loggedIn);
    }

    const res: request.Response =
        await request(this.app)
            .get('/costume/' + taggedCostume.costumeID)
            .expect(200)
            .expect('Content-Type', /json/);
    const response: huskysoft.gotagme.tag.GetTagsResponse =
        huskysoft.gotagme.tag.GetTagsResponse.fromObject(res.body);
    response.tags.length.should.equal(photoCount);
  }

  @test
  async getTagCounts() {
    const taggedUser1: User = await this.createUser();
    const taggedUser2: User = await this.createUser();
    const taggedCostume1: Costume = await this.createCostume();
    const taggedCostume2: Costume = await this.createCostume();
    const hashtag1 = 'hashtag1';
    const hashtag2 = 'hashtag2';

    const expectedCount = 5;
    for (let i = 0; i < expectedCount; i++) {
      const photo: Photo = await this.createPhoto();
      await this.tagStore.addUserTagToPhoto(taggedUser1, photo, this.loggedIn);
      await this.tagStore.addUserTagToPhoto(taggedUser2, photo, this.loggedIn);
      await this.tagStore.addCostumeTagToPhoto(
          taggedCostume1, photo, this.loggedIn);
      await this.tagStore.addCostumeTagToPhoto(
          taggedCostume2, photo, this.loggedIn);
      await this.tagStore.addStringTagToPhoto(hashtag1, photo, this.loggedIn);
      await this.tagStore.addStringTagToPhoto(hashtag2, photo, this.loggedIn);
    }

    const userRequest: huskysoft.gotagme.tag.GetTagCountsRequest =
        new huskysoft.gotagme.tag.GetTagCountsRequest({
          userIDs: [taggedUser1.userID, taggedUser2.userID],
        });
    const userRes: request.Response =
        await request(this.app)
            .post('/counts')
            .set('Content-Type', 'application/json')
            .send(userRequest.toJSON())
            .expect(200)
            .expect('Content-Type', /json/);
    const userResponse: huskysoft.gotagme.tag.GetTagCountsResponse =
        huskysoft.gotagme.tag.GetTagCountsResponse.fromObject(userRes.body);
    userResponse.responses.map(
        (result: huskysoft.gotagme.tag.IGetTagCountResponse) => {
          result.count!.should.equal(5);
        });

    const costumeRequest: huskysoft.gotagme.tag.GetTagCountsRequest =
        new huskysoft.gotagme.tag.GetTagCountsRequest({
          costumeIDs: [taggedCostume1.costumeID, taggedCostume2.costumeID],
        });
    const costumeRes: request.Response =
        await request(this.app)
            .post('/counts')
            .set('Content-Type', 'application/json')
            .send(costumeRequest.toJSON())
            .expect(200)
            .expect('Content-Type', /json/);
    const costumeResponse: huskysoft.gotagme.tag.GetTagCountsResponse =
        huskysoft.gotagme.tag.GetTagCountsResponse.fromObject(costumeRes.body);
    costumeResponse.responses.map(
        (result: huskysoft.gotagme.tag.IGetTagCountResponse) => {
          result.count!.should.equal(5);
        });

    const hashtagRequest: huskysoft.gotagme.tag.GetTagCountsRequest =
        new huskysoft.gotagme.tag.GetTagCountsRequest({
          hashtags: [hashtag1, hashtag2],
        });
    const hashtagRes: request.Response =
        await request(this.app)
            .post('/counts')
            .set('Content-Type', 'application/json')
            .send(hashtagRequest.toJSON())
            .expect(200)
            .expect('Content-Type', /json/);
    const hashtagResponse: huskysoft.gotagme.tag.GetTagCountsResponse =
        huskysoft.gotagme.tag.GetTagCountsResponse.fromObject(hashtagRes.body);
    hashtagResponse.responses.map(
        (result: huskysoft.gotagme.tag.IGetTagCountResponse) => {
          result.count!.should.equal(5);
        });
  }
}
