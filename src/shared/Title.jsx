import React from 'react'
import {Helmet} from "react-helmet-async"
import { Meta } from 'react-router-dom'
const Title = ({title="Chat App", description="Chat application"}) => {
  return (
    <Helmet >
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  )
}

export default Title
