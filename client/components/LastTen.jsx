import React from 'react'
import LastTenEntry from './LastTenEntry.jsx'

const LastTen = (props) => {
  console.log(props)
  return (
    <>
    {props.lastTenCrashes.map((lastCrash, i) => {
      return (
      <div className="lastTenContainer">
        <LastTenEntry lastCrash={lastCrash} key={i}/>
      </div>
      )
    })}
    </>
  )
}



export default LastTen;