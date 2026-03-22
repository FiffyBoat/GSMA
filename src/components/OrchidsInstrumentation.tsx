"use client";

import { useState } from "react";
import Script from "next/script";
import VisualEditsMessenger from "@/visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";

export default function OrchidsInstrumentation() {
  const [isInIframe] = useState(
    () => typeof window !== "undefined" && window.parent !== window
  );

  if (!isInIframe) {
    return null;
  }

  return (
    <>
      <Script
        id="orchids-browser-logs"
        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
        strategy="afterInteractive"
        data-orchids-project-id="c14ac6a4-5062-43c5-98c3-5857e7ab6701"
      />
      <ErrorReporter />
      <Script
        id="orchids-route-messenger"
        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
        strategy="afterInteractive"
        data-target-origin="*"
        data-message-type="ROUTE_CHANGE"
        data-include-search-params="true"
        data-only-in-iframe="true"
        data-debug="true"
        data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
      />
      <VisualEditsMessenger />
    </>
  );
}
