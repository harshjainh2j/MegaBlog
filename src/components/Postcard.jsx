import React from 'react'
import service from '../Appwrite/service'
import { Link } from 'react-router-dom'


const Postcard = ({post}) => {
 
    const { $id, title, featuredImage } = post;
  return (
<Link to={`/post/${$id}`}>
  <div className="w-full sm:w-[250px] h-[300px] bg-gray-100 rounded-xl p-4 flex flex-col justify-between">
    <div className="w-full h-[180px] flex justify-center items-center overflow-hidden mb-4">
      <img
        src={service.getFilePreview(featuredImage)}
        alt={title}
        className="rounded-xl object-cover w-full h-full"
      />
    </div>
    <h2 className="font-bold text-xl text-center truncate">{title}</h2>
  </div>
</Link>


  )
}

export default Postcard
