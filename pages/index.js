import Head from 'next/head'
import Header from '../components/header'
import Link from 'next/link'
import { getSortedShotsData } from '../lib/shots'

export default function Home({ allShotsData }) {
  return (
    <div>
      <Head>
        <title>twibbble - Handpicked dribbble shots brought to life with tailwind</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <div className="relative border-b border-cool-gray-200">
          <div className="absolute w-full h-full opacity-50 from-pink-400 via-cool-gray-400 to-cool-gray-900 bg-gradient-to-tr"></div>
          <div className="absolute w-full h-full opacity-50" style={{backgroundImage: `url(/circuit-board.svg)`, filter: `blur(2px)` }}></div>
          <div className="relative z-10 max-w-screen-xl px-4 py-10 mx-auto sm:py-12 sm:px-6 md:py-16 lg:py-20 xl:py-32">
            <div className="text-center">
              <h1 className="text-4xl font-bold leading-10 tracking-tight text-cool-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                Beautiful handpicked <br/>
                <img className="inline-block w-auto h-8 md:h-12" src="/dribbble.svg" alt="dribbble" /><br/>
                shots brought to life with <br/>
                <img className="inline-block w-auto h-8 md:h-12" src="/tailwind.svg" alt="tailwindcss" />
              </h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 px-4 py-4 mx-auto gap-y-16 max-w-8xl sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-y-8">
            <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-4 lg:gap-5">
              <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-6 md:grid-cols-4 lg:col-span-4">
                {allShotsData.map(({ id, title, author, originalThumbnailUrl, date }) => (
                  <Link href={`/shots/`+ id} key={id}>
                    <a className="block rounded-md group focus:ring focus:ring-offset-4 focus:outline-none">
                      <figure>
                        <div className="relative overflow-hidden transition duration-150 ease-in-out rounded">
                          <img className="w-full h-auto transition duration-500 ease-in-out border rounded-md border-cool-gray-300 group-hover:border-cool-gray-400" src={originalThumbnailUrl} alt={title}/>
                        </div>
                        <figcaption className="mt-3">
                          <p className="mb-1 text-base font-semibold leading-5 text-cool-gray-900">{title}</p>
                          <p className="text-base leading-5 text-cool-gray-500">By {author}</p>
                        </figcaption>
                      </figure>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>

      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const allShotsData = getSortedShotsData()
  return {
    props: {
      allShotsData
    }
  }
}
