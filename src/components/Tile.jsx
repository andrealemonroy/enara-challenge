import React from 'react'
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export const Tile = (props) => {
  return (
    <button id={props.id} disabled={props.disabled} className={classNames( props.selected && props.found ? 'bg-green' : props.selected && !props.found ? "bg-red" : props.disabled & !props.selected?  "cursor-disabled bg-available" : "bg-available", "cursor-pointer tile w-20 h-20 rounded-xs flex flex-center cursor-pointer m-auto text-white text-xl text-bold xs-w-10 xs-h-10")} onClick={props.handleClick}>
        {props.text}
    </button>
  )
}
