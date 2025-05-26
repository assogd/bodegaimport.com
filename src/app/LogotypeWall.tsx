import React from 'react';
import Image from 'next/image';

interface Logotype {
  src: string;
  width: number;
  height: number;
  alt: string;
  href: string;
}

const logotypes: Logotype[] = [
  {
    src: '/20-GRUPPEN_LOGOTYPES/LIEBLING_LOGOTYPE.svg',
    width: 118,
    height: 50,
    alt: 'Liebling',
    href: 'https://www.restaurangliebling.com',
  },
  {
    src: '/20-GRUPPEN_LOGOTYPES/TJOGET_LOGOTYPE.svg',
    width: 144,
    height: 38,
    alt: 'Tjoget',
    href: 'https://www.tjoget.com',
  },
  {
    src: '/20-GRUPPEN_LOGOTYPES/EROS_LOGOTYPE.svg',
    width: 46,
    height: 49,
    alt: 'Eros',
    href: 'https://www.instagram.com/erosbeerandliquorbar/',
  },
  {
    src: '/20-GRUPPEN_LOGOTYPES/PARADISO_LOGOTYPE.svg',
    width: 145,
    height: 31,
    alt: 'Paradiso',
    href: 'https://www.paradisostockholm.se',
  },
  {
    src: '/20-GRUPPEN_LOGOTYPES/POSITANO_LOGOTYPE.svg',
    width: 129,
    height: 27,
    alt: 'Positano',
    href: 'https://www.positanoyes.com',
  },
  {
    src: '/20-GRUPPEN_LOGOTYPES/HORNSTULLS-BODEGA_LOGOTYPE.svg',
    width: 90,
    height: 57,
    alt: 'Hornstulls Bodega',
    href: 'https://www.hornstullsbodega.com',
  },
];

export default function LogotypeWall(): React.ReactElement {
  return (
    <div className="grid gap-16 justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full">
      {logotypes.map(({ src, width, height, alt, href }, i) => (
        <figure key={i} className={`place-self-center ${alt === 'Tjoget' ? 'mt-2' : ''}`}>
          <a href={href} target="_blank" rel="noreferrer nofollow">
            <Image src={src} width={width} height={height} alt={alt} className="max-w-full" />
          </a>
        </figure>
      ))}
    </div>
  );
}
