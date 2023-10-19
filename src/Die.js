import React from 'react'

export const Die = (props) => {
  const styles = props.isHeld && "bg-green-400"
  return (
    <div className={`border-2 font-bold text-lg shadow-md rounded-lg py-3 px-4 cursor-pointer ${styles}`} onClick={props.hold}>{props.value}</div>
  )
}
