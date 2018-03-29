import { RouterTest } from "../../shared/router_provider.test";

import {suite, test} from 'mocha-typescript';
import * as request from 'supertest';
import { TagRouterProvider } from "../tag_router_provider";
import { Router, Request, Response, NextFunction } from "express";
import { User } from "../../../model/user";
import { Photo } from "../../../model/photo";
import { huskysoft } from "../../../protos";

@suite
export class TagRouterTest extends RouterTest {
  async before() {
    await super.before();
    const provider: TagRouterProvider =
        new TagRouterProvider(this.connection,
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

    const res: request.Response =
        await request(this.app).get('/user/' + taggedUser.userID).expect(200).expect(
            'Content-Type', /json/);
    debugger;
    const response: huskysoft.gotagme.tag.GetTagsResponse =
        huskysoft.gotagme.tag.GetTagsResponse.fromObject(res.body);
    response.tags.length.should.equal(photoCount);
  }
}
