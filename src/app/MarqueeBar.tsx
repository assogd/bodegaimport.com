import Marquee from 'react-fast-marquee';
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarqueeBarProps {
  content: string | string[];
}

const MarqueeBar: React.FC<MarqueeBarProps> = ({ content }) => (
  <div className="fixed top-0 left-0 w-screen z-50 bg-[#F6E27A] font-mono h-10 flex items-center overflow-hidden">
    <Marquee gradient={false} speed={40} pauseOnHover className="w-full">
      <div className="inline-block w-full whitespace-nowrap flex gap-8 mr-8">
        {Array.isArray(content)
          ? content.map((item, idx) => (
                <ReactMarkdown
                key={idx}
                  components={{
                    a: ({node, ...props}) => <a {...props} target="_blank" className="underline" rel="noopener noreferrer" />
                  }}
                >
                  {item}
                </ReactMarkdown>
            ))
          : <ReactMarkdown
              components={{
                a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" />
              }}
            >
              {content}
            </ReactMarkdown>
        }
      </div>
    </Marquee>
  </div>
);

export default MarqueeBar; 