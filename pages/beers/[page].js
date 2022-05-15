import React from "react";
import MainLayout from "../../layouts/MainLayout";
import BeerCard from "../../components/beerCard/BeerCard";
import Link from "next/link";

export default function Index(props) {
  const { beers, params } = props;
  return (
    <MainLayout>
      <BeerBreadCrumb page={params.page} />
      {beers.map((beer) => (
        <BeerCard key={beer.id} beer={beer} page={params.page} />
      ))}
    </MainLayout>
  );
}

function BeerBreadCrumb({ page }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0px 20px",
      }}
    >
      <div>
        {Number(page) > 1 && (
          <Link href="/beers/[page]" as={`/beers/${Number(page) - 1}`}>
            <a>{"<-"} Previous page</a>
          </Link>
        )}
      </div>
      <div>
        {Number(page) < 3 && (
          <Link href="/beers/[page]" as={`/beers/${Number(page) + 1}`}>
            <a>Next page {"->"}</a>
          </Link>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const beers = await fetch(
    `https://api.punkapi.com/v2/beers?page=${params.page}&per_page=40`
  ).then((res) => res.json());
  return {
    props: {
      beers,
      params: params,
    },
  };
}

export async function getStaticPaths() {
  let mockedBeersArray = [1, 2, 3];

  return {
    paths: mockedBeersArray.map((beer) => {
      const beersPage = beer.toString();
      return {
        params: {
          page: beersPage,
        },
      };
    }),
    fallback: false,
  };
}
