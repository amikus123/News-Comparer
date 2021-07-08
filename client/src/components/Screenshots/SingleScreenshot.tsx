const SingleScreenshot = ({setFullScreenImage,imageSrc} :{setFullScreenImage:(src: string) => void,imageSrc:string}) => {
  return (
    <div>
      <img src={imageSrc} className="image-column--image" onClick={()=>setFullScreenImage(imageSrc)} alt="screenshot of webistie"/>
  
    </div>
  )
}

export default SingleScreenshot
