"use client";

import { type ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface ServiceShowMoreProps {
  children: ReactNode;
  className?: string;
  collapsedLabel?: string;
  expandedLabel?: string;
}

export default function ServiceShowMore({
  children,
  className,
  collapsedLabel = "Show more details",
  expandedLabel = "Show less",
}: ServiceShowMoreProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        "mb-8 rounded-2xl border border-[#eadfce] bg-[#fffaf4] p-4 sm:p-5",
        className
      )}
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 rounded-xl bg-white px-4 py-3 text-left transition-colors hover:bg-[#fff5eb] focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:ring-offset-2">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8B0000]">
            Additional Information
          </p>
          <p className="mt-1 text-sm font-semibold text-[#1f2937]">
            {isOpen ? expandedLabel : collapsedLabel}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-[#8B0000] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
        <div className="px-1 pt-6">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
