import React from 'react'
import { useParams } from 'react-router-dom'

function BugDetails() {
    const {id} = useParams()
  return (
    <div>BugDetails: {id}</div>
  )
}

export default BugDetails