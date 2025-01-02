'use client';
import { useState } from 'react';
import ShortURLInfoForm from '@/components/ShortURLInfoForm';

export default function Home() {
  const divs = Array.from({ length: 1999 }, (_, i) => i + 1);

  const [url, setUrl] = useState('');
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState<Boolean>(false);
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
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
      < ShortURLInfoForm loading={loading} shortUrl={shortUrl} url={url} views={views} handleSubmit={handleSubmit} setUrl={setUrl} setShortUrl={setShortUrl} />
    </div>
  );
}