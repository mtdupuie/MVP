import React from 'react';

const LastTenEntry = (props) => {
  return (
    props.lastCrash > 2 ?
    <div className="TopTenEntryBackground" style={{color: 'green'}}>{props.lastCrash.toFixed(2)}</div>
    :
    <div className="TopTenEntryBackground" style={{color: 'red'}}>{props.lastCrash.toFixed(2)}</div>
  )
}

export default LastTenEntry;