import { fetchtAsteroidsFeed } from '@/services/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get('page'));
  const data = await fetchtAsteroidsFeed(page);
  return NextResponse.json(data);
}
