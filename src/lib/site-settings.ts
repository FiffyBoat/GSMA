import {
  PROFILE_SETTING_DEFINITIONS,
  PROFILE_SETTINGS_SECTIONS,
  type ProfileSettingDefinition,
  type ProfileSettingsSection,
  splitSettingLines,
  splitSettingParagraphs,
} from "./profile-settings";
import {
  SITE_PAGE_SETTING_DEFINITIONS,
  SITE_PAGE_SETTINGS_SECTIONS,
  type SitePageSettingDefinition,
  type SitePageSettingsSection,
} from "./site-page-settings";

export type SiteSettingsSection = ProfileSettingsSection | SitePageSettingsSection;
export type SiteSettingDefinition =
  | ProfileSettingDefinition
  | SitePageSettingDefinition;

export interface SiteSettingRecord {
  id: string;
  key: string;
  value: string;
  type: string;
}

export const SITE_SETTINGS_SECTIONS: SiteSettingsSection[] = [
  ...PROFILE_SETTINGS_SECTIONS,
  ...SITE_PAGE_SETTINGS_SECTIONS,
];

export const SITE_SETTING_DEFINITIONS: SiteSettingDefinition[] = [
  ...PROFILE_SETTING_DEFINITIONS,
  ...SITE_PAGE_SETTING_DEFINITIONS,
];

const siteSettingDefinitionsByKey = new Map(
  SITE_SETTING_DEFINITIONS.map((definition, index) => [
    definition.key,
    { definition, index },
  ])
);

export function getSiteSettingDefinition(
  key: string
): SiteSettingDefinition | undefined {
  return siteSettingDefinitionsByKey.get(key)?.definition;
}

export function getSiteSettingDefinitionsBySection(
  sectionId: SiteSettingsSection["id"]
): SiteSettingDefinition[] {
  return SITE_SETTING_DEFINITIONS.filter(
    (definition) => definition.section === sectionId
  );
}

export function ensureSiteSettings(
  settings: SiteSettingRecord[]
): SiteSettingRecord[] {
  const mergedSettings = new Map(
    settings.map((setting) => [
      setting.key,
      {
        id: setting.id || setting.key,
        key: setting.key,
        value: setting.value ?? "",
        type: setting.type || "text",
      },
    ])
  );

  SITE_SETTING_DEFINITIONS.forEach((definition) => {
    if (!mergedSettings.has(definition.key)) {
      mergedSettings.set(definition.key, {
        id: definition.key,
        key: definition.key,
        value: definition.defaultValue,
        type: definition.type,
      });
    }
  });

  return Array.from(mergedSettings.values()).sort((left, right) => {
    const leftOrder = siteSettingDefinitionsByKey.get(left.key)?.index;
    const rightOrder = siteSettingDefinitionsByKey.get(right.key)?.index;

    if (typeof leftOrder === "number" && typeof rightOrder === "number") {
      return leftOrder - rightOrder;
    }

    if (typeof leftOrder === "number") {
      return -1;
    }

    if (typeof rightOrder === "number") {
      return 1;
    }

    return left.key.localeCompare(right.key);
  });
}

export function buildManagedSiteSettingsMap(
  settings: Array<{ key: string; value: string }>
): Record<string, string> {
  const settingsMap: Record<string, string> = {};

  SITE_SETTING_DEFINITIONS.forEach((definition) => {
    settingsMap[definition.key] = definition.defaultValue;
  });

  settings.forEach((setting) => {
    if (typeof setting.key === "string") {
      settingsMap[setting.key] =
        typeof setting.value === "string" ? setting.value : "";
    }
  });

  return settingsMap;
}

export function splitSettingRows(value: string): string[][] {
  return splitSettingLines(value)
    .map((line) => line.split("|").map((part) => part.trim()))
    .filter((parts) => parts.some(Boolean));
}

export function splitSemicolonValues(value: string): string[] {
  return value
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
}

export { splitSettingLines, splitSettingParagraphs };
