import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { shortUrl } = await req.json();
  const urlParts = shortUrl.split('://');
  let baseURL = urlParts.length > 1 ? urlParts[1] : urlParts[0] ;
  const shortParts = baseURL.split('/');
  const short = shortParts.length > 1 ? shortParts[1] : shortParts[0];
  const possibleInvalid = baseURL.split('/')[2];
  if (possibleInvalid) {
    return NextResponse.json({ error: 'Invalid link entered!' }, { status: 400 });
  }
  const link = await prisma.shortUrl.findUnique({
    where: { short },
  });
  return NextResponse.json({
    success: true,
    short,
    original: link?.original,
    views: link?.visits,
  });
}