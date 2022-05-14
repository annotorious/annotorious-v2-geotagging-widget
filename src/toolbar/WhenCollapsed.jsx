import React from 'react';
import { HiOutlineGlobeAlt } from 'react-icons/hi';

const WhenCollapsed = props => {

  return (
    <div className="r6o-geotagging-toolbar expanded">
      <button onClick={props.onShowMinimap}>
        <HiOutlineGlobeAlt /> 
        <span>Pick coordinate</span>
      </button>
    </div>
  )

}

export default WhenCollapsed;