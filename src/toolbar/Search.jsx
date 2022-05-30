import React, { useEffect, useState } from 'react';
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

const Search = props => {

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState(props.quote);

  const query = () => {
    setLoading(true);

    const searchEndpoint = getEndpoint(props.config.search);
    searchEndpoint(search)
      .then(result => {
        setLoading(false);
        props.onSearch(result);
      });
  }

  useEffect(() => {
    // If there's an initial search, run query
    if (search) query();
  }, []);
  
  const onKeyDown = evt => {
    if (evt.key === 'Enter')
      query();
  }

  return (
    <div className="r6o-geotagging-toolbar-search">
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

export default Search;