import { useRouter } from 'next/router'
import { useState } from "react"
import Link from 'next/link'
import HeadTitle from '../../../components/head-title'
import Header from '../../../components/header'
import matter from 'gray-matter'
import Highlight, { defaultProps } from 'prism-react-renderer'

const Shot = ({ build, srcMarkup, title, author, originalShotUrl, originalThumbnailUrl }) => {
  const router = useRouter()
  const { id, comment } = router.query
  
  const [showCodeIsToggled, setToggled] = useState(false);
  const toggleCode = () => setToggled(!showCodeIsToggled);

  return (
    <>
      <div>
        <HeadTitle title={`${title} by ${author}`} />

        <Header />

        <div className="w-full px-4 mx-auto mt-8 max-w-screen-2xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-start md:flex-row md:justify-between">
            <div className="flex-shrink-0">
              <h2 className="text-2xl font-normal leading-8 text-gray-500 sm:text-3xl sm:leading-9">{title}</h2>
              <h3 className="text-lg italic font-normal leading-8 text-gray-800 sm:text-xl sm:leading-9">by {author}</h3>  
            </div>  
            <div className="flex-shrink-0 mt-4 md:mt-0">
              <a className="group" href={originalShotUrl}>
                <div className="flex items-center justify-center mb-2">
                  <img className="flex-shrink-0 w-4 h-4 mr-2" src="/dribbble-ball.svg" alt="Dribbble ball icon" />
                  <span className="text-sm uppercase transition duration-500 ease-in-out text-cool-gray-500 group-hover:text-pink-500">Original shot</span>
                </div>
                <img className="w-32 h-auto transition duration-500 ease-in-out border-2 border-transparent rounded-md group-hover:border-pink-500" src={originalThumbnailUrl} />
              </a>
            </div>
          </div>
        </div>
        <div className="w-full px-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
          <div className="my-8 overflow-hidden border border-t border-b border-gray-200 rounded-lg">
            <div className="flex items-center justify-between px-2 py-2 bg-white border-b border-gray-200 sm:py-4 sm:px-4 sm:items-baseline">
              <div className="flex items-center flex-1 flex-shrink-0">
                <div className="flex items-center flex-1 text-sm md:text-base">
                  <button type="button" className="inline-block px-3 py-2 text-xs font-semibold text-white uppercase transition duration-500 ease-in-out rounded-md bg-cool-gray-500" onClick={toggleCode}>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                      {showCodeIsToggled ? 'Show result' : 'Show code'}
                    </div>
                  </button>
                  <Link href={`/shots/${id}/full`}>
                    <a className="flex items-center ml-auto transition duration-300 ease-in-out hover:text-cool-gray-500">
                      View in full screen
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative">            
              <iframe className="w-full" srcDoc={build} style={{overflow: 'auto', height: '800px'}}></iframe>

              <div className={`absolute overflow-auto top-0 w-full h-full transition duration-300 ease-in-out transform ${showCodeIsToggled ? '' : '-translate-x-full'}`} style={{backgroundColor: 'rgb(42, 39, 52)'}}>
                <Highlight {...defaultProps} code={srcMarkup} language="html">
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={'p-4 text-sm ' + className} style={style}>
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i, className: 'flex' })}>
                          <div className="opacity-25 select-none w-9">{i + 1}</div>
                          <div>
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token, key })} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Shot


export async function getStaticPaths() {
  const fs = require('fs')
  const path = require('path')
  const junk = require('junk')

  const srcShots = fs.readdirSync(path.join(process.cwd(), `./src/shots/`))
  // Clean unwanted '.DS_Store'
  const paths = srcShots.filter(junk.not).map((shot) => `/shots/${shot}`)

  return { paths, fallback: false }
}


export function getStaticProps(context) {
  const fs = require('fs')
  const path = require('path')
  const shotId = context.params.id
  
  const build = fs.readFileSync(path.join(process.cwd(), `./src/shots/${shotId}/dist/index.html`,), 'utf8')

  const shotData = fs.readFileSync(path.join(process.cwd(), `./shots/${shotId}.md`,), 'utf8')

  const matterResult = matter(shotData)

  const srcMarkup = fs.readFileSync(path.join(process.cwd(), `./src/shots/${shotId}/src/index.html`,), 'utf8')

  return {
    props: {
      build,
      srcMarkup,
      ...matterResult.data
    },
  }
}
