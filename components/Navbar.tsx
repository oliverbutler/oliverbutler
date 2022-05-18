import headerNavLinks from '@/data/headerNavLinks'
import { useEffect, useState } from 'react'
import Link from './Link'
import { NavbarButton } from './NavbarButton'
import { SectionContainer } from './SectionContainer'
import ThemeSwitch from './ThemeSwitch'

function useIsScrollTop() {
  const [isTop, setIsTop] = useState(true)
  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY <= 0)
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return isTop
}

function useToggleMenu() {
  const [menuShow, setMenuShow] = useState(false)
  const onMenuToggle = () => {
    setMenuShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }
  return { menuShow, onMenuToggle }
}

export const Navbar = () => {
  const { menuShow, onMenuToggle } = useToggleMenu()
  const isTop = useIsScrollTop()

  return (
    <>
      <header
        className={`sticky top-0 z-20 flex  w-screen justify-start py-4  ${
          isTop ? 'border-none' : 'border-b border-gray-200 dark:border-gray-800'
        } firefox:bg-opacity-100 dark:firefox:bg-opacity-100 bg-white bg-opacity-30 backdrop-blur-lg backdrop-saturate-150 backdrop-filter dark:bg-black dark:bg-opacity-30`}
      >
        <SectionContainer>
          <nav className="flex w-full justify-end sm:justify-start">
            <div className="flex w-full flex-row items-center justify-end sm:justify-between">
              <div className="hidden py-4 sm:block sm:space-x-8">
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    title={link.title}
                    href={link.href}
                    className="font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              <ThemeSwitch />
              <div className="flex items-center sm:hidden">
                <NavbarButton onClick={onMenuToggle} isOpened={menuShow} />
              </div>
            </div>
          </nav>
        </SectionContainer>
      </header>
      {/* Mobile side menu */}
      <div
        className={`fixed left-0 z-20 h-screen w-full transform bg-white duration-500 ease-in-out dark:bg-black sm:hidden ${
          menuShow ? 'translate-x-0' : 'translate-x-full'
        } firefox:bg-opacity-100 dark:firefox:bg-opacity-100 bg-opacity-30 backdrop-blur-lg backdrop-saturate-150 backdrop-filter dark:bg-opacity-30`}
      >
        <nav className="mt-8 h-full space-y-8">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12">
              <Link
                href={link.href}
                title={link.title}
                className="text-xl font-semibold leading-8 tracking-wide text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                onClick={onMenuToggle}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}
