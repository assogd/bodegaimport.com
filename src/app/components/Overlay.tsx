'use client';

import { useState } from 'react';
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
  if (!isOpen || !linkGroup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-mono uppercase">{linkGroup.value}</h3>
          <button onClick={onClose} className="text-2xl font-bold hover:text-gray-600">
            ×
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {linkGroup.links.map((link, idx) => {
            const isExternal = isExternalLink(link.href);
            return (
              <a
                key={link.id || idx}
                href={link.href}
                className="w-full inline-block font-mono uppercase border border-black border-[.05em] rounded-lg px-4 pt-[.85em] pb-3 text-center hover:bg-gray-50"
                onClick={onClose}
                {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {link.value}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
