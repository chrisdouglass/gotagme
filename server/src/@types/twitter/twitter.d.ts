// Cannot find name 'HTMLElement'
declare interface HTMLElement {}

export interface TwitterUsersSearchResponse {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  profile_image_url_https: string;
  profile_banner_url: string;
}

export interface TwitterVerifyUserResponse extends TwitterUsersSearchResponse {
  created_at: string;
  description: string;
  favourites_count: number;
  followers_count: number;
  friends_count: number;
  id: number;
  id_str: string;
  lang: string;  // 2-letter lang
  location: string;
  name: string;
  profile_background_color: string;  // hex like 1A1B1F
  profile_background_image_url: string;
  profile_background_image_url_https: string;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_link_color: string;  // hex like 1A1B1F
  profile_sidebar_border_color: string;  // hex like 1A1B1F
  profile_sidebar_fill_color: string;  // hex like 1A1B1F
  profile_text_color: string;  // hex like 1A1B1F
  profile_use_background_image: boolean;
  protected: boolean;
  screen_name: string;
  time_zone: string;  // Like 'Pacific Time (US & Canada)'
  url?: string;
  utc_offset: number;
  verified: boolean;
}
