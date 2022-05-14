import React from 'react';
import { HiOutlineTrash } from 'react-icons/hi';

const WhenExpanded = props => {

  return (
    <div className="r6o-geotagging-toolbar expanded">
      <button className="r6o-geotagging-delete" onClick={props.onDeleteGeoTag}>
        <HiOutlineTrash />
      </button>
    </div>
  )

}

export default WhenExpanded;