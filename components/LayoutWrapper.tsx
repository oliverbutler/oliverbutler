import SectionContainer from './SectionContainer'
import Footer from './Footer'

import { ReactNode } from 'react'
import { Navbar } from './Navbar'

interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
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
