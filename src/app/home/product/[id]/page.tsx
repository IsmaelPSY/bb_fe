export default function HomeProductOne ({params} : { params : { id : string } }) {
  const { id } = params

  return (
    <>
      este {id}    
    </>
  )
}