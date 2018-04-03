import {suite, test} from 'mocha-typescript';

import {TwitterUsersSearchResponse, TwitterVerifyUserResponse} from '../../@types/twitter/twitter';
import {TwitterFetcher} from '../../api/twitter/twitter_fetcher';
import {DBTest} from '../../common/test';
import {Costume} from '../../model/costume';
import {User} from '../../model/user';
import {huskysoft} from '../../protos';
import {CostumeStore} from '../../store/costume.store';
import {UserStore} from '../../store/user.store';
import {SearchController} from '../search-controller';

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

    const matching: huskysoft.gotagme.tag.Tag[] =
        await this.searchController.searchCostumes('dra');
    matching.length.should.equal(1);
    const expectedCostume1: Costume = costumes[0];
    matching[0].key.should.equal(expectedCostume1.objectID.toHexString());
    matching[0].display.should.equal(expectedCostume1.name);
    matching[0].costume!.id!.should.equal(expectedCostume1.costumeID);

    const matchingExpanded: huskysoft.gotagme.tag.Tag[] =
        await this.searchController.searchCostumes('dra', true);
    matchingExpanded.length.should.equal(2);
    for (let i = 0; i < matchingExpanded.length; i++) {
      const tag: huskysoft.gotagme.tag.Tag =
          new huskysoft.gotagme.tag.Tag(matchingExpanded[i]);
      const costume: Costume = costumes[i];
      tag.key.should.equal(costume.objectID.toHexString());
      tag.display.should.equal(costume.name);
      tag.costume!.id!.should.equal(costume.costumeID);
    }

    const matchingUserDisplay: huskysoft.gotagme.tag.Tag[] =
        await this.searchController.searchCostumes('tum', true);
    matchingUserDisplay.length.should.equal(1);
    const expectedCostume2: Costume = costumes[1];
    matchingUserDisplay[0].key.should.equal(
        expectedCostume2.objectID.toHexString());
    matchingUserDisplay[0].display.should.equal(expectedCostume2.name);
    matchingUserDisplay[0].costume!.id!.should.equal(
        expectedCostume2.costumeID);
  }

  @test.skip
  async autocompleteDedupes() {}

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

  @test
  async autocomplete() {
    const user1: User = await this.createUser('Albert Einstein', 'emmceequals');
    const user2: User = await this.createUser('Robert Hooke', 'hookedoncells');
    // const user3: User =
    await this.createUser('The Captain', 'captainhook');
    await this.createUser('xxxxxxxxx', 'xxxxxxxxx');
    const costume1: Costume = await this.createCostume('Bert');
    const costume2: Costume = await this.createCostume('Ernie', user1.userID);
    const costume3: Costume = await this.createCostume('Grover', user2.userID);
    const costume4: Costume = await this.createCostume('Grouch', user2.userID);
    await this.createCostume('xxxxxxxxx');
    const fakeAPIResults: TwitterUsersSearchResponse[] = [
      {
        id: 123,
        id_str: '123',
        name: 'Big Rob',
        profile_banner_url: 'http://someurl.com/banner.jpg',
        profile_image_url_https: 'https://someurl.com/banner.jpg',
        screen_name: 'bigdaddyrobert',
      } as TwitterUsersSearchResponse,
      {
        id: 456,
        id_str: '456',
        name: 'Captain America',
        profile_banner_url: 'http://someurl.com/banner2.jpg',
        profile_image_url_https: 'https://someurl.com/banner2.jpg',
        screen_name: 'capredwhiteandblue',
      } as TwitterUsersSearchResponse,
    ];
    this.fakeFetcher.results = fakeAPIResults;

    const searchString1 = 'bert';
    this.fakeFetcher.resultsFilterText = searchString1;
    const tags: huskysoft.gotagme.tag.Tag[] =
        await this.searchController.autocomplete(searchString1, true);
    tags.length.should.equal(7);

    // ernie, grover, grouch, bert, albert, robert hooke, big rob
    tags[0].costume!.id!.should.equal(costume1.costumeID);
    tags[0].key.should.equal(costume1.objectID.toHexString());
    tags[0].display.should.equal(costume1.name);
    tags[1].costume!.id!.should.equal(costume2.costumeID);
    tags[1].key.should.equal(costume2.objectID.toHexString());
    tags[1].display.should.equal(costume2.name);
    tags[2].costume!.id!.should.equal(costume3.costumeID);
    tags[2].key.should.equal(costume3.objectID.toHexString());
    tags[2].display.should.equal(costume3.name);
    tags[3].costume!.id!.should.equal(costume4.costumeID);
    tags[3].key.should.equal(costume4.objectID.toHexString());
    tags[3].display.should.equal(costume4.name);
    // 2 users.
    tags[4].taggedUser!.id!.should.equal(user1.userID);
    tags[4].key.should.equal(user1.objectID.toHexString());
    tags[4].display.should.equal(user1.displayName);
    tags[5].taggedUser!.id!.should.equal(user2.userID);
    tags[5].key.should.equal(user2.objectID.toHexString());
    tags[5].display.should.equal(user2.displayName);
    // 1 api user.
    tags[6].key.should.equal(fakeAPIResults[0].id_str);
    tags[6].display.should.equal(fakeAPIResults[0].name);

    // Test both filters.
    (await this.searchController.autocomplete('@bert')).length.should.equal(3);
    (await this.searchController.autocomplete('$bert')).length.should.equal(1);

    // Cap
    const searchString2 = 'cap';
    this.fakeFetcher.resultsFilterText = searchString2;
    const tagsForCap: huskysoft.gotagme.tag.Tag[] =
        await this.searchController.autocomplete(searchString2, true);
    tagsForCap.length.should.equal(2);

    // Gr
    const searchString3 = 'gr';
    this.fakeFetcher.resultsFilterText = searchString3;
    const tagsForGr: huskysoft.gotagme.tag.Tag[] =
        await this.searchController.autocomplete(searchString3, true);
    tagsForGr.length.should.equal(2);
  }

  @test.skip
  async autocompleteLeadingCharacterFilterWithHashtag() {}
}

class FakeTwitterFetcher extends TwitterFetcher {
  results: TwitterUsersSearchResponse[];
  resultsFilterText?: string;
  userInfo: TwitterVerifyUserResponse;

  constructor() {
    // Ensure a crash if something isn't defined.
    super('', '', undefined);
    this.results = [];
    this.userInfo = {} as TwitterVerifyUserResponse;
  }

  async searchForUsers(): Promise<TwitterUsersSearchResponse[]> {
    return this.results.filter((response: TwitterUsersSearchResponse) => {
      if (!this.resultsFilterText) {
        return true;
      }
      return response.name.indexOf(this.resultsFilterText) > -1 ||
          response.screen_name.indexOf(this.resultsFilterText) > -1;
    });
  }

  async getUserInfo(): Promise<TwitterVerifyUserResponse> {
    return this.userInfo;
  }
}
