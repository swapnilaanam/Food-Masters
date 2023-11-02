import Navbar from "@/components/Navbar"

const WithNavbarLayout = ({children}) => {
  return (
    <main>
        <Navbar />
        <div>{children}</div>
    </main>
    
  )
}

export default WithNavbarLayout