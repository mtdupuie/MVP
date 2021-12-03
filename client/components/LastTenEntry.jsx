import React from 'react';

const LastTenEntry = (props) => {
  return (
    <>
    {props.lastCrash > 1.99 ?
    <div className="TopTenEntry" style={{backgroundColor: 'green'}}>{props.lastCrash.toFixed(2)}</div>
    :
    <div className="TopTenEntry" style={{backgroundColor: 'red'}}>{props.lastCrash.toFixed(2)}</div>}
    </>
  )
}

export default LastTenEntry;