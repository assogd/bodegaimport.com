import React from "react";
import { Container as ContactContainer, Card as ContactCard } from "./contact";
import { Container as WineContainer } from "./wine";
import WineCard from "../../components/Card";
import Carousel from "../../components/Carousel/container";
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
        <Carousel data={items} className="mx-[-1em] sm:mx-[-2em]">
          {items.map((item, i) => (
            <WineCard
              data={item}
              key={i}
              size="sm"
              href={
                item?.data?.producer?.url &&
                `${item.data.producer.url}#${item.uid}`
              }
              listProducer={true}
            />
          ))}
        </Carousel>
      </WineContainer>
    );
  }

  if (variation === "articles" && context.articles) {
    const items = slice.items.map(({ card }) =>
      context.articles.find((a) => a.id === card.id)
    );

    return (
      <WineContainer slice={slice}>
        <Carousel>
          {items.map((article, i) => (
            <ArticleCard article={article} key={i} />
          ))}
        </Carousel>
      </WineContainer>
    );
  }

  if (variation === "latestNews" && context.articles) {
    const items = context.articles;

    return (
      <WineContainer slice={slice}>
        <Carousel>
          {items.map((article, i) => (
            <ArticleCard article={article} key={i} />
          ))}
        </Carousel>
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
