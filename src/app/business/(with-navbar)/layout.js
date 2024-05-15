import BusinessNavbar from '@/components/Shared/BusinessNavbar'
import BusinessMenuProvider from '@/providers/BusinessMenuProvider'

const BusinessLayout = ({ children }) => {
  return (
    <>
      <BusinessMenuProvider>
        <header>
          <BusinessNavbar />
        </header>
        {children}
      </BusinessMenuProvider>
    </>
  )
}

export default BusinessLayout