const SingleScreenshot = ({setFullScreenImage} :{setFullScreenImage:(src: string) => void}) => {
  return (
    <div>
      <img src="2-6-2021-Krytyka_Polityczna.jpg" className="image-column--image" onClick={()=>setFullScreenImage("2-6-2021-Krytyka_Polityczna.jpg")} alt="test"/>
  
    </div>
  )
}

export default SingleScreenshot
