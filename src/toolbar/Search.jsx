import React, { useEffect, useState } from 'react';
import { CgSpinnerAlt } from 'react-icons/cg';

const Search = props => {

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState(props.quote);

  const query = () => {
    setLoading(true);

    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search)}&format=json&polygon_geojson=1`)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        props.onSearch(data[0])
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