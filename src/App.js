import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import Container from 'react-bootstrap/Container';

import { FriendsApplicationNavbar, FriendTable, LogEventModal } from './CoreComponents';
import { FriendModel } from './DataModels';

import { v4 as uuidv4 } from 'uuid';

function App() {
  const [friendList, setFriendList] = useState([]);

  return (
    <>
      <LogEventModal/>
      <FriendsApplicationNavbar/>
      <Container className={"body-navbar-compensate"}>
        <FriendTable persons={friendList} onAddFriend={(first, last) => {
          let newList = friendList.slice();
          newList.push(new FriendModel(uuidv4(), first + " " + last));
          setFriendList(newList);
        }} onDeleteFriend={(person) => setFriendList(friendList.filter(x => x.id !== person.id))} />
      </Container>
    </>
  );
}

export default App;
