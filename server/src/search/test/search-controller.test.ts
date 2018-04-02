import {suite, test} from 'mocha-typescript';

import {TwitterUsersSearchResponse, TwitterVerifyUserResponse} from '../../@types/twitter/twitter';
import {TwitterFetcher} from '../../api/twitter/twitter_fetcher';
import {DBTest} from '../../common/test';
// import { Tag } from "../../model/tag";
import {huskysoft} from '../../protos';
import {CostumeStore} from '../../store/costume.store';
import {UserStore} from '../../store/user.store';
import {SearchController} from '../search-controller';
import { User } from '../../model/user';
import { Costume } from '../../model/costume';
// import { User } from '../../model/user';

@suite
export class SearchControllerTest extends DBTest {
  private searchController!: SearchController;
  private fakeFetcher!: FakeTwitterFetcher;

  async before() {
    await super.before();
    this.fakeFetcher = new FakeTwitterFetcher();
    this.searchController = new SearchController(
        new CostumeStore(this.connection), new UserStore(this.connection),
        this.fakeFetcher);
  }

  @test.skip
  async zeroStateAutocomplete() {}

  @test
  async twitterAutocomplete() {
    this.fakeFetcher.results = [
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

    const tags: huskysoft.gotagme.tag.Tag[] =
        await this.searchController.searchTwitterAPIUsers('ra');
    tags.length.should.equal(2);
    for (let i = 0; i < tags.length; i++) {
      const tag: huskysoft.gotagme.tag.Tag = tags[i];
      const apiTag: TwitterUsersSearchResponse = this.fakeFetcher.results[i];
      tag.key.should.equal(apiTag.id_str);
      tag.display.should.equal(apiTag.name);
    }
  }

  @test
  async costumeAutocomplete() {
    const user: User = await this.createUser('Tumbles', 'stairdragon');
    const costumes: Costume[] = [
      await this.createCostume('Dragonheart'),
      await this.createCostume('Mr. Wings', user.userID),
    ];

    const matchingCostumeNameAndUsername: huskysoft.gotagme.tag.Tag[] =
        await this.searchController.searchCostumes('dra');
    matchingCostumeNameAndUsername.length.should.equal(2);
    for (let i = 0; i < matchingCostumeNameAndUsername.length; i++) {
      const tag: huskysoft.gotagme.tag.Tag =
          new huskysoft.gotagme.tag.Tag(matchingCostumeNameAndUsername[i]);
      const costume: Costume = costumes[i];
      tag.key.should.equal(costume.objectID.toHexString());
      tag.display.should.equal(costume.name);
      tag.costume!.id!.should.equal(costume.costumeID);
    }

    const matchingUserDisplayName: huskysoft.gotagme.tag.Tag[] =
        await this.searchController.searchCostumes('tum');
    matchingUserDisplayName.length.should.equal(1);
    const expectedCostume: Costume = costumes[1];
    matchingUserDisplayName[0].key.should.equal(expectedCostume.objectID.toHexString());
    matchingUserDisplayName[0].display.should.equal(expectedCostume.name);
    matchingUserDisplayName[0].costume!.id!.should.equal(expectedCostume.costumeID);
  }

  @test.skip
  async autocompleteDedupes() {

  }

  @test
  async userAutocomplete() {
    const user1: User = await this.createUser('Albert Einstein', 'emmceequals');
    const user2: User = await this.createUser('Robert Hooke', 'hookedoncells');
    await this.createUser('xxxxxxxxx', 'xxxxxxxxx');
    const matchingDisplay: huskysoft.gotagme.tag.Tag[] =
        await this.searchController.searchUsers('bert');
    matchingDisplay.length.should.equal(2);
    matchingDisplay[0].taggedUser!.id!.should.equal(user1.userID);
    matchingDisplay[1].taggedUser!.id!.should.equal(user2.userID);
    const matchingUsername: huskysoft.gotagme.tag.Tag[] =
        await this.searchController.searchUsers('ls');
    matchingUsername.length.should.equal(2);
    matchingUsername[0].taggedUser!.id!.should.equal(user1.userID);
    matchingUsername[1].taggedUser!.id!.should.equal(user2.userID);
  }

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
