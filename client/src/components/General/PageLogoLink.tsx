const PageLogoLink = ({name,link}:{name:string,link:string}) => {
  return (
    <a className="heading--logo-image-wrapper" href={link}>
    <img
      src={`${name}_Logo.png`}
      alt={name}
      className="heading--logo-image"
      title={`Link to ${name}`}
    />
  </a>
  )
}

export default PageLogoLink
