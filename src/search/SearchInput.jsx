import React, { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { CgSpinnerAlt } from 'react-icons/cg';

import BUILTIN_ENDPOINTS from './SearchEndpoints';

const getEndpoint = config => {
  if (typeof config === 'string') {
    const builtin = BUILTIN_ENDPOINTS[config.toLowerCase()];
    if (builtin) 
      return builtin;
    else 
      throw new Error(`${config} is not a known built-in endpoint`);
  } else {
    return config || BUILTIN_ENDPOINTS['osm'];
  }
}

const SearchInput = props => {

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState(props.value);

  const query = () => {
    setLoading(true);

    const searchEndpoint = getEndpoint(props.config.search);
    searchEndpoint(search)
      .then(result => {
        setLoading(false);
        props.onSearch({ search, result });
      });
  }

  useEffect(() => {
    // If there's an initial search, run query
    if (search && props.initialSearch) query();
  }, []);
  
  const onKeyDown = evt => {
    if (evt.key === 'Enter')
      query();
  }

  return (
    <div className="r6o-geotagging-search">
      <button onClick={query}>
        <HiSearch />
      </button>

      <input 
        placeholder="Search for a place..."
        value={search}
        onChange={evt => setSearch(evt.target.value)}
        onKeyDown={onKeyDown}/>
        
      {loading &&
        <CgSpinnerAlt className="rotating" />
      }
    </div>
  );

}

export default SearchInput;