import React from 'react'

export const SectionContainer = ({ children }) => {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:max-w-4xl xl:max-w-6xl xl:px-0">
      {children}
    </div>
  )
}
