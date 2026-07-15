"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultContent, type SiteContent } from "../data/content";

const SiteContentContext = createContext<SiteContent>(defaultContent);

function mergeContent(value: Partial<SiteContent>): SiteContent {
  return {
    ...defaultContent,
    ...value,
    person: { ...defaultContent.person, ...value.person },
    contact: { ...defaultContent.contact, ...value.contact },
    hero: { ...defaultContent.hero, ...value.hero },
    services: Array.isArray(value.services) ? value.services : defaultContent.services,
    places: Array.isArray(value.places) ? value.places : defaultContent.places,
    journeys: Array.isArray(value.journeys) ? value.journeys : defaultContent.journeys,
    hotels: Array.isArray(value.hotels) ? value.hotels : defaultContent.hotels,
    testimonials: Array.isArray(value.testimonials) ? value.testimonials : defaultContent.testimonials,
  };
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [remoteContent, setRemoteContent] = useState<Partial<SiteContent> | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/content.php", { signal: controller.signal, credentials: "same-origin" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Content request failed")))
      .then((payload) => {
        if (payload?.ok && payload.content) setRemoteContent(payload.content);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const content = useMemo(() => mergeContent(remoteContent ?? {}), [remoteContent]);
  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
