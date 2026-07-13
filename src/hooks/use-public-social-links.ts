"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_SOCIAL_LINKS,
  extractSocialLinks,
  type SocialLinks,
} from "@/lib/social-links";

let pendingSocialLinksRequest: Promise<SocialLinks> | null = null;

async function fetchPublicSocialLinks(): Promise<SocialLinks> {
  if (!pendingSocialLinksRequest) {
    pendingSocialLinksRequest = fetch("/api/content/settings", {
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to load public social links");
        }

        const payload = (await response.json()) as {
          data?: Record<string, string>;
        };

        return extractSocialLinks(payload.data);
      })
      .finally(() => {
        pendingSocialLinksRequest = null;
      });
  }

  return pendingSocialLinksRequest;
}

export function usePublicSocialLinks() {
  const [socialLinks, setSocialLinks] =
    useState<SocialLinks>(DEFAULT_SOCIAL_LINKS);

  useEffect(() => {
    let isMounted = true;

    void fetchPublicSocialLinks()
      .then((nextSocialLinks) => {
        if (isMounted) {
          setSocialLinks(nextSocialLinks);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSocialLinks(DEFAULT_SOCIAL_LINKS);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return socialLinks;
}
