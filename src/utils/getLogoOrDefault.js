const defaultLogo = 
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";

const getLogoOrDefault = (logoSrc) => 
    logoSrc ? logoSrc : defaultLogo
  
export default getLogoOrDefault;