import * as chai from 'chai';
import {suite, test} from 'mocha-typescript';

import {DBTest} from '../../../common/test';
import {ApprovalState} from '../../../model/approval';
import {Costume} from '../../../model/costume';
import {Photo} from '../../../model/photo';
import {Tag, TagKind} from '../../../model/tag';
import {User} from '../../../model/user';
import {huskysoft} from '../../../protos';
import {PhotoAPI} from '../photo-api';

import {FakeFlickrFetcher} from './fake-flickr-fetcher';

@suite
export class PhotoAPITest extends DBTest {
  private photoAPI!: PhotoAPI;
  private fakeFetcher!: FakeFlickrFetcher;

  async before() {
    await super.before();
    this.fakeFetcher = new FakeFlickrFetcher();
    this.photoAPI = new PhotoAPI(
        this.photoStore, this.tagStore, this.costumeStore, this.userStore,
        this.approvalStore, this.flickrPhotoStore, this.fakeFetcher);
  }

  @test
  async photoAPIExists() {
    chai.expect(this.photoAPI).to.exist('API not created');
  }

  @test
  async addUserAPITag() {
    const user: User = await this.createUser();
    const photo: Photo = await this.createPhoto();

    const taggedUser: User = await this.createUser('Bender', 'beerb4bolts');
    const userProtoTag: huskysoft.gotagme.tag.Tag =
        new huskysoft.gotagme.tag.Tag({
          photo: photo.toProto(),
          key: taggedUser.objectID.toHexString(),
        });
    const userTag: Tag =
        await this.photoAPI.handleAddAPITag(photo, userProtoTag, user);
    chai.expect(userTag).to.exist('No user tag was created.');
    userTag.addedBy.userID.should.equal(user.userID);
    userTag.currentState.should.equal(ApprovalState.New);
    userTag.kind.should.equal(TagKind.User);
    userTag.tagText.should.equal('@' + taggedUser.displayName);
    userTag.taggedUser!.userID.should.equal(taggedUser.userID);
    userTag.photo.photoID.should.equal(photo.photoID);

    (await this.tagStore.findByPhoto(photo)).length.should.equal(1);

    // Verify users don't duplicate.
    const dupeUserProtoTag: huskysoft.gotagme.tag.Tag =
        new huskysoft.gotagme.tag.Tag({
          photo: photo.toProto(),
          key: taggedUser.objectID.toHexString(),
        });
    const dupeUserTag: Tag =
        await this.photoAPI.handleAddAPITag(photo, dupeUserProtoTag, user);
    dupeUserTag.tagID.should.equal(userTag.tagID);
    (await this.tagStore.findByPhoto(photo)).length.should.equal(1);
  }

  @test
  async addCostumeAPITag() {
    const user: User = await this.createUser();
    const photo: Photo = await this.createPhoto();

    const taggedCostume: Costume =
        await this.createCostume('Rooster', user.userID);
    const costumeProtoTag: huskysoft.gotagme.tag.Tag =
        new huskysoft.gotagme.tag.Tag({
          photo: photo.toProto(),
          key: taggedCostume.objectID.toHexString(),
        });
    const costumeTag: Tag =
        await this.photoAPI.handleAddAPITag(photo, costumeProtoTag, user);
    chai.expect(costumeTag).to.exist('No user tag was created.');
    costumeTag.addedBy.userID.should.equal(user.userID);
    costumeTag.currentState.should.equal(ApprovalState.New);
    costumeTag.tagText.should.equal('$' + taggedCostume.name);
    costumeTag.costume!.costumeID.should.equal(taggedCostume.costumeID);
    costumeTag.photo.photoID.should.equal(photo.photoID);

    (await this.tagStore.findByPhoto(photo)).length.should.equal(1);

    // Verify costumes don't duplicate.
    const dupeCostumeProtoTag: huskysoft.gotagme.tag.Tag =
        new huskysoft.gotagme.tag.Tag({
          photo: photo.toProto(),
          key: taggedCostume.objectID.toHexString(),
        });
    const dupeCostumeTag: Tag =
        await this.photoAPI.handleAddAPITag(photo, dupeCostumeProtoTag, user);
    dupeCostumeTag.tagID.should.equal(costumeTag.tagID);
    (await this.tagStore.findByPhoto(photo)).length.should.equal(1);
  }

  @test
  async addNewUserAPITag() {
    const user: User = await this.createUser();
    (await this.userStore.fetchAll()).length.should.equal(1);
    const photo: Photo = await this.createPhoto(user);
    (await this.userStore.fetchAll()).length.should.equal(1);
    const expectedDisplay = 'supercooldude';  // No leading @
    const newUserTagProto: huskysoft.gotagme.tag.Tag =
        new huskysoft.gotagme.tag.Tag({
          photo: photo.toProto(),
          key: 'serverID',
          display: '@' + expectedDisplay,
          tag: '@' + expectedDisplay,
        });
    const newUserTag: Tag =
        await this.photoAPI.handleAddAPITag(photo, newUserTagProto, user);
    chai.expect(newUserTag).to.exist('Tag not created for new user.');
    newUserTag.addedBy.userID.should.equal(user.userID);
    newUserTag.currentState.should.equal(ApprovalState.New);
    newUserTag.kind.should.equal(TagKind.User);
    newUserTag.tagText.should.equal(newUserTagProto.tag);
    newUserTag.tagText.should.equal(newUserTagProto.display);
    chai.expect(newUserTag.taggedUser)
        .to.exist('No user was on the added tag.');
    newUserTag.taggedUser!.displayName!.should.equal(expectedDisplay);

    // Try to add the same server user again to a different photo and ensure it
    // doesn't duplicate.
    const anotherPhoto: Photo = await this.createPhoto(user);
    const anotherNewUserTagProto: huskysoft.gotagme.tag.Tag =
        new huskysoft.gotagme.tag.Tag({
          photo: anotherPhoto.toProto(),
          key: 'serverID',
          display: '@' + expectedDisplay,
          tag: '@' + expectedDisplay,
        });
    (await this.userStore.fetchAll()).length.should.equal(2);
    const anotherNewUserTag: Tag = await this.photoAPI.handleAddAPITag(
        anotherPhoto, anotherNewUserTagProto, user);
    chai.expect(anotherNewUserTag)
        .to.exist('Tag not created for existing user.');
    anotherNewUserTag.taggedUser!.userID.should.equal(
        newUserTag.taggedUser!.userID);
    (await this.userStore.fetchAll()).length.should.equal(2);
  }

  @test.skip
  async addExistingUserFromServerIDAPITag() {}

  @test.skip
  async addTags() {
    const user: User = await this.createUser();
    const taggedCostume: Costume =
        await this.createCostume('Rooster', user.userID);
    const taggedUser: User = await this.createUser();

    const photo: Photo = await this.createPhoto();
    const tags: huskysoft.gotagme.tag.ITag[] = [
      {
        photo: photo.toProto(),
        key: taggedUser.objectID.toHexString(),
        taggedUser,
      },
      {
        photo: photo.toProto(),
        key: taggedCostume.objectID.toHexString(),
        costume: taggedCostume,
      },
    ];
    const capturedBy: huskysoft.gotagme.tag.Tag =
        new huskysoft.gotagme.tag.Tag({
          photo: photo.toProto(),
          key: user.objectID.toHexString(),
          taggedUser: user.toProto(),
        });

    const request: huskysoft.gotagme.tag.AddTagsToPhotoRequest =
        new huskysoft.gotagme.tag.AddTagsToPhotoRequest({
          tags,
          capturedBy,
        });

    const response =
        await this.photoAPI.handleAddTagsToPhoto(photo.photoID, request, user);
    response.tags.length.should.equal(2);
  }
}
