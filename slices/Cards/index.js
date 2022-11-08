import React from "react";
import { Container as ContactContainer, Card as ContactCard } from "./contact";
import { Container as WineContainer } from "./wine";
import Carousel from "../../components/Carousel";

const Cards = ({ slice, context }) => {
  const { variation } = slice;

  if (variation === "wines") {
    const items = slice.items.map(({ card }) =>
      context.wines.find((wine) => wine.id === card.id)
    );

    return (
      <WineContainer slice={slice}>
        <Carousel data={items} className="mx-[-1em] md:mx-[-2em]" />
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
