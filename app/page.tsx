'use client';
import URLShortnerForm from '@/components/URLShortnerForm';
import ShortURLInfoForm from '@/components/ShortURLInfoForm';
import { useState } from 'react';

export default function Home() {

  const [url, setUrl] = useState('');
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [shortUrl, setShortUrl] = useState('');
  const [copy, setCopy] = useState("Copy link!");
  const [activeShortner, setActiveShortner] = useState<boolean>(true);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopy("Copied it!");
      setTimeout(() => {
        setCopy("Copy link!");
      }, 3000);
    } catch (err) {
      console.error("Failed to copy text: " + err);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShortUrl('');
    setLoading(true);
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    if (res.ok) {
      setShortUrl(data.shortUrl);
      setLoading(false);
    }
    else {
      alert(data.error);
      setLoading(false);
    };
  };

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUrl('');
    setLoading(true);
    const res = await fetch('/api/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shortUrl }),
    });

    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setUrl(data.original);
      setViews(data.views);
      setLoading(false);
    }
    else {
      alert(data.error);
      setLoading(false);
    };
  };

  return (
    <div>
      <div className='w-full flex bg-black justify-center gap-8 absolute top-0 left-0'>
        <div className='border-2 border-fuchsia-500 z-10'>
          <button type='button' className={`p-4 ${activeShortner ? 'bg-fuchsia-500' : 'bg-transparent'}`} onClick={() => setActiveShortner(true)}>URL Shortner</button>
          <button type='button' className={`p-4 ${!activeShortner ? 'bg-fuchsia-500' : 'bg-transparent'}`} onClick={() => setActiveShortner(false)}>Short URL Info</button>
        </div>
      </div>
      {activeShortner &&
        < URLShortnerForm loading={loading} shortUrl={shortUrl} url={url} copy={copy} copyLink={copyLink} handleSubmit={handleSubmit} setUrl={setUrl} />
      } {!activeShortner &&
        <div>
          < ShortURLInfoForm loading={loading} shortUrl={shortUrl} url={url} views={views} handleSubmit={handleInfoSubmit} setShortUrl={setShortUrl} />
        </div>
      }
    </div>
  );
}