import HeadTitle from '../../../components/head-title'
import matter from 'gray-matter'

const Full = ({ build, title, author }) => {
  return (
    <>
      <HeadTitle title={`${title} by ${author} - full screen view`} />
      <iframe className="w-screen h-screen" srcDoc={build}></iframe>
    </>
  )
}

export default Full


export async function getStaticPaths() {
  const fs = require('fs')
  const path = require('path')
  const junk = require('junk')

  const srcShots = fs.readdirSync(path.join(process.cwd(), `./src/shots/`))
  // Clean unwanted '.DS_Store'
  const paths = srcShots.filter(junk.not).map((shot) => `/shots/${shot}/comment`)

  return { paths, fallback: true }
}

export function getStaticProps(context) {
  const fs = require('fs')
  const path = require('path')
  const shotId = context.params.id
  
  const build = fs.readFileSync(path.join(process.cwd(), `./src/shots/${shotId}/dist/index.html`,), 'utf8')

  const shotData = fs.readFileSync(path.join(process.cwd(), `./shots/${shotId}.md`,), 'utf8')

  const matterResult = matter(shotData)

  return {
    props: {
      build,
      ...matterResult.data
    },
  }
}