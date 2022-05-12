import React, { useState, useEffect } from 'react';
import { Table, FormControl, InputGroup } from 'react-bootstrap';
import { Search, Cart3 } from 'react-bootstrap-icons';
import Link from 'next/link';
import styles from './searchInput.module.scss';
import LoadingSpinner from '../atoms/loadingSpinner/LoadingSpinner';

export default function SearchInput() {
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    async function search(value) {
        setLoadingSearch(true);
        console.log('value', value);
        let result = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${value}`)

        if (result.status === 200) {
            await result.json().then(data => {
                setSearchResults(data);
            }
            )
        } 
        setLoadingSearch(false);
    }

    useEffect(() => {
        if (searchValue !== '') {
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
      placeholder="Search for a beer.. or two."
      onChange={event => setSearchValue(event.target.value)}
    />
    <InputGroup.Text>
    {!loadingSearch && (
        <Search></Search>
    )}
    {loadingSearch && (
       <LoadingSpinner />
    )}
    </InputGroup.Text>
    {!loadingSearch && searchResults && (
        <Table border style={{position: 'absolute', top: '50px', zIndex: '1'}}>
        <tbody style={{ border: 'solid 1px lightgray'}}>
        {searchResults.map((beer, i) => (
            <tr key={beer.id} className={i % 2 === 0 ? styles.evenSearchListResult : styles.unEvenSearchListResult}>
            <td>
                <Link href={'/beer/' + beer.id}>
                    {beer.name}
                </Link>
            </td>
            </tr>
        ))}
        </tbody>
      </Table>
    
    )}
    <div style={{padding: '6px 30px'}}>
    <span style={{position: 'relative', paddingRight: '6px', top: '3px'}}>4</span>
    <Cart3 />
    </div>
  </InputGroup>


    

    )

}