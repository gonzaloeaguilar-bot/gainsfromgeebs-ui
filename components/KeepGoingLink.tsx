"use client";

// A click wrapper, so KeepGoing itself can stay a server component and
// keep its copy and its links in the server HTML. Only the reporting
// needs the client.

import { trackClientEvent } from "@/lib/clientAnalytics";
import type { KeepGoingItem } from "@/components/KeepGoing";

export default function KeepGoingLink({
  item,
  position,
  children,
}: {
  item: KeepGoingItem;
  position: string;
  children: React.ReactNode;
}) {
  return (
    <div
      onClickCapture={() =>
        trackClientEvent("cta_click", {
          cta_id: item.ctaId,
          cta_text: item.title,
          cta_position: position,
        })
      }
    >
      {children}
    </div>
  );
}
