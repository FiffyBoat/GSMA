"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SiteSetting } from "./types";
import {
  ensureSiteSettings,
  getSiteSettingDefinition,
  getSiteSettingDefinitionsBySection,
  SITE_SETTING_DEFINITIONS,
  SITE_SETTINGS_SECTIONS,
} from "@/lib/site-settings";
import { Loader2, Save } from "lucide-react";

interface SettingsManagementProps {
  settings: SiteSetting[];
  setSettings: Dispatch<SetStateAction<SiteSetting[]>>;
  saving: boolean;
  onSaveSettings: (settings: SiteSetting[]) => Promise<boolean>;
}

export default function SettingsManagement({
  settings,
  setSettings,
  saving,
  onSaveSettings,
}: SettingsManagementProps) {
  const normalizedSettings = useMemo(
    () => ensureSiteSettings(settings),
    [settings]
  );
  const [dirtyKeys, setDirtyKeys] = useState<Set<string>>(new Set());

  const profileSettingKeys = new Set(
    SITE_SETTING_DEFINITIONS.map((setting) => setting.key)
  );
  const otherSettings = normalizedSettings.filter(
    (setting) => !profileSettingKeys.has(setting.key)
  );

  const updateSettingValue = (settingKey: string, nextValue: string) => {
    setDirtyKeys((currentKeys) => {
      const nextKeys = new Set(currentKeys);
      nextKeys.add(settingKey);
      return nextKeys;
    });

    setSettings((currentSettings) =>
      ensureSiteSettings(currentSettings).map((currentSetting) =>
        currentSetting.key === settingKey
          ? {
              ...currentSetting,
              id: currentSetting.id || currentSetting.key,
              value: nextValue,
            }
          : currentSetting
      )
    );
  };

  const saveSettingsGroup = async (items: SiteSetting[]) => {
    const itemsToSave = items.filter((item) => dirtyKeys.has(item.key));

    if (itemsToSave.length === 0) {
      return;
    }

    const didSave = await onSaveSettings(
      itemsToSave.map((item) => ({
        ...item,
        id: item.id || item.key,
        type: item.type || getSiteSettingDefinition(item.key)?.type || "text",
      }))
    );

    if (didSave) {
      setDirtyKeys((currentKeys) => {
        const nextKeys = new Set(currentKeys);
        itemsToSave.forEach((item) => nextKeys.delete(item.key));
        return nextKeys;
      });
    }
  };

  const renderSettingField = (setting: SiteSetting) => {
    const definition = getSiteSettingDefinition(setting.key);
    const label = definition?.label ?? setting.key.replace(/_/g, " ");
    const type = setting.type || definition?.type || "text";
    const isDirty = dirtyKeys.has(setting.key);

    if (definition?.isImage || setting.key.endsWith("_image_url")) {
      return (
        <div className="space-y-3">
          <ImageUpload
            value={setting.value}
            onChange={(nextValue) => updateSettingValue(setting.key, nextValue)}
            folder="leadership-profiles"
            label={label}
            aspectRatio="portrait"
          />
          <p className="text-sm text-gray-500">
            {isDirty
              ? "This image has unsaved changes."
              : definition?.description ?? "Profile image is ready."}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <Label className="capitalize">{label}</Label>
        {definition?.description && (
          <p className="text-sm text-gray-500">{definition.description}</p>
        )}
        {type === "textarea" ? (
          <Textarea
            value={setting.value}
            onChange={(event) => updateSettingValue(setting.key, event.target.value)}
            rows={5}
          />
        ) : (
          <Input
            value={setting.value}
            onChange={(event) => updateSettingValue(setting.key, event.target.value)}
          />
        )}
      </div>
    );
  };

  const renderSection = (
    title: string,
    description: string,
    sectionSettings: SiteSetting[],
    emptyState?: string
  ) => {
    if (sectionSettings.length === 0) {
      return null;
    }

    const dirtyCount = sectionSettings.filter((setting) =>
      dirtyKeys.has(setting.key)
    ).length;

    return (
      <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                dirtyCount > 0
                  ? "bg-amber-100 text-amber-900"
                  : "bg-emerald-100 text-emerald-900"
              }`}
            >
              {dirtyCount > 0
                ? `${dirtyCount} unsaved change${dirtyCount === 1 ? "" : "s"}`
                : "All changes saved"}
            </span>
            <Button
              type="button"
              className="w-full bg-[#8B0000] hover:bg-[#6B0000] sm:w-auto"
              disabled={dirtyCount === 0 || saving}
              onClick={() => void saveSettingsGroup(sectionSettings)}
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </Button>
          </div>
        </div>

        {sectionSettings.length > 0 ? (
          <div className="space-y-6">
            {sectionSettings.map((setting) => (
              <div key={setting.key}>{renderSettingField(setting)}</div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">{emptyState}</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700">
        Edit a profile section, then use <span className="font-semibold">Save Changes</span> once for that section. This keeps updates grouped and avoids partial saves.
      </div>

      {SITE_SETTINGS_SECTIONS.map((section) => {
        const sectionDefinitions = getSiteSettingDefinitionsBySection(section.id);
        const sectionSettings = sectionDefinitions
          .map((definition) =>
            normalizedSettings.find((setting) => setting.key === definition.key)
          )
          .filter((setting): setting is SiteSetting => Boolean(setting));

        return (
          <div key={section.id}>
            {renderSection(section.title, section.description, sectionSettings)}
          </div>
        );
      })}

      {renderSection(
        "Other Site Settings",
        "Existing general settings remain editable here.",
        otherSettings,
        "No additional site settings are configured yet."
      )}
    </div>
  );
}
