import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;

// Cache duration in seconds (24 hours)
const CACHE_DURATION = 24 * 3600;

interface InstagramMedia {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  username?: string;
  children?: {
    data: Array<{
      id: string;
      media_type: 'IMAGE' | 'VIDEO';
      media_url: string;
      thumbnail_url?: string;
    }>;
  };
}

interface InstagramResponse {
  data: InstagramMedia[];
}

export async function GET() {
  if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_USER_ID) {
    return NextResponse.json({ error: 'Instagram credentials not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,username,children{media_url,media_type,thumbnail_url}&limit=8&access_token=${INSTAGRAM_ACCESS_TOKEN}`,
      {
        next: {
          revalidate: CACHE_DURATION,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Instagram API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(`Failed to fetch Instagram posts: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as InstagramResponse;
    console.log('Raw Instagram data:', JSON.stringify(data.data, null, 2));

    // Process posts to handle carousel items
    const processedPosts = data.data.map((post: InstagramMedia) => {
      console.log('Processing post:', {
        id: post.id,
        media_type: post.media_type,
        has_children: !!post.children?.data?.length,
      });

      // If it's a carousel post, use the first child's media
      if (
        post.media_type === 'CAROUSEL_ALBUM' &&
        post.children?.data &&
        post.children.data.length > 0
      ) {
        const firstChild = post.children.data[0];
        console.log('Carousel post first child:', {
          id: post.id,
          child_media_type: firstChild.media_type,
        });
        return {
          ...post,
          media_url: firstChild.media_url,
          thumbnail_url: firstChild.thumbnail_url,
          media_type: firstChild.media_type,
        };
      }
      return post;
    });

    // Filter for both image and video posts and take only the first 4
    const mediaPosts = processedPosts
      .filter((post: InstagramMedia) => {
        const isMedia = post.media_type === 'IMAGE' || post.media_type === 'VIDEO';
        console.log('Filtering post:', {
          id: post.id,
          media_type: post.media_type,
          included: isMedia,
        });
        return isMedia;
      })
      .slice(0, 4);

    console.log(
      'Final filtered posts:',
      mediaPosts.map((post: InstagramMedia) => ({
        id: post.id,
        media_type: post.media_type,
      }))
    );

    return NextResponse.json(mediaPosts);
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return NextResponse.json({ error: 'Failed to fetch Instagram posts' }, { status: 500 });
  }
}

// Webhook handler for Instagram
export async function POST() {
  try {
    // Revalidate the Instagram feed
    revalidatePath('/');
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json({ error: 'Failed to handle webhook' }, { status: 500 });
  }
}
