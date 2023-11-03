import BusinessNavbar from '@/components/Shared/BusinessNavbar'

const BusinessLayout = ({ children }) => {
  return (
    <>
      <header>
        <BusinessNavbar />
      </header>
      {children}
    </>
  )
}

export default BusinessLayout