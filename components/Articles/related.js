import Carousel from "../Carousel/container";
import { useRef, useState, useEffect } from "react";

export default function Related({ articles }) {
  console.log(articles);
  return (
    <section className="related pb-24">
      <h2 className="mb-4 text-center text-lg">Andra nyheter om dryck</h2>
      <Carousel data={articles}>
        {articles.map((card, i) => (
          <div
            key={i}
            altClassName="w-5/6 shrink-0 basis-auto snap-center scroll-mx-12 sm:w-auto sm:shrink sm:grow"
          >
            <Card data={card} />
          </div>
        ))}
      </Carousel>
    </section>
  );
}

const Card = ({ data }) => {
  console.log(data);
  return <div>Kort</div>;
};
