import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const shotsDirectory = path.join(process.cwd(), '/shots/')

export function getSortedShotsData() {
  // Get file names under /posts
  const dirNames = fs.readdirSync(shotsDirectory)
  const allShotsData = dirNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(shotsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allShotsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
