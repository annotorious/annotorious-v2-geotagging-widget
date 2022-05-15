import React, { useState } from 'react';
import { CgSpinnerAlt } from 'react-icons/cg';

const Search = props => {

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');

  const onKeyDown = evt => {
    if (evt.key === 'Enter') {
      setLoading(true);

      fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search)}&format=json&polygon_geojson=1`)
        .then(res => res.json())
        .then(data => {
          setLoading(false);
          props.onSearch(data[0])
        });
    }
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