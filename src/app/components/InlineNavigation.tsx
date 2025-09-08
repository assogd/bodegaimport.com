'use client';

import { useState } from 'react';
import type { Section, Link, LinkGroup } from '@/types/hygraph';
import Overlay from './Overlay';

interface InlineNavigationProps {
  section: Section;
}

function isLinkGroup(item: Link | LinkGroup): item is LinkGroup {
  return 'links' in item && Array.isArray(item.links);
}

function isLink(item: Link | LinkGroup): item is Link {
  return 'href' in item && 'value' in item;
}

function isExternalLink(href: string): boolean {
  try {
    const url = new URL(href);
    // Check if it's an absolute URL (has protocol and hostname)
    // This works for both SSR and client-side
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    // If URL parsing fails, assume it's a relative link
    return false;
  }
}

export default function InlineNavigation({ section }: InlineNavigationProps) {
  const [overlayData, setOverlayData] = useState<{ isOpen: boolean; linkGroup: LinkGroup | null }>({
    isOpen: false,
    linkGroup: null,
  });

  const openOverlay = (linkGroup: LinkGroup) => {
    setOverlayData({ isOpen: true, linkGroup });
  };

  const closeOverlay = () => {
    setOverlayData({ isOpen: false, linkGroup: null });
  };

  return (
    <>
      {section.links && Array.isArray(section.links) && (
        <nav className="p-1 flex flex-col sm:flex-row gap-x-4 gap-y-2 justify-center items-center">
          {section.links.map((item, idx) => {
            if (isLinkGroup(item)) {
              return (
                <button
                  key={item.id || idx}
                  onClick={() => openOverlay(item)}
                  className="w-full sm:w-44 inline-block font-mono uppercase border border-black border-[.05em] rounded-lg px-4 pt-[.85em] pb-3 text-center hover:bg-gray-50 cursor-pointer"
                >
                  {item.value}
                </button>
              );
            } else if (isLink(item)) {
              const isExternal = isExternalLink(item.href);
              return (
                <a
                  key={item.id || idx}
                  href={item.href}
                  className="w-full sm:w-44 inline-block font-mono uppercase border border-black border-[.05em] rounded-lg px-4 pt-[.85em] pb-3 text-center"
                  {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {item.value}
                </a>
              );
            }
            return null;
          })}
        </nav>
      )}
      <Overlay
        isOpen={overlayData.isOpen}
        linkGroup={overlayData.linkGroup}
        onClose={closeOverlay}
      />
    </>
  );
}
