import Message from "components/message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "utils/firebase";
import { toast } from "react-toastify";
import { arrayUnion, doc, getDoc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore";


export default function Details() {
    const router = useRouter();
    const routerData = router.query;
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] =useState([]);

    const submitMessage = async() => {
        //Check if the user is logged
        if(!auth.currentUser) return router.push('/auth/login');
        if(!message) {
            console.log("message is empty?")
            toast.error('Dont leave a empty message!',{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            toast.clearWaitingQueue();
            return;
        }
        
        const docRef = doc(db, 'posts', routerData.id);
        await updateDoc(docRef, {
            comments: arrayUnion({
                message,
                avatar: auth.currentUser.photoURL,
                userName: auth.currentUser.displayName,
                time: Timestamp.now(),


            })
            
        })
        setMessage("")
        

    };

    const getComments = async() => {
        const docRef = doc(db, 'posts', routerData.id);
        const unsubscribe = onSnapshot(docRef, (snapshot) =>{
            setAllMessages(snapshot.data().comments)
        });
        return unsubscribe;
        //const docSnap = await getDoc(docRef);
        //setAllMessages(docSnap.data().comments);
    }

    useEffect(() => {
        if(!router.isReady) return;
        getComments();
    }, [router.isReady])

    return (
        <div>
            <Message {...routerData}>
            </Message>
            <div className="my-4">
                <div className="flex">
                    <input onChange={(e) => {setMessage(e.target.value)}}
                    type="text"
                    value={message} 
                    placeholder="Send a message"
                    className="bg-gray-800 w-full p-2 text-white text-sm"
                    />
                    <button onClick={submitMessage} className="bg-cyan-500 text-white py-2 px-4 text-sm">Submit</button>
                </div>
            </div>

            <div className="py-6">
                <h2 className="font-bold">Comments</h2>
                {allMessages?.map(message => (
                    <div className="bg-white p-4 my-4 border-2" key={message.time}>
                        <div className="flex items-center gap-2 mb-4">
                            <img className="w-10 rounded-full" src={message.avatar} alt=""/>
                            <h2>{message.userName}</h2>
                        </div>
                        <h2>{message.message}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}