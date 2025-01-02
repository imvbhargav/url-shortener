interface URLShortnerFormProps {
  loading: Boolean;
  shortUrl: string;
  url: string;
  copy: string;
  copyLink: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setShortUrl: React.Dispatch<React.SetStateAction<string>>;
}

function URLShortnerForm({loading, url, shortUrl, copy, handleSubmit, copyLink, setUrl}: URLShortnerFormProps) {
  const divs = Array.from({ length: 1999 }, (_, i) => i + 1);
  return (
    <div className="w-full h-screen flex justify-center wrapper">
      <div className='w-full h-full absolute top-0 left-0 overflow-hidden'>
        <div className='animationGrid flex flex-wrap absolute top-[-12em] left-0'>
          {divs.map((num) => (
            <div key={num} className='w-10 h-10 border-[1px] border-zinc-500/10 tile'></div>
          ))}
        </div>
      </div>
      <div className='w-full flex flex-col items-center mt-20'>
        <h1 className='text-blue-500 font-black text-5xl text-center z-10'>URL Shortener</h1>
        <form onSubmit={handleSubmit} className='bg-black flex justify-between items-center text-sm sm:text-2xl w-[95%] max-w-[720px] font-black rounded-full overflow-hidden mt-24 hover:border-pink-500 border-2 border-blue-500 transition-all duration-250 z-10'>
          <input
            className='bg-black w-full h-full p-1 sm:p-4 focus:outline-none focus:border-none focus:bg-zinc-800 '
            type="url"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button className='bg-blue-500 h-full p-2 sm:p-5 font-black hover:bg-pink-500 transition-all duration-250' type="submit">Shorten</button>
        </form>
        {loading && (
          <div className='p-2 md:p-10 mt-10 w-full max-w-[720px] rounded-full font-black relative text-center'>
          <p><span className='text-white border-b-2 border-pink-500 text-sm sm:text-base'>Shortened URL:</span></p>
          <p className='flex justify-between items-center p-2 sm:p-5 overflow-hidden text-sm sm:text-base mt-5 bg-black hover:border-pink-500 border-2 border-blue-500 text-blue-500 rounded-full'>
            Shortening the link, please wait...
          </p>
        </div>
        )}
        {shortUrl && (
          <div className='p-2 md:p-10 mt-10 w-full max-w-[720px] rounded-full font-black relative text-center text-sm sm:text-base'>
            <p><span className='text-white border-b-2 border-pink-500 text-sm sm:text-base'>Shortened URL:</span></p>
            <p className='flex justify-between items-center pl-5 overflow-hidden text-sm sm:text-base mt-5 bg-black hover:border-pink-500 border-2 border-blue-500 text-blue-500 rounded-full'><a className='hover:text-pink-500' href={`http://${shortUrl}`} target="_blank">{shortUrl}</a>
            <button type='button' onClick={copyLink} className='bg-blue-500 text-white h-full p-2 sm:p-5 hover:bg-pink-500'>{copy}</button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default URLShortnerForm;