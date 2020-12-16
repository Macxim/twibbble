import Head from 'next/head'

function HeadTitle(props) {
  return (
    <Head>
      <title>twibbble - {props.title}</title>
    </Head>
  )
}

export default HeadTitle

