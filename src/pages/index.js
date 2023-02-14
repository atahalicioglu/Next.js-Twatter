import Message from 'components/message'
import { collection, onSnapshot, orderBy } from 'firebase/firestore';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { db } from 'utils/firebase';
import { query } from 'firebase/firestore';
import Link from 'next/link';


  
export default function Home() {

  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const  q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    });
   
    return unsubscribe;
  };

  

  useEffect(() => {
    getPosts();

  }, []);

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
        {allPosts.map((post) => (<Message {...post}>
          <Link href={{pathname: `/${post.id}`, query: {...post}}}>
            <button className="bg-cyan-600 mr-2 p-2 rounded-lg">{post.comments?.length > 0 ? post.comments?.length : 0} comments</button>
          </Link>
        </Message>))}
      </div>
    </>
  )
}
