'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
  thumbnail_url?: string;
  media_type: 'IMAGE' | 'VIDEO';
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch('/api/instagram');
        if (!response.ok) {
          throw new Error('Failed to fetch Instagram posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = slideRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setCurrentSlide(index);
            }
          }
        });
      },
      {
        root: carouselRef.current,
        threshold: 0.5,
      }
    );

    const currentRefs = slideRefs.current;
    currentRefs.forEach(slide => {
      if (slide) {
        observer.observe(slide);
      }
    });

    return () => {
      currentRefs.forEach(slide => {
        if (slide) {
          observer.unobserve(slide);
        }
      });
    };
  }, [posts.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < posts.length - 1) {
      scrollToSlide(currentSlide + 1);
    } else if (isRightSwipe && currentSlide > 0) {
      scrollToSlide(currentSlide - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const scrollToSlide = (index: number) => {
    if (carouselRef.current && slideRefs.current[index]) {
      slideRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  };

  const renderPost = (post: InstagramPost) => (
    <a
      key={post.id}
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="relative aspect-[3/4] overflow-hidden group block w-full h-full"
    >
      {post.media_type === 'VIDEO' ? (
        <>
          <Image
            src={post.thumbnail_url || post.media_url}
            alt={post.caption || 'Instagram video'}
            className="object-cover w-full h-full select-none"
            width={300}
            height={400}
            draggable={false}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </>
      ) : (
        <Image
          src={post.media_url}
          alt={post.caption || 'Instagram post'}
          className="object-cover w-full h-full select-none"
          width={300}
          height={400}
          draggable={false}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      )}
    </a>
  );

  if (error) {
    console.warn('Error loading Instagram feed:', error);
    return null;
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-gray-200 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Mobile carousel */}
      <div className="sm:hidden relative overflow-hidden py-2">
        <div
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {posts.map((post, index) => (
            <div
              key={post.id}
              ref={el => {
                slideRefs.current[index] = el;
              }}
              className="min-w-full flex-shrink-0 snap-center"
            >
              {renderPost(post)}
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex gap-2 my-6 justify-center">
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              className={`w-2 h-2 rounded-full transition-colors border border-black ${
                i === currentSlide ? 'bg-black' : ''
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden sm:grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
        {posts.map(post => renderPost(post))}
      </div>
    </div>
  );
}
