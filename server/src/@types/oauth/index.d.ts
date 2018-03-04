declare module 'oauth' {
  export type ParsedQueryString = {
    [x: string]: any;
  };

  export type TokenCallback = (error: any, token: string, token_secret: string, parsedQueryString: ParsedQueryString) => void;

  export class OAuth {
    constructor(requestTokenUrl: string, accessTokenUrl: string, applicationConsumerKey: string, applicationSecret: string, oauthVersion: string, oauthCallbackUrl: string, encryption: string);
    get(url: string, userToken: string, userSecret: string, callback: (error: any, data: any, response: any) => any): OAuth;
    delete(url: string, userToken: string, userSecret: string, callback: (error: any, data: any, response: any) => any): OAuth;
    post(url: string, oauth_token: string, oauth_token_secret: string, post_body: any, post_content_type: string, callback: any): OAuth;
    put(url: string, oauth_token: string, oauth_token_secret: string, post_body: any, post_content_type: string, callback: any): OAuth;
    getOAuthRequestToken(callback: TokenCallback): void;
    getOAuthRequestToken(extraParams: any, callback: TokenCallback): void;
    getOAuthAccessToken(oauth_token: string, oauth_token_secret: string, oauth_verifier: string, callback: TokenCallback): void;
    getOAuthAccessToken(oauth_token: string, oauth_token_secret: string, callback: TokenCallback): void;
  }

  export class OAuthEcho extends OAuth {}
}
