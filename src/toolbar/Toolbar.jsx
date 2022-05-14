import React from 'react';
import { HiOutlineGlobeAlt } from 'react-icons/hi';

const Toolbar = props => {

  return (
    <div className="r6o-geotagging-toolbar">
      <button onClick={props.onShowMinimap}>
        <HiOutlineGlobeAlt /> 
        <span>Pick coordinate</span>
      </button>
    </div>
  )

}

export default Toolbar;