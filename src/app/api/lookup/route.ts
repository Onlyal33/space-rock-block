import { fetchtAsteroidData } from '@/services/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;
  const data = await fetchtAsteroidData(slug);
  return NextResponse.json(data);
}
