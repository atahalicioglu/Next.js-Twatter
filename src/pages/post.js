import { auth, db } from "utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Post() {
    // get User info
    const [user, loading] = useAuthState(auth);
    const route = useRouter()
    //Form state
    const [post, setPost] = useState({description: ""});

    //Submit Post

    const submitPost = async (e) => {
        e.preventDefault();
        
        // Run checks for description

        if (!post.description) {
            toast.error('Description Field is empty!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
                
            });
            toast.clearWaitingQueue();
            return;
        } else if (post.description.length > 300) {
            toast.error('Description is over 300 characters!');
            return;
        }

        // Make a new post
        const collectionRef = collection(db, 'posts');
        await addDoc(collectionRef, {...post,
                                    timeStamp: serverTimestamp(),
                                    user: user.uid,
                                    avatar: user.photoURL,
                                    })
    setPost({description:""});
    return route.push('./');
    };
    


    return (
        <div className="my-20 p-20 shadow-lg rounded-lg max-w-md mx-auto">
            <form onSubmit={submitPost}>
                <h1 className="text-2xl font-bold">Create a new Post</h1>
                <div className="py-2"> 
                    <h3 className="text-lg font-medium py-2">Description</h3>
                    <textarea onChange={(e) => setPost({...post, description: e.target.value})} value={post.description} className="bg-gray-800 h-48 w-full text-white"></textarea>
                    <p className={`text-cyan-600 font-medium text-sm ${
                        post.description.length > 300 ? "text-red-600" : "" }`}>{post.description.length}/300</p>
                </div>
                <button type="submit" className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm">Submit</button>
            </form>
        </div>
    )
}


