export default function HeroVideo() {
  return (
    <video
      src="/portobelo.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="h-full w-full object-cover grayscale transition-[filter] duration-[2000ms] ease-out hover:grayscale-0"
    />
  );
}
