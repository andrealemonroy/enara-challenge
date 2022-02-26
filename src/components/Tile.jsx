import React from 'react'
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export const Tile = (props) => {
  console.log(props.disabled)
  return (
    <button disabled={props.disabled} className={classNames(props.disabled ? "bg-primary" : "bg-third", "tile w-10 h-10 mb-1 border-xs flex flex-center cursor-pointer m-auto")} onClick={props.handleClick}>
        {props.text}
    </button>
  )
}
