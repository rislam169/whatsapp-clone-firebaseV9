import './SidebarChat.css';
import {Avatar} from "@material-ui/core";
import {useEffect, useState} from "react";
import {collection, addDoc, query, orderBy, onSnapshot, limit} from "firebase/firestore";
import {db} from "./firebase";
import { Link } from 'react-router-dom';

const SidebarChat = ({addNewChat, name, id}) => {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');

    useEffect(() => {
        if (id) {
            const msgColl = query(collection(db, "rooms", id, "messages"), orderBy("timestamp", 'desc'), limit(1));
            onSnapshot(msgColl, (querySnapshot) => {
                setMessages(querySnapshot.docs.map(msg => msg.data()))
            });
        }
    }, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");

        if (roomName) {
            addDoc(collection(db, "rooms"), {name: roomName});
        }
    }

    return !addNewChat ? (
        <Link to={`rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ): (
        <div className="sidebarChat" onClick={createChat}>
            <h2>Add New Chat</h2>
        </div>
    );
}

export default SidebarChat;
