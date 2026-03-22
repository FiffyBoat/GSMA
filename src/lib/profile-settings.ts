export type SettingInputType = "text" | "textarea";
export type ProfileSettingsSectionId = "mce" | "mcd";

export interface SiteSettingRecord {
  id: string;
  key: string;
  value: string;
  type: string;
}

export interface ProfileSettingDefinition {
  key: string;
  label: string;
  type: SettingInputType;
  section: ProfileSettingsSectionId;
  defaultValue: string;
  description?: string;
  isImage?: boolean;
}

export interface ProfileSettingsSection {
  id: ProfileSettingsSectionId;
  title: string;
  description: string;
}

export const PROFILE_SETTINGS_SECTIONS: ProfileSettingsSection[] = [
  {
    id: "mce",
    title: "MCE Profile",
    description:
      "Manage the Municipal Chief Executive page content and portrait from the admin dashboard.",
  },
  {
    id: "mcd",
    title: "MCD Profile",
    description:
      "Manage the Municipal Coordinating Director page content and profile details from the admin dashboard.",
  },
];

export const PROFILE_SETTING_DEFINITIONS: ProfileSettingDefinition[] = [
  {
    key: "mce_name",
    label: "MCE Name",
    type: "text",
    section: "mce",
    defaultValue: "Hon. Moses Kabu Kubi Ocansey",
  },
  {
    key: "mce_title",
    label: "MCE Title",
    type: "text",
    section: "mce",
    defaultValue: "Municipal Chief Executive, Ga South Municipal Assembly",
  },
  {
    key: "mce_image_url",
    label: "MCE Profile Image",
    type: "text",
    section: "mce",
    defaultValue: "/mce-portrait.jpg",
    description: "Upload or paste the public image URL for the MCE portrait.",
    isImage: true,
  },
  {
    key: "mce_quote",
    label: "MCE Quote",
    type: "textarea",
    section: "mce",
    defaultValue:
      "Our commitment is to ensure that every resident of Ga South Municipality enjoys improved living standards through sustainable development, transparent governance, and efficient service delivery.",
  },
  {
    key: "mce_intro",
    label: "MCE Introduction",
    type: "textarea",
    section: "mce",
    defaultValue:
      "Hon. Moses Kabu Kubi Ocansey is the Municipal Chief Executive of the Ga South Municipal Assembly. He is serving as the primary liaison for the central government. As the chairman of the Executive Committee of the Assembly, he will play a pivotal role in steering the assembly's vision and objectives.\n\nIn his capacity, he will lead the Executive Committee meetings with authority and insight. Should the MCE be unavailable, a fellow committee member is elected by their peers to maintain the flow of discussions and decisions.\n\nMCE is tasked with the daily oversight of the Assembly's executive and administrative functions, ensuring everything operates seamlessly. His leadership extends to supervising various departments, empowering them to achieve their goals and make a positive impact on the community he is serving.",
    description:
      "Use blank lines to separate paragraphs on the public page.",
  },
  {
    key: "mce_role_heading",
    label: "MCE Role Section Heading",
    type: "text",
    section: "mce",
    defaultValue: "Executive Committee Role",
  },
  {
    key: "mce_role_body",
    label: "MCE Role Section Content",
    type: "textarea",
    section: "mce",
    defaultValue:
      "As Chairman of the Executive Committee, Hon. Moses Kabu Kubi Ocansey leads meetings with authority and insight, steering the assembly's vision and objectives.\n\nShould the MCE be unavailable, a fellow committee member is elected by their peers to maintain the flow of discussions and decisions.",
    description:
      "Use blank lines to separate paragraphs in the role section.",
  },
  {
    key: "mce_previous_heading",
    label: "Previous MCE Section Heading",
    type: "text",
    section: "mce",
    defaultValue: "Previous MCE",
  },
  {
    key: "mce_previous_name",
    label: "Previous MCE Name",
    type: "text",
    section: "mce",
    defaultValue: "Hon. Joseph Nyarni Stephen",
  },
  {
    key: "mce_previous_body",
    label: "Previous MCE Description",
    type: "textarea",
    section: "mce",
    defaultValue: "Served as Municipal Chief Executive from 2016 to 2024",
  },
  {
    key: "mce_contact_heading",
    label: "Contact Section Heading",
    type: "text",
    section: "mce",
    defaultValue: "Contact Information",
  },
  {
    key: "mce_contact_phone",
    label: "Contact Phone",
    type: "text",
    section: "mce",
    defaultValue: "+233 (0)30 290 8470",
  },
  {
    key: "mce_contact_note",
    label: "Contact Note",
    type: "textarea",
    section: "mce",
    defaultValue:
      "For official correspondence and inquiries regarding municipal affairs.",
  },
  {
    key: "mcd_name",
    label: "MCD Name",
    type: "text",
    section: "mcd",
    defaultValue: "Eugenia Akporhor Agbenyegah",
  },
  {
    key: "mcd_title",
    label: "MCD Title",
    type: "text",
    section: "mcd",
    defaultValue:
      "Municipal Coordinating Director, Ga South Municipal Assembly",
  },
  {
    key: "mcd_image_url",
    label: "MCD Profile Image",
    type: "text",
    section: "mcd",
    defaultValue: "/mcd-portrait.jpg",
    description: "Upload or paste the public image URL for the MCD portrait.",
    isImage: true,
  },
  {
    key: "mcd_quote",
    label: "MCD Quote",
    type: "textarea",
    section: "mcd",
    defaultValue:
      "Effective coordination and professional management of the Assembly's administrative functions are key to achieving our development objectives and serving our residents better.",
  },
  {
    key: "mcd_intro",
    label: "MCD Introduction",
    type: "textarea",
    section: "mcd",
    defaultValue:
      "Eugenia Akporhor Agbenyegah serves as the Municipal Coordinating Director (MCD) of the Ga South Municipal Assembly. As the administrative head, she coordinates the activities of all decentralized departments within the municipality and ensures the smooth implementation of policies and programmes.",
    description:
      "Use blank lines to separate paragraphs on the public page.",
  },
  {
    key: "mcd_education_heading",
    label: "Education Section Heading",
    type: "text",
    section: "mcd",
    defaultValue: "Education",
  },
  {
    key: "mcd_education_items",
    label: "Education Items",
    type: "textarea",
    section: "mcd",
    defaultValue:
      "Master's Degree in Development Studies\nBachelor's Degree in Administration\nProfessional Training in Local Government Administration",
    description: "Add one education item per line.",
  },
  {
    key: "mcd_experience_heading",
    label: "Experience Section Heading",
    type: "text",
    section: "mcd",
    defaultValue: "Experience",
  },
  {
    key: "mcd_experience_items",
    label: "Experience Items",
    type: "textarea",
    section: "mcd",
    defaultValue:
      "Over 20 years in the Local Government Service\nFormer Deputy Director at Regional Coordinating Council\nExtensive Project Management Experience",
    description: "Add one experience item per line.",
  },
  {
    key: "mcd_responsibilities_heading",
    label: "Responsibilities Section Heading",
    type: "text",
    section: "mcd",
    defaultValue: "Key Responsibilities",
  },
  {
    key: "mcd_responsibilities_items",
    label: "Responsibilities Items",
    type: "textarea",
    section: "mcd",
    defaultValue:
      "Coordinate all administrative activities\nSupervise departmental heads\nImplement Assembly decisions\nPrepare annual action plans\nMonitor project implementation\nEnsure effective service delivery",
    description: "Add one responsibility per line.",
  },
  {
    key: "mcd_role_heading",
    label: "MCD Role Section Heading",
    type: "text",
    section: "mcd",
    defaultValue: "Role of the MCD",
  },
  {
    key: "mcd_role_body",
    label: "MCD Role Section Content",
    type: "textarea",
    section: "mcd",
    defaultValue:
      "The Municipal Coordinating Director is the administrative head of the Municipal Assembly, responsible for the day-to-day performance of the administrative functions of the Assembly. The MCD is a career civil servant appointed by the President on the recommendation of the Local Government Service Council. The MCD coordinates the activities of all decentralized departments and is responsible for the effective implementation of the policies, programmes, and projects of the Assembly.",
    description:
      "Use blank lines to separate paragraphs in the role section.",
  },
];

export const MCE_PROFILE_SETTING_KEYS = PROFILE_SETTING_DEFINITIONS
  .filter((definition) => definition.section === "mce")
  .map((definition) => definition.key);

export const MCD_PROFILE_SETTING_KEYS = PROFILE_SETTING_DEFINITIONS
  .filter((definition) => definition.section === "mcd")
  .map((definition) => definition.key);

const profileSettingDefinitionsByKey = new Map(
  PROFILE_SETTING_DEFINITIONS.map((definition) => [definition.key, definition])
);

const profileSettingOrder = new Map(
  PROFILE_SETTING_DEFINITIONS.map((definition, index) => [definition.key, index])
);

export function getProfileSettingDefinition(
  key: string
): ProfileSettingDefinition | undefined {
  return profileSettingDefinitionsByKey.get(key);
}

export function getProfileSettingDefinitionsBySection(
  section: ProfileSettingsSectionId
): ProfileSettingDefinition[] {
  return PROFILE_SETTING_DEFINITIONS.filter(
    (definition) => definition.section === section
  );
}

export function ensureProfileSettings(
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

  PROFILE_SETTING_DEFINITIONS.forEach((definition) => {
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
    const leftOrder = profileSettingOrder.get(left.key);
    const rightOrder = profileSettingOrder.get(right.key);

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

export function buildSiteSettingsMap(
  settings: Array<{ key: string; value: string }>
): Record<string, string> {
  const settingsMap: Record<string, string> = {};

  PROFILE_SETTING_DEFINITIONS.forEach((definition) => {
    settingsMap[definition.key] = definition.defaultValue;
  });

  settings.forEach((setting) => {
    if (typeof setting.key === "string") {
      settingsMap[setting.key] = typeof setting.value === "string" ? setting.value : "";
    }
  });

  return settingsMap;
}

export function splitSettingParagraphs(value: string): string[] {
  const paragraphs = value
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length > 0) {
    return paragraphs;
  }

  return value.trim() ? [value.trim()] : [];
}

export function splitSettingLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}
