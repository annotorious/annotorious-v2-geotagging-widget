import React, { useEffect, useRef } from 'react';
import { HiOutlineTrash, HiSearch } from 'react-icons/hi';
import { MdMoreHoriz } from 'react-icons/md';

import SearchInput from '../search/SearchInput';

const WhenExpanded = props => {
  
  const elem = useRef();

  useEffect(() => {
    if (elem.current)
      elem.current.querySelector('input').focus({ preventScroll: true });
  }, [elem.current]);

  return (
    <div
      ref={elem} 
      className="r6o-geotagging-toolbar expanded">
      <div className="r6o-geotagging-toolbar-left">
        <button>
          <HiSearch />
        </button>

        <SearchInput 
          config={props.config}
          quote={props.quote}
          onSearch={props.onSearch} />
      </div>

      <div className="r6o-geotagging-toolbar-right">
        <button className="r6o-geotagging-more" onClick={props.onGoAdvanced}>
          <MdMoreHoriz />
        </button>

        <button className="r6o-geotagging-delete" onClick={props.onDeleteGeoTag}>
          <HiOutlineTrash />
        </button>
      </div>
    </div>
  )

}

export default WhenExpanded;