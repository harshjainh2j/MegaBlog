import React from 'react'
import { forwardRef } from 'react'
import { useId } from 'react'
const Select = ({label,options=[],className="",...props},ref) => {
    const id= useId();
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <select
      className={`border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black ${className}`}
        id={id}
        {...props}
        ref={ref}>
            {options?.map((option)=><option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  )
}

export default forwardRef(Select)
