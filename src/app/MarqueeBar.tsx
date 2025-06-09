'use client';
import Marquee from 'react-fast-marquee';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import MarqueeSeparator1 from './assets/svg/MarqueeSeparator1';
import MarqueeSeparator2 from './assets/svg/MarqueeSeparator2';
import MarqueeSeparator3 from './assets/svg/MarqueeSeparator3';

interface MarqueeBarProps {
  content: string | string[];
}

const MarqueeBar: React.FC<MarqueeBarProps> = ({ content }) => {
  const contentToRender = Array.isArray(content) ? content : [content];
  const separators = [MarqueeSeparator1, MarqueeSeparator2, MarqueeSeparator3];

  return (
    <div className="fixed top-0 left-0 w-screen z-50 bg-[#F6E27A] font-mono h-12 sm:h-10 flex items-center overflow-hidden">
      <Marquee gradient={false} speed={40} pauseOnHover>
        <div className="flex items-center gap-4 mr-4">
          {contentToRender.map((item, idx) => (
            <React.Fragment key={`marquee-${idx}-${item.substring(0, 10)}`}>
              <span>
                <ReactMarkdown
                  components={{
                    a: ({ ...props }) => (
                      <a
                        {...props}
                        target="_blank"
                        className="underline"
                        rel="noopener noreferrer"
                      />
                    ),
                  }}
                >
                  {item}
                </ReactMarkdown>
              </span>
              {/* Add separator SVG after each message */}
              {idx < contentToRender.length - 0 &&
                React.createElement(separators[idx % separators.length])}
            </React.Fragment>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeBar;
