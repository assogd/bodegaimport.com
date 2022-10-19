export default function Carousel({ children }) {
  return (
    <section className="scrollbar-hide flex max-w-full snap-x snap-mandatory gap-4 overflow-x-scroll">
      <div className="basis-4 snap-start" />
      {children}
      <div className="basis-4" />
    </section>
  );
}
