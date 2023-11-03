import Navbar from "@/components/Shared/Navbar"

const WithNavbarLayout = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      {children}
    </>

  )
}

export default WithNavbarLayout