import React from 'react';
import PlayerEntry from './PlayerEntry.jsx'

const PlayersList = (props) => {
  return (
    <>
    {props.lastWinLost.map((winLost, i) => {
      return(
        <PlayerEntry username={props.username} lastWinLost={props.lastWinLost} lastWinLostBool={props.lastWinLostBool} key={i} index={i} />
      )}
    )}
    </>
  )
}

export default PlayersList;