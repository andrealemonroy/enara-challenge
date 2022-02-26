import React from 'react'

const Input = (props) => {
  return (
    <input className="w-full h-5 text-xs" value={props.value} disabled={props.disabled}/>
  )
}

export default Input