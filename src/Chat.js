import './Chat.css'
import {Avatar, IconButton} from "@material-ui/core";
import {useEffect, useState} from "react";
import {AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined} from "@material-ui/icons";
import {useParams} from 'react-router-dom';
import {db} from './firebase';
import {doc, getDoc, query, orderBy, collection, onSnapshot, addDoc, Timestamp} from "firebase/firestore";
import {useStateValue} from "./StateProvider";
import {serverTimestamp} from "firebase/firestore";


const Chat = () => {
    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(
        () => {
            if (roomId) {
                onSnapshot(doc(db, "rooms", roomId), (document) => {
                    setRoomName(document.data().name);
                });
                const msgColl = query(collection(db, "rooms", roomId, "messages"), orderBy("timestamp"));
                onSnapshot(msgColl, (querySnapshot) => {
                    setMessages(querySnapshot.docs.map(msg => msg.data()))
                });
            }
        }
        , [roomId]);


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const sendMessage = async e => {
        e.preventDefault();
        console.log('You typed ', input);
        await addDoc(collection(db, 'rooms', roomId, 'messages'), {
            name: user.displayName,
            message: input,
            timestamp: serverTimestamp()
        })
        // onClose();

        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        Last seen{" "}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate())
                            .toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
                <InsertEmoticon/>
                <form action="">
                    <input value={input} onChange={e => setInput(e.target.value)} type="text"
                           placeholder="Type a message"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <Mic/>
            </div>
        </div>
    );
}

export default Chat;
