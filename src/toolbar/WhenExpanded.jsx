import React from 'react';
import { HiOutlineTrash, HiSearch } from 'react-icons/hi';
import { MdMoreHoriz } from 'react-icons/md';

const WhenExpanded = props => {

  return (
    <div className="r6o-geotagging-toolbar expanded">
      <div className="r6o-geotagging-toolbar-left">
        <button className="r6o-geotagging-search">
          <HiSearch />
        </button>
      </div>

      <div className="r6o-geotagging-toolbar-right">
        <button className="r6o-geotagging-more">
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