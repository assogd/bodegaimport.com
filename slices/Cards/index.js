import React from "react";
import { Container as ContactContainer, Card as ContactCard } from "./contact";
import { Container as WineContainer } from "./wine";
import Carousel from "../../components/Carousel";
import CarouselContainer from "../../components/Carousel/container";
import { Card as ArticleCard } from "../../components/Articles/related";

const Cards = ({ slice, context }) => {
  if (!slice.items) return null;
  const { variation } = slice;

  if (variation === "wines" && context.wines) {
    const items = slice.items.map(({ card }) =>
      context.wines.find((wine) => wine.id === card.id)
    );

    return (
      <WineContainer slice={slice}>
        <Carousel data={items} className="mx-[-1em] sm:mx-[-2em]" />
      </WineContainer>
    );
  }

  if (variation === "articles" && context.articles) {
    const items = slice.items.map(({ card }) =>
      context.articles.find((a) => a.id === card.id)
    );

    return (
      <WineContainer slice={slice}>
        <CarouselContainer data={items}>
          {items.map((article, i) => (
            <ArticleCard article={article} key={i} />
          ))}
        </CarouselContainer>
      </WineContainer>
    );
  }

  if (variation === "latestNews" && context.articles) {
    const items = context.articles;

    return (
      <WineContainer slice={slice}>
        <CarouselContainer data={items}>
          {items.map((article, i) => (
            <ArticleCard article={article} key={i} />
          ))}
        </CarouselContainer>
      </WineContainer>
    );
  }

  if (variation === "contact")
    return (
      <ContactContainer slice={slice}>
        {slice.items.map((item, i) => (
          <ContactCard key={i} data={item} />
        ))}
      </ContactContainer>
    );
};

export default Cards;
