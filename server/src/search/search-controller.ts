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

  /**
   * Performs an autocomplete search across all data types.
   * @param text The text to use for searching.
   * @param expanded Currently if true, this will cause the suits of any matched users to also be
   * included in the search results.
   */
  async autocomplete(text: string, expanded?: boolean) {
    const first: string = text.charAt(0);
    if (first === '@') {
      return (await this.searchUsers(text.substring(1, text.length - 1))).concat(
              await this.searchTwitterAPIUsers(text));
    } else if (first === '$') {
      return this.searchCostumes(text.substring(1, text.length - 1));
    }

    const costumes: huskysoft.gotagme.tag.Tag[] = await this.searchCostumes(text, expanded);
    const users: huskysoft.gotagme.tag.Tag[] = await this.searchUsers(text);
    const apiTwitter: huskysoft.gotagme.tag.Tag[] = await this.searchTwitterAPIUsers(text);
    return costumes.concat(users).concat(apiTwitter);
  }

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

  /**
   * Performs a search of costumes.
   * @param text The text to search.
   * @param expanded If true, costumes owned by users who match the text will also be included.
   */
  async searchCostumes(text: string, expanded?: boolean): Promise<huskysoft.gotagme.tag.Tag[]> {
    const costumes: Costume[] = await this.costumeStore.findByText(text);
    if (expanded) {
      const matchingUsers: User[] = await this.userStore.findByText(text);
      for (let i = 0; i < matchingUsers.length; i++) {
        costumes.push(...(await this.costumeStore.findByUserID(matchingUsers[i].userID)));
      }
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
