import React from 'react'

const Button = ({
    children,
    type="button",
    bgColor="bg-blue-500",
    textColor="text-white",
    className="",
    ...props
}) => {
  return (
    <button type={type} className={` px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
    {children}
    </button>
  )
}

export default Button
