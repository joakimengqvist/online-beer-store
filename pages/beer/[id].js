import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Row, Col, Card } from 'react-bootstrap'
import BeerCardSingleProductPage from '../../components/beerCard/BeerCardSingleProductPage';

export default function Beer({beer}) {

    console.log('beer', beer);
    return (
      <MainLayout>
        <BeerCardSingleProductPage beer={beer}/>
      </MainLayout>
    )
  }

  export async function getStaticProps({ params }) {
    const results = await fetch(`https://api.punkapi.com/v2/beers?ids=${params.id}`).then(res => res.json());
    return {
      props: {
        beer: results[0]
      }
    }
  }

  export async function getStaticPaths() {
    const beers = await fetch('https://api.punkapi.com/v2/beers?per_page=80').then(res => res.json());
    return {
      paths: beers.map(beer => {
        const id = beer.id.toString();
        return {
          params: {
            id
          }
        }
      }),
      fallback: false
    }
  }