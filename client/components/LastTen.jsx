import React from 'react'
import LastTenEntry from './LastTenEntry.jsx'

const LastTen = (props) => {
  return (
    <>
    {props.lastTenCrashes.map((lastCrash, i) => {
      return (
      <div className="lastTenContainer" key={i}>
        <LastTenEntry lastCrash={lastCrash} />
      </div>
      )
    })}
    </>
  )
}



export default LastTen;