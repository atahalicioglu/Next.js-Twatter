import Head from 'next/head'


  
export default function Home() {
  return ( 
    <>
      <Head>
        <title>Next.js FullStack</title>
        <meta name="description" content="Created by Ata Halıcıoğlu" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='my-12 text-large font-medium'>
        <h2 className='text-4xl text-center text bg-gradient-to-t'>See what other people are saying</h2>
      </div>
    </>
  )
}
