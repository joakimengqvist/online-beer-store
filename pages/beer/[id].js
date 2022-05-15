import React from "react";
import MainLayout from "../../layouts/MainLayout";
import BeerCardSingleProductPage from "../../components/beerCard/BeerCardSingleProductPage";

export default function Beer({ beer }) {
  return (
    <MainLayout>
      <BeerCardSingleProductPage beer={beer} />
    </MainLayout>
  );
}

export async function getStaticProps({ params }) {
  const results = await fetch(
    `https://api.punkapi.com/v2/beers?ids=${params.id}`
  ).then((res) => res.json());
  return {
    props: {
      beer: results[0],
    },
  };
}

export async function getStaticPaths() {
  const mockedArray = [];
  for (let i = 1; i <= 250; i++) {
    mockedArray.push(i);
  }

  return {
    paths: mockedArray.map((beerId) => {
      const id = beerId.toString();
      return {
        params: {
          id,
        },
      };
    }),
    fallback: false,
  };
}
