import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

const prisma = new PrismaClient();

type Props = {
  params: Promise<{ short: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: 'Redirecting',
  };
}

export default async function ShortUrlPage({ params }: Props) {
  const short = (await params).short;

  // Fetch the original URL from the database using Prisma
  const link = await prisma.shortUrl.update({
    where: { short },
    data: {
      visits: { increment: 1 }, // Increment visits by 1
    },
    select: {
      original: true,
    },
  });

  // If URL is found, redirect
  if (link) {
    redirect(link.original); // Perform the redirection
  }

  // If not found, you can handle it, e.g., show a custom 404 page
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='bg-zinc-800/20 p-10 border-2 border-zinc-200/20 rounded-md'>
        <h1 className='text-center'>URL not found</h1>
        <p>Sorry, the URL you are looking for does not exist.</p>
      </div>
    </div>
  );
}
