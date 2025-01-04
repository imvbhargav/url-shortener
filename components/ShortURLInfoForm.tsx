import BoxEffect from "./BoxEffect";

interface ShortURLInfoFormProps {
  loading: boolean;
  shortUrl: string;
  url: string;
  views: number;
  handleSubmit: (e: React.FormEvent) => void;
  setShortUrl: React.Dispatch<React.SetStateAction<string>>;
}

function ShortURLInfoForm({loading, shortUrl, url, views, handleSubmit, setShortUrl}: Readonly<ShortURLInfoFormProps>) {
  return (
    <div className="w-full h-screen flex justify-center wrapper">
      <BoxEffect />
      <div className='w-full flex flex-col items-center mt-20'>
        <h1 className='text-blue-500 font-black text-5xl text-center z-10'>Short URL Info</h1>
        <form onSubmit={handleSubmit} className='bg-black flex justify-between items-center text-sm sm:text-2xl w-[95%] max-w-[720px] font-black rounded-full overflow-hidden mt-24 hover:border-pink-500 border-2 border-blue-500 transition-all duration-250 z-10'>
          <input
            className='bg-black w-full h-full p-1 sm:p-4 focus:outline-none focus:border-none focus:bg-zinc-800 '
            type="text"
            placeholder="Enter short URL"
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
            required
          />
          <button className='bg-blue-500 h-full p-2 sm:p-5 font-black hover:bg-pink-500 transition-all duration-250' type="submit">Check</button>
        </form>
        {loading &&
          <div className='z-10 w-[95%] max-w-[720px] mt-10 px-5 py-10 bg-slate-800 rounded-md border-2 border-slate-400'>
            <p>Loading the information, please wait...</p>
          </div>
        }
        {url &&
          <div className='z-10 w-[95%] max-w-[720px] mt-10 px-5 py-10 bg-slate-800 rounded-md border-2 border-slate-400'>
            {<div className='w-full flex flex-wrap justify-between mb-4'>
              <span>Original URL</span> <a className='block md:inline break-words whitespace-normal text-blue-500 hover:text-pink-500 overflow-hidden' href={url}>{url}</a>
            </div>}<hr className='opacity-10'/>
            <div className='flex flex-wrap w-full justify-between mt-4'>
              <span>Total Visits</span>
              <strong>{views}</strong>
            </div>
          </div>
        }
        </div>
    </div>
  );
}

export default ShortURLInfoForm;