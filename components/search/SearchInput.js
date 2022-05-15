import React, { useState, useEffect } from "react";
import { Table, FormControl, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import Link from "next/link";
import styles from "./searchInput.module.scss";
import LoadingSpinner from "../atoms/loadingSpinner/LoadingSpinner";

export default function SearchInput() {
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  async function search(value) {
    setLoadingSearch(true);
    let result = await fetch(
      `https://api.punkapi.com/v2/beers?beer_name=${value}`
    );

    if (result.status === 200) {
      await result.json().then((data) => {
        setSearchResults(data);
      });
    }
    setLoadingSearch(false);
  }

  useEffect(() => {
    if (searchValue !== "") {
      setLoadingSearch(true);
      const timeoutId = setTimeout(() => {
        search(searchValue);
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else {
      setLoadingSearch(false);
      setSearchResults([]);
    }
  }, [searchValue]);

  return (
    <InputGroup>
      <FormControl
        id="searchBeer"
        placeholder="Search for a beer... ;)"
        onChange={(event) => setSearchValue(event.target.value)}
        onFocus={(event) => setSearchValue(event.target.value)}
        onBlur={() =>
          setTimeout(() => {
            setSearchValue("");
          }, 500)
        }
      />
      <InputGroup.Text>
        {!loadingSearch && <Search></Search>}
        {loadingSearch && <LoadingSpinner />}
      </InputGroup.Text>
      {!loadingSearch && searchResults && (
        <Table style={{ position: "absolute", top: "50px", zIndex: "1" }}>
          <tbody style={{ border: "solid 1px lightgray" }}>
            {searchResults.map((beer, i) => (
              <tr
                key={beer.id}
                className={
                  i % 2 === 0
                    ? styles.evenSearchListResult
                    : styles.unEvenSearchListResult
                }
              >
                <td>
                  <Link href={"/beer/" + beer.id}>{beer.name}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </InputGroup>
  );
}
