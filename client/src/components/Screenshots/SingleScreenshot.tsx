const SingleScreenshot = ({setFullScreenImage} :{setFullScreenImage:(src: string) => void}) => {
  return (
    <div>
      <img src="4-6-2021-Onet.jpg" className="image-column--image" onClick={()=>setFullScreenImage("4-6-2021-Onet.jpg")} alt="test"/>
      <img src="2-6-2021-Krytyka_Polityczna.jpg" className="image-column--image" onClick={()=>setFullScreenImage("2-6-2021-Krytyka_Polityczna.jpg")} alt="test"/>
  
    </div>
  )
}

export default SingleScreenshot
