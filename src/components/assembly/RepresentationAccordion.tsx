"use client";

import { useState } from "react";
import LeadershipImage from "@/components/shared/LeadershipImage";
import { ChevronDown, User } from "lucide-react";

const constituencyLabels: Record<string, string> = {
  "ngleshie-amanfro-bortianor": "Bortianor-Ngleshie-Amanfro Constituency",
  "bortianor-ngleshie-amanfro": "Bortianor-Ngleshie-Amanfro Constituency",
  "obom-domeabra": "Domeabra-Obom Constituency",
  "domeabra-obom": "Domeabra-Obom Constituency",
};

function formatConstituency(value: string) {
  return constituencyLabels[value] || value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function normalizeSupabaseImageUrl(url: string) {
  if (!url || typeof url !== "string") {
    return "";
  }

  const trimmed = url.trim();
  const matches = [...trimmed.matchAll(/https?:\/\/[^\s"]+/g)];
  if (matches.length > 1) {
    return matches[matches.length - 1][0];
  }

  if (matches.length === 1) {
    return matches[0][0];
  }

  const storagePathMatch = trimmed.match(/website-images\/(.+?)($|\?)/);
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (storagePathMatch && baseUrl) {
    return `${baseUrl}/storage/v1/object/public/website-images/${storagePathMatch[1]}`;
  }

  return trimmed;
}

function AssemblyMemberCard({ member, areaName }: { member: any; areaName?: string }) {
  return (
    <div className="bg-white rounded-[22px] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200">
      {member.image_url ? (
        <div className="relative h-[260px] sm:h-[300px] md:h-[320px] overflow-hidden bg-[linear-gradient(180deg,#faf7f1,#f1eadf)]">
          <div className="absolute inset-x-0 top-0 h-16 bg-[radial-gradient(circle_at_top,rgba(139,0,0,0.12),transparent_70%)]" />
          <LeadershipImage
            src={normalizeSupabaseImageUrl(member.image_url)}
            alt={member.name}
            width={420}
            height={320}
            rounded={false}
            className="h-full w-full p-4 sm:p-5 md:p-6"
          />
        </div>
      ) : (
        <div className="h-[260px] sm:h-[300px] md:h-[320px] bg-gradient-to-br from-[#8B0000] to-[#6B0000] flex items-center justify-center">
          <User className="w-[60px] sm:w-[70px] md:w-[80px] h-[60px] sm:h-[70px] md:h-[80px] text-white/30" />
        </div>
      )}
      <div className="p-[16px] sm:p-[18px] md:p-[20px]">
        <h4 className="text-[16px] sm:text-[17px] md:text-[18px] font-bold text-gray-900 mb-[8px] sm:mb-[10px]">
          {member.name}
        </h4>
        {member.position && (
          <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#8B0000] font-semibold mb-[12px] sm:mb-[14px]">
            {member.position}
          </p>
        )}
        {areaName && (
          <p className="text-[11px] sm:text-[12px] md:text-[13px] text-gray-500 mb-[12px] px-[8px] py-[4px] bg-gray-100 rounded inline-block">
            {areaName}
          </p>
        )}
        {member.bio && (
          <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 mb-[12px] sm:mb-[14px] line-clamp-3">
            {member.bio}
          </p>
        )}
        {(member.contact_email || member.contact_phone) && (
          <div className="pt-[12px] sm:pt-[14px] border-t border-gray-200 space-y-[6px]">
            {member.contact_email && (
              <a href={`mailto:${member.contact_email}`} className="text-[11px] sm:text-[12px] md:text-[13px] text-[#8B0000] hover:underline block truncate">
                {member.contact_email}
              </a>
            )}
            {member.contact_phone && (
              <a href={`tel:${member.contact_phone}`} className="text-[11px] sm:text-[12px] md:text-[13px] text-[#8B0000] hover:underline block">
                {member.contact_phone}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function RepresentativePanel({
  id,
  person,
  label,
  badge,
  members,
  emptyText,
  isOpen,
  onToggle,
}: {
  id: string;
  person: any;
  label: string;
  badge?: string;
  members: any[];
  emptyText: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <article className="bg-white rounded-[22px] overflow-hidden shadow-sm border border-gray-200">
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        className="grid w-full grid-cols-1 text-left md:grid-cols-[280px_1fr]"
      >
        {person.image_url ? (
          <div className="relative h-[260px] sm:h-[300px] md:h-full min-h-[280px] overflow-hidden bg-[linear-gradient(180deg,#faf7f1,#f1eadf)]">
            <div className="absolute inset-x-0 top-0 h-16 bg-[radial-gradient(circle_at_top,rgba(139,0,0,0.12),transparent_70%)]" />
            <LeadershipImage
              src={normalizeSupabaseImageUrl(person.image_url)}
              alt={person.name}
              width={420}
              height={320}
              rounded={false}
              className="h-full w-full p-4 sm:p-5 md:p-6"
            />
          </div>
        ) : (
          <div className="h-[260px] sm:h-[300px] md:h-full min-h-[280px] bg-gradient-to-br from-[#8B0000] to-[#6B0000] flex items-center justify-center">
            <User className="w-[60px] sm:w-[70px] md:w-[80px] h-[60px] sm:h-[70px] md:h-[80px] text-white/30" />
          </div>
        )}

        <div className="p-[18px] sm:p-[22px] md:p-[28px] flex flex-col justify-between gap-[20px]">
          <div>
            <h3 className="text-[18px] sm:text-[20px] md:text-[24px] font-bold text-gray-900 mb-[8px] sm:mb-[10px]">
              {person.title && <span>{person.title} </span>}
              {person.name}
            </h3>
            {person.position && (
              <p className="text-[13px] sm:text-[14px] md:text-[15px] text-[#8B0000] font-semibold mb-[12px] sm:mb-[14px]">
                {person.position}
              </p>
            )}
            {badge && (
              <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 px-[10px] py-[6px] bg-gray-100 rounded inline-block">
                {badge}
              </p>
            )}
          </div>

          <div className="inline-flex w-fit items-center gap-[8px] rounded-md bg-[#8B0000] px-[14px] py-[9px] text-[13px] sm:text-[14px] font-semibold text-white">
            <span>{isOpen ? label.replace("Show", "Hide") : label}</span>
            <ChevronDown className={`w-[16px] h-[16px] transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-gray-200 bg-gray-50 p-[18px] sm:p-[24px] md:p-[32px]">
          {members.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] sm:gap-[24px] md:gap-[28px]">
              {members.map((member: any) => (
                <AssemblyMemberCard
                  key={member.id}
                  member={member}
                  areaName={member.electoral_area_name}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-[13px] sm:text-[14px] md:text-[15px] italic">{emptyText}</p>
          )}
        </div>
      )}
    </article>
  );
}

export default function RepresentationAccordion({
  constituencyGroups,
  presidingMember,
  governmentAppointees,
}: {
  constituencyGroups: any[];
  presidingMember?: any;
  governmentAppointees: any[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div className="space-y-[32px] sm:space-y-[40px] md:space-y-[48px]">
      {constituencyGroups.map(({ mp, constituency, assemblyMembers }) => (
        <RepresentativePanel
          key={mp.id}
          id={`mp-${mp.id}`}
          person={mp}
          label="Show assembly members"
          badge={constituency ? formatConstituency(constituency) : undefined}
          members={assemblyMembers}
          emptyText="No assembly members assigned to this constituency yet."
          isOpen={openId === `mp-${mp.id}`}
          onToggle={handleToggle}
        />
      ))}

      {presidingMember && (
        <RepresentativePanel
          id="presiding-member"
          person={presidingMember}
          label="Show government appointees"
          badge="Presiding Member"
          members={governmentAppointees}
          emptyText="No government appointees added yet."
          isOpen={openId === "presiding-member"}
          onToggle={handleToggle}
        />
      )}
    </div>
  );
}
