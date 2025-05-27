'use client';
import Marquee from 'react-fast-marquee';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

interface MarqueeBarProps {
  content: string | string[];
}

const MarqueeBar: React.FC<MarqueeBarProps> = ({ content }) => {
  const contentToRender = Array.isArray(content) ? content : [content];
  const separatorImages = ['/MARQUEE_01.svg', '/MARQUEE_02.svg', '/MARQUEE_03.svg'];

  return (
    <div className="fixed top-0 left-0 w-screen z-50 bg-[#F6E27A] font-mono h-12 sm:h-10 flex items-center overflow-hidden">
      <Marquee gradient={false} speed={40} pauseOnHover>
        <div className="flex items-center gap-3 mr-3">
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
              {/* Add separator image after each message */}
              {idx < contentToRender.length - 0 && (
                <Image
                  src={separatorImages[idx % separatorImages.length]}
                  alt="separator"
                  width={20} // Adjust width as needed
                  height={20} // Adjust height as needed
                  className="w-auto h-7" // Add some margin around the image
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeBar;
