"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  type SiteSettingsSection,
} from "@/lib/site-settings";
import { Loader2, Save, Search, Settings2 } from "lucide-react";

interface SettingsManagementProps {
  settings: SiteSetting[];
  setSettings: Dispatch<SetStateAction<SiteSetting[]>>;
  saving: boolean;
  onSaveSettings: (settings: SiteSetting[]) => Promise<boolean>;
}

interface SectionView {
  id: string;
  title: string;
  description: string;
  settings: SiteSetting[];
}

const OTHER_SETTINGS_SECTION_ID = "__other_site_settings__";

function matchesSettingQuery(setting: SiteSetting, query: string) {
  if (!query.trim()) {
    return true;
  }

  const definition = getSiteSettingDefinition(setting.key);
  const searchableText = [
    setting.key,
    definition?.label,
    definition?.description,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchableText.includes(query.trim().toLowerCase());
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
  const [searchQuery, setSearchQuery] = useState("");
  const [openSections, setOpenSections] = useState<string[]>([
    SITE_SETTINGS_SECTIONS[0]?.id ?? "",
    SITE_SETTINGS_SECTIONS[1]?.id ?? "",
  ].filter(Boolean));

  const profileSettingKeys = useMemo(
    () => new Set(SITE_SETTING_DEFINITIONS.map((setting) => setting.key)),
    []
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

  const sectionViews = useMemo(() => {
    const mappedSections: SectionView[] = SITE_SETTINGS_SECTIONS.map((section) => {
      const sectionDefinitions = getSiteSettingDefinitionsBySection(section.id);
      const sectionSettings = sectionDefinitions
        .map((definition) =>
          normalizedSettings.find((setting) => setting.key === definition.key)
        )
        .filter((setting): setting is SiteSetting => Boolean(setting))
        .filter((setting) => matchesSettingQuery(setting, searchQuery));

      return {
        id: section.id,
        title: section.title,
        description: section.description,
        settings: sectionSettings,
      };
    }).filter((section) => section.settings.length > 0);

    const filteredOtherSettings = otherSettings.filter((setting) =>
      matchesSettingQuery(setting, searchQuery)
    );

    if (filteredOtherSettings.length > 0) {
      mappedSections.push({
        id: OTHER_SETTINGS_SECTION_ID,
        title: "Other Site Settings",
        description: "Existing general settings remain editable here.",
        settings: filteredOtherSettings,
      });
    }

    return mappedSections;
  }, [normalizedSettings, otherSettings, searchQuery]);

  const totalDirtyCount = dirtyKeys.size;
  const totalFieldCount = sectionViews.reduce(
    (count, section) => count + section.settings.length,
    0
  );
  const searchIsActive = searchQuery.trim().length > 0;
  const visibleSectionIds = sectionViews.map((section) => section.id);

  const scrollToSection = (sectionId: string) => {
    if (!searchIsActive) {
      setOpenSections((currentSections) =>
        currentSections.includes(sectionId)
          ? currentSections
          : [...currentSections, sectionId]
      );
    }

    const target = document.getElementById(`settings-section-${sectionId}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderSettingField = (setting: SiteSetting) => {
    const definition = getSiteSettingDefinition(setting.key);
    const label = definition?.label ?? setting.key.replace(/_/g, " ");
    const type = setting.type || definition?.type || "text";
    const isDirty = dirtyKeys.has(setting.key);
    const isWideField = Boolean(definition?.isImage || type === "textarea");

    return (
      <div
        key={setting.key}
        className={isWideField ? "md:col-span-2" : undefined}
      >
        <div className="rounded-2xl border border-gray-200 bg-white/90 p-4 shadow-sm">
          <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
            <div>
              <Label className="text-sm font-semibold text-gray-900">
                {label}
              </Label>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-gray-400">
                {setting.key}
              </p>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
                isDirty
                  ? "bg-amber-100 text-amber-900"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {isDirty ? "Unsaved" : "Saved"}
            </span>
          </div>

          {definition?.description ? (
            <p className="mb-3 text-sm text-gray-500">{definition.description}</p>
          ) : null}

          {definition?.isImage || setting.key.endsWith("_image_url") ? (
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
                  : definition?.description ?? "Image is ready."}
              </p>
            </div>
          ) : type === "textarea" ? (
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
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#8B0000]/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B0000]">
              <Settings2 className="h-3.5 w-3.5" />
              Settings Workspace
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Manage public content without digging through one long form
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Use the section menu to jump around, search for a specific setting,
              and save each section only when you are ready.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:min-w-[360px]">
            <div className="rounded-2xl border border-gray-200 bg-[linear-gradient(180deg,#ffffff,#f8f6f2)] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">
                Sections
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {sectionViews.length}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-[linear-gradient(180deg,#ffffff,#f8f6f2)] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">
                Visible Fields
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {totalFieldCount}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-amber-700">
                Unsaved
              </p>
              <p className="mt-1 text-2xl font-bold text-amber-900">
                {totalDirtyCount}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-emerald-700">
                Save Mode
              </p>
              <p className="mt-1 text-sm font-semibold text-emerald-900">
                Per section
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search settings by name, key, or description"
              className="pl-9"
            />
          </div>
          {searchIsActive ? (
            <p className="mt-2 text-sm text-gray-500">
              Showing matches for <span className="font-medium text-gray-700">{searchQuery}</span>.
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="xl:sticky xl:top-24 xl:self-start">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
              Section Navigation
            </h4>
            <div className="mt-4 space-y-2">
              {sectionViews.map((section) => {
                const dirtyCount = section.settings.filter((setting) =>
                  dirtyKeys.has(setting.key)
                ).length;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className="flex w-full items-start justify-between gap-3 rounded-2xl border border-gray-200 bg-[linear-gradient(180deg,#ffffff,#fbfaf7)] px-3 py-3 text-left transition hover:border-[#8B0000]/25 hover:bg-[#fff9f6]"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {section.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {section.settings.length} field
                        {section.settings.length === 1 ? "" : "s"}
                      </p>
                    </div>
                    <span
                      className={`inline-flex min-w-8 items-center justify-center rounded-full px-2 py-1 text-[11px] font-medium ${
                        dirtyCount > 0
                          ? "bg-amber-100 text-amber-900"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {dirtyCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="space-y-4">
          {sectionViews.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center text-sm text-gray-500 shadow-sm">
              No settings matched your search. Try a different keyword.
            </div>
          ) : (
            <Accordion
              type="multiple"
              value={searchIsActive ? visibleSectionIds : openSections}
              onValueChange={(nextValue) => {
                if (!searchIsActive) {
                  setOpenSections(nextValue as string[]);
                }
              }}
              className="space-y-4"
            >
              {sectionViews.map((section) => {
                const dirtyCount = section.settings.filter((setting) =>
                  dirtyKeys.has(setting.key)
                ).length;

                return (
                  <AccordionItem
                    key={section.id}
                    value={section.id}
                    id={`settings-section-${section.id}`}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                  >
                    <div className="px-5 pt-1 sm:px-6">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex min-w-0 flex-1 flex-col gap-3 text-left sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                              {section.title}
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                              {section.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2 sm:justify-end">
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                              {section.settings.length} field
                              {section.settings.length === 1 ? "" : "s"}
                            </span>
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                dirtyCount > 0
                                  ? "bg-amber-100 text-amber-900"
                                  : "bg-emerald-100 text-emerald-900"
                              }`}
                            >
                              {dirtyCount > 0
                                ? `${dirtyCount} unsaved`
                                : "Saved"}
                            </span>
                          </div>
                        </div>
                      </AccordionTrigger>
                    </div>

                    <AccordionContent>
                      <div className="border-t border-gray-100 px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
                        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-sm text-slate-600">
                            Update the fields below, then save this section when you
                            are done.
                          </p>
                          <Button
                            type="button"
                            className="w-full bg-[#8B0000] hover:bg-[#6B0000] sm:w-auto"
                            disabled={dirtyCount === 0 || saving}
                            onClick={() => void saveSettingsGroup(section.settings)}
                          >
                            {saving ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Save className="h-4 w-4" />
                            )}
                            Save Changes
                          </Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          {section.settings.map((setting) => renderSettingField(setting))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
}
