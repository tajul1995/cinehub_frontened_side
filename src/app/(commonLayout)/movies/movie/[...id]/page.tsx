import React from 'react'

const SingleMoviePage = async({
  params
}: {
  params: Promise<{ id: string }>}) => {
  const { id } = await params
  console.log(id)
  return (
    <div>
      <h2>single movie by id:`${id}`</h2>
    </div>
  )
}

export default SingleMoviePage
