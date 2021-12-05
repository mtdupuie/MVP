import React from 'react';

const PlayerEntry = (props) => {
  return (
    <div className="playerEntry">
      <div className="playerName">{props.username}</div>
      {props.lastWinLostBool[props.index] ?
      <div className="playerAmount" style={{color: 'green'}}> +  {props.lastWinLost[props.index]}</div>
      :
      <div className="playerAmount" style={{color: 'red'}}> -  {props.lastWinLost[props.index]}</div>
      }

    </div>
  )
}

export default PlayerEntry;