export const SOCIAL_LINK_KEYS = {
  facebook: "contact_facebook_url",
  tiktok: "contact_twitter_url",
  instagram: "contact_instagram_url",
  youtube: "contact_youtube_url",
} as const;

export interface SocialLinks {
  facebook: string;
  tiktok: string;
  instagram: string;
  youtube: string;
}

export const DEFAULT_SOCIAL_LINKS: SocialLinks = {
  facebook: "https://web.facebook.com/gasouthmunicipal",
  tiktok: "",
  instagram: "https://www.instagram.com/gasouthmunicipalassembly/",
  youtube: "https://www.youtube.com/channel/UCJcI5FHNEmZQjNvZ3_hkRpg",
};

export function extractSocialLinks(
  settings?: Partial<Record<string, string>> | null
): SocialLinks {
  return {
    facebook:
      settings?.[SOCIAL_LINK_KEYS.facebook] || DEFAULT_SOCIAL_LINKS.facebook,
    tiktok:
      settings?.[SOCIAL_LINK_KEYS.tiktok] || DEFAULT_SOCIAL_LINKS.tiktok,
    instagram:
      settings?.[SOCIAL_LINK_KEYS.instagram] || DEFAULT_SOCIAL_LINKS.instagram,
    youtube:
      settings?.[SOCIAL_LINK_KEYS.youtube] || DEFAULT_SOCIAL_LINKS.youtube,
  };
}
