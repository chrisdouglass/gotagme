import * as chai from 'chai';
import {NextFunction, Request, Response, Router} from 'express';
import {suite, test} from 'mocha-typescript';
import * as request from 'supertest';

import {Costume} from '../../../model/costume';
import {User} from '../../../model/user';
import {huskysoft} from '../../../protos';
import {RouterTest} from '../../shared/router_provider.test';
import {CostumeRouterProvider} from '../costume_router_provider';

@suite
export class CostumeRouter extends RouterTest {
  async before() {
    await super.before();
    const provider: CostumeRouterProvider = new CostumeRouterProvider(
        this.connection,
        (req: Request, res: Response, next: NextFunction) =>
            this.authHandler(req, res, next));
    const router: Router = provider.router();
    this.app.use('/', router);
  }

  @test
  async costumesOfUser() {
    const aUser: User = await this.createUser();
    const costume1: Costume = await this.createCostume('Raver', aUser.userID);
    const costume2: Costume = await this.createCostume('Cole', aUser.userID);

    const anotherUser: User = await this.createUser();
    const costume3: Costume =
        await this.createCostume('Inus', anotherUser.userID);

    costume2.addOwner(anotherUser);
    chai.expect(await costume2.save()).to.exist('Nothing was saved.');

    const currentOnlyRes: request.Response =
        await request(this.app)
            .get('/user/' + aUser.userID + '?only_current=1')
            .expect(200)
            .expect('Content-Type', /json/);
    const currentOnlyResponse: huskysoft.gotagme.costume.GetCostumesResponse =
        huskysoft.gotagme.costume.GetCostumesResponse.fromObject(
            currentOnlyRes.body);
    currentOnlyResponse.costumes.length.should.equal(
        1, 'There should only be one current costume for aUser.');
    currentOnlyResponse.costumes[0].id!.should.equal(costume1.costumeID);
    currentOnlyResponse.costumes[0].name!.should.equal(costume1.name);
    currentOnlyResponse.costumes[0].owner!.id!.should.equal(aUser.userID);

    const res: request.Response = await request(this.app)
                                      .get('/user/' + aUser.userID)
                                      .expect(200)
                                      .expect('Content-Type', /json/);
    const response: huskysoft.gotagme.costume.GetCostumesResponse =
        huskysoft.gotagme.costume.GetCostumesResponse.fromObject(res.body);
    response.costumes.length.should.equal(
        2, 'aUser should have returned both costumes.');
    response.costumes[0].id!.should.equal(costume1.costumeID);
    response.costumes[0].name!.should.equal(costume1.name);
    response.costumes[0].owner!.id!.should.equal(aUser.userID);
    response.costumes[1].id!.should.equal(costume2.costumeID);
    response.costumes[1].name!.should.equal(costume2.name);
    response.costumes[1].owner!.id!.should.equal(anotherUser.userID);

    const currentOnlyRes2: request.Response =
        await request(this.app)
            .get('/user/' + anotherUser.userID + '?only_current=1')
            .expect(200)
            .expect('Content-Type', /json/);
    const currentOnlyResponse2: huskysoft.gotagme.costume.GetCostumesResponse =
        huskysoft.gotagme.costume.GetCostumesResponse.fromObject(
            currentOnlyRes2.body);
    currentOnlyResponse2.costumes.length.should.equal(
        2, 'anotherUser should currently have both costumes.');
    currentOnlyResponse2.costumes[0].id!.should.equal(costume2.costumeID);
    currentOnlyResponse2.costumes[0].name!.should.equal(costume2.name);
    currentOnlyResponse2.costumes[0].owner!.id!.should.equal(
        anotherUser.userID);
    currentOnlyResponse2.costumes[1].id!.should.equal(costume3.costumeID);
    currentOnlyResponse2.costumes[1].name!.should.equal(costume3.name);
    currentOnlyResponse2.costumes[1].owner!.id!.should.equal(
        anotherUser.userID);

    const res2: request.Response = await request(this.app)
                                       .get('/user/' + anotherUser.userID)
                                       .expect(200)
                                       .expect('Content-Type', /json/);
    const response2: huskysoft.gotagme.costume.GetCostumesResponse =
        huskysoft.gotagme.costume.GetCostumesResponse.fromObject(res2.body);
    response2.costumes.length.should.equal(
        2, 'anotherUser should have returned both costumes.');
    response2.costumes[0].id!.should.equal(costume2.costumeID);
    response2.costumes[0].name!.should.equal(costume2.name);
    response2.costumes[0].owner!.id!.should.equal(anotherUser.userID);
    response2.costumes[1].id!.should.equal(costume3.costumeID);
    response2.costumes[1].name!.should.equal(costume3.name);
    response2.costumes[1].owner!.id!.should.equal(anotherUser.userID);
  }

  @test
  async createCostumeWithPost() {
    const displayName = 'Raver';
    const username = '@ravertooth';
    const aUser: User = await this.createUser(displayName, username);
    const name = 'Cole';
    const ownerID = aUser.userID;
    const proto: huskysoft.gotagme.costume.EditCostumeRequest =
        new huskysoft.gotagme.costume.EditCostumeRequest({
          name,
          ownerID,
        });
    const res: request.Response = await request(this.app)
                                      .post('/')
                                      .set('Content-Type', 'application/json')
                                      .send(proto.toJSON())
                                      .expect(201)
                                      .expect('Content-Type', /json/);
    const createdCostume: huskysoft.gotagme.costume.Costume =
        huskysoft.gotagme.costume.Costume.fromObject(res.body);
    createdCostume.name.should.equal(name);
    createdCostume.owner!.id!.should.equal(ownerID);
    createdCostume.owner!.displayName!.should.equal(displayName);

    chai.expect(await this.costumeStore.findOneByCostumeID(createdCostume.id))
        .to.exist('Costume was not actually in database.');
  }
}
