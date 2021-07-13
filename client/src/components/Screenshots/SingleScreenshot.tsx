const SingleScreenshot = ({setFullScreenImage,screenshot} :{setFullScreenImage:(src: string) => void,screenshot:string}) => {
  return (
    <div>
      <img src={screenshot} className="image-column--image" onClick={()=>setFullScreenImage(screenshot)} alt="screens hot of webistie"/>

    </div>
  )
}

export default SingleScreenshot
