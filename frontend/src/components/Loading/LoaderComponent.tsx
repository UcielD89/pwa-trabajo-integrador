import '@/components/Loading/LoaderComponentStyle.css';

function Loader() {
  return (
    <div className='h-100 w-full flex justify-center items-center'>
      <span className="loader"></span>
    </div>
  )
}

export default Loader