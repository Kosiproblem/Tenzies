import React from 'react'

export const Die = (props) => {
  return (
    <div className='border-2 font-semibold shadow-md rounded-lg py-3 px-4 cursor-pointer'>{props.value}</div>
  )
}
