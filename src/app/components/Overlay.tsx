'use client';

import { useEffect } from 'react';
import type { LinkGroup } from '@/types/hygraph';

interface OverlayProps {
  isOpen: boolean;
  linkGroup: LinkGroup | null;
  onClose: () => void;
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

export default function Overlay({ isOpen, linkGroup, onClose }: OverlayProps) {
  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      // Lock the body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        // Restore scroll position when overlay closes
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen || !linkGroup) return null;

  return (
    <div className="fixed inset-0 bg-accent flex flex-col items-center justify-center z-50 p-4">
      <div className="w-full relative mt-1 mb-4">
        <h3 className="md:text-lg uppercase">{linkGroup.value}</h3>
        <button onClick={onClose} className="absolute right-0 top-0">
          (Stäng)
        </button>
      </div>
      <div className="flex w-full grow flex-col justify-center items-center h-full md:flex-row gap-3">
        {linkGroup.links.map((link, idx) => {
          const isExternal = isExternalLink(link.href);
          return (
            <a
              key={link.id || idx}
              href={link.href}
              className="grow h-full w-full uppercase border border-black border-[.05em] rounded-lg px-4 pt-[.85em] pb-3 text-center flex items-center justify-center hover:text-lg"
              onClick={onClose}
              {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {link.value}
            </a>
          );
        })}
      </div>
    </div>
  );
}
