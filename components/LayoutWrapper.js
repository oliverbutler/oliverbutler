import SectionContainer from './SectionContainer'
import Footer from './Footer'
import { Navbar } from './Navbar'

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <Navbar />
      <SectionContainer>
        <div className="flex h-screen flex-col justify-between ">
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
      </SectionContainer>
    </>
  )
}

export default LayoutWrapper
