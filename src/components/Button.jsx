import React from 'react'

const Button = (props) => {
  return (
    <button className="text-xs cursor-pointer mb-1" onClick={props.onClick}>{props.text}</button>
  )
}

export default Button