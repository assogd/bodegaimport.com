import Header from "../Header/sticky/";
import { Heading } from "../Heading";
import Carousel from "../Carousel";

export default function ListOfProducers({ list }) {
  return list
    .filter((a) => a.producers.length > 0)
    .map((item) => (
      <section key={item.slug} className="region h-[200em] w-full">
        <Header className="sticky top-14 right-0 w-full px-4 text-center md:top-6 md:text-right">
          <Heading as="h2" size="xl">
            {item.origin.region}, {item.origin.country}
          </Heading>
        </Header>
        {item.producers.map((producer) => (
          <section key={producer.id} className="producer h-[200em]">
            <Header
              className="sticky inset-x-0 top-[3.75em] p-8 text-center md:top-8"
              secondLevel={true}
            >
              <Heading as="h2" size="xl">
                {producer.data.title}
              </Heading>
            </Header>
            <Carousel
              data={producer.data.slices}
              params={{
                region: {
                  title: `${item.origin.region}, ${item.origin.country}`,
                  slug: item.slug,
                },
                producer: {
                  title: producer.data.title,
                  slug: producer.uid,
                },
              }}
            />
          </section>
        ))}
      </section>
    ));
}
