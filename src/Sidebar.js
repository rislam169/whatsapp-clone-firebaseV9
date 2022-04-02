import './Sidebar.css';
import {Avatar, IconButton} from "@material-ui/core";
import {DonutLarge, Chat, MoreVert, SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import {useEffect, useState} from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import {onSnapshot} from "firebase/firestore";
import {db} from "./firebase";
import {useStateValue} from "./StateProvider";

const Sidebar = () => {
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(
        () => onSnapshot(collection(db, 'rooms'), snapshot => {
            setRooms(snapshot.docs.map(room => {
                return {
                    id: room.id,
                    data: room.data(),
                }
            }));
        })
    , [db]);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder='Search or start new chat'/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
