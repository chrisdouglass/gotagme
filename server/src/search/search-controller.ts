import {TwitterUsersSearchResponse} from '../@types/twitter/twitter';
import {TwitterFetcher} from '../api/twitter/twitter_fetcher';
import {Costume} from '../model/costume';
import {User} from '../model/user';
import {huskysoft} from '../protos';
import {CostumeStore} from '../store/costume.store';
import {UserStore} from '../store/user.store';

export class SearchController {
  constructor(
      private costumeStore: CostumeStore,
      // private tagStore: TagStore,
      private userStore: UserStore,
      private twitterFetcher: TwitterFetcher,
  ) {}

  async searchTwitterAPIUsers(text: string):
      Promise<huskysoft.gotagme.tag.Tag[]> {
    const apiResults: TwitterUsersSearchResponse[] =
        await this.twitterFetcher.searchForUsers(text);
    return apiResults.map((response: TwitterUsersSearchResponse) => {
      return new huskysoft.gotagme.tag.Tag({
        key: response.id_str,
        tag: '@' + response.screen_name,
        display: response.name,
      });
    });
  }

  async searchCostumes(text: string): Promise<huskysoft.gotagme.tag.Tag[]> {
    const costumes: Costume[] = await this.costumeStore.findByText(text);
    const matchingUsers: User[] = await this.userStore.findByText(text);
    for (let i = 0; i < matchingUsers.length; i++) {
      costumes.push(...(await this.costumeStore.findByUserID(matchingUsers[i].userID)));
    }
    return costumes.map((costume: Costume) => {
      return new huskysoft.gotagme.tag.Tag({
        key: costume.objectID.toHexString(),
        tag: costume.name,
        display: costume.name,
        costume: costume.toProto(),
      });
    });
  }

  async searchUsers(text: string): Promise<huskysoft.gotagme.tag.Tag[]> {
    const users: User[] = await this.userStore.findByText(text);
    return users.map((user: User) => {
      return new huskysoft.gotagme.tag.Tag({
        key: user.objectID.toHexString(),
        tag: user.displayName,
        display: user.displayName,
        taggedUser: user.toProto(),
      });
    });
  }
}
