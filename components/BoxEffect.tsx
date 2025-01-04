export default function BoxEffect() {
  const divs = Array.from({ length: 1999 }, (_, i) => i + 1);
  return (
    <div className='w-full h-full absolute top-0 left-0 overflow-hidden'>
      <div className='animationGrid flex flex-wrap absolute top-[-12em] left-0'>
        {divs.map((num) => (
          <div key={num} className='w-10 h-10 border-[1px] border-zinc-500/10 tile'></div>
        ))}
      </div>
    </div>
  );
}