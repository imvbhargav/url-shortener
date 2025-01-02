import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to generate a short URL
const generateShortURL = () => Math.random().toString(36).substring(2, 8);

export async function POST(req: NextRequest) {
  try {
    const { url: original } = await req.json();

    if (!original) {
      return NextResponse.json({ error: 'Original URL is required' }, { status: 400 });
    }

    // ✅ Check if URL already exists
    const existingEntry = await prisma.shortUrl.findUnique({
      where: { original },
    });

    if (existingEntry) {
      return NextResponse.json({
        success: true,
        shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${existingEntry.short}`,
      });
    }

    // ✅ Create a new short URL
    const short = generateShortURL();

    const newEntry = await prisma.shortUrl.create({
      data: {
        original,
        short,
      },
    });

    return NextResponse.json({
      success: true,
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${newEntry.short}`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// ✅ Handle redirection
export async function GET(req: NextRequest) {
  const short = req.nextUrl.pathname.split('/').pop();

  if (!short) {
    return NextResponse.json({ error: 'Short URL is missing' }, { status: 400 });
  }

  try {
    const entry = await prisma.shortUrl.findUnique({
      where: { short },
    });

    if (!entry) {
      return NextResponse.json({ error: 'Short URL not found' }, { status: 404 });
    }

    return NextResponse.redirect(entry.original);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
