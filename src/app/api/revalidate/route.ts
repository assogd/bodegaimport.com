import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST() {
  try {
    revalidatePath('/');
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch {
    return NextResponse.json(
      { revalidated: false, message: 'Error revalidating' },
      { status: 500 }
    );
  }
}
