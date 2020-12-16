import Link from 'next/link'

function Header() {
  return (
    <header className="relative z-10 flex items-center justify-between px-4 py-4 bg-white border-b border-cool-gray-200 sm:px-6 lg:px-8">
      <div className="flex items-end">
        <Link href='/'>
          <a className="block rounded-sm focus:ring focus:ring-offset-4 focus:outline-none">
            <img className="w-auto h-6" src="/twibbble.svg" alt="twibbble" />
          </a>
        </Link>
      </div>

      <Link href='/about'>
        <a className="font-medium text-cool-gray-500 md:inline hover:text-cool-gray-900">
          About
        </a>
      </Link>
    </header>
  )
}

export default Header
