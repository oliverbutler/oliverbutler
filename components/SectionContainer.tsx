import React, { ReactNode } from 'react'

export const SectionContainer: React.FunctionComponent = ({ children }) => {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">{children}</div>
  )
}
