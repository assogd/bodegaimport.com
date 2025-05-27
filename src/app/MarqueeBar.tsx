'use client';
import Marquee from 'react-fast-marquee';
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarqueeBarProps {
  content: string | string[];
}

const MarqueeBar: React.FC<MarqueeBarProps> = ({ content }) => {
  const contentToRender = Array.isArray(content) ? content : [content];

  return (
    <div className="fixed top-0 left-0 w-screen z-50 bg-[#F6E27A] font-mono h-12 sm:h-10 flex items-center overflow-hidden">
      <Marquee gradient={false} speed={40} pauseOnHover>
        <div className="flex gap-8 mr-8">
          {contentToRender.map((item, idx) => (
            <span key={`marquee-${idx}-${item.substring(0, 10)}`}>
              <ReactMarkdown
                components={{
                  a: ({ ...props }) => (
                    <a {...props} target="_blank" className="underline" rel="noopener noreferrer" />
                  ),
                }}
              >
                {item}
              </ReactMarkdown>
            </span>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeBar;
