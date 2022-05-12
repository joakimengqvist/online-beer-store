import React from 'react'
import MainLayout from '../layouts/MainLayout';
import BeerCard from '../components/beerCard/BeerCard';

export default function Index({beers}) {
    console.log('beers', beers)
    return (
        <MainLayout>
            {beers.map(beer => (
                <BeerCard key={beer.id} beer={beer} />
            ))} 
        </MainLayout>
    )
}

export async function getStaticProps() {
    const beers = await fetch('https://api.punkapi.com/v2/beers?per_page=80').then(res => res.json());
    return {
      props: {
        beers
      }
    }
  }

   