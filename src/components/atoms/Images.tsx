
const Images = ({url} : {url:string}) => {
  return (
    <img src={url} className='w-full h-full object-cover'  alt="Ilustración" />
  )
}

export default Images