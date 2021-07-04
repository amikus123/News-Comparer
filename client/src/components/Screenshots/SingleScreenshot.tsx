const SingleScreenshot = ({setFullScreenImage} :{setFullScreenImage:React.Dispatch<React.SetStateAction<string>>}) => {
  return (
    <div>
      <img src="onet.png" onClick={()=>setFullScreenImage("4-6-2021-Onet.jpg")} alt="test"/>
    </div>
  )
}

export default SingleScreenshot
