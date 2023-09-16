import { fetchtAsteroidData } from '@/services/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  if (params && params.slug) {
    const slug = params.slug;
    const data = await fetchtAsteroidData(slug);
    return NextResponse.json(data);
  } else {
    return new NextResponse(null, {
      statusText: 'Invalid parameters',
      status: 400,
    });
  }
}
