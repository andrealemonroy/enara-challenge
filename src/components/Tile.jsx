import React from 'react'

export const Tile = (props) => {
  console.log(props.disabled)
  return (
    <button disabled={!props.disabled} className="tile w-10 h-10 mb-1 bg-third border-xs flex flex-center cursor-pointer m-auto" onClick={props.handleClick}>
        {props.text}
    </button>
  )
}
