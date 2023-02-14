import { auth, db } from "utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Post() {
    // get User info
    const [user, loading] = useAuthState(auth);
    const route = useRouter();
    const routeData = route.query;
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
            toast.error('Description is over 300 characters!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            toast.clearWaitingQueue();
            return;
        }


   

    

        // Make a new post
        if (post?.hasOwnProperty('id')) {
            const docRef = doc(db, 'posts', post.id);
            const updatedPost = {...post, timestamp: serverTimestamp()};
            await updateDoc(docRef, updatedPost);
            toast.success('Your post is succesfully edited!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            toast.clearWaitingQueue
            return route.push('/');
        } else {
            const collectionRef = collection(db, 'posts');
            await addDoc(collectionRef, {...post,
                                            timestamp: serverTimestamp(),
                                            user: user.uid,
                                            avatar: user.photoURL,
                                            username: user.displayName,
                                            })
            setPost({description:""});
            toast.success('Post is succesfully published!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            })
            return route.push('/');
        }

    };
    
    // Check our user
    const checkUser = async () => {
        if(loading) return;
        if (!user) route.push("/auth/login");
        if (routeData.id) {
            setPost({description: routeData.description,
                    id: routeData.id})
        }
    };
    
    useEffect(() => {
        checkUser();
    },[user,loading]);

    return (
        <div className="my-20 p-20 shadow-lg rounded-lg max-w-md mx-auto">
            <form onSubmit={submitPost}>
                <h1 className="text-2xl font-bold">{post.hasOwnProperty('id') ? "Edit your Post" : "Create a new Post"}</h1>
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


