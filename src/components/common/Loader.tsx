import React from 'react'
interface Props {
    type: string
}
export default function Loader( prop: Props) {
  return (
    <span className={` ${prop.type}`}></span>
  )
}
