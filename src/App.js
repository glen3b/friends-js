import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import Container from 'react-bootstrap/Container';

import { FriendsApplicationNavbar, FriendTable } from './AppComponents';
import { FriendModel } from './DataModels';

import { v4 as uuidv4 } from 'uuid';

function App() {
  const [friendMap, setFriendMap] = useState({});

  function clonePersonRemovingEvent(person, event) {
    let retVal = person.clone();
    retVal.events = retVal.events.filter(x => x.id !== event.id);
    return retVal;
  }

  function cloneDictRemovingKey(dict, key) {
    let retVal = {...dict};
    delete retVal[key];
    return retVal;
  }

  return (
    <>
      <FriendsApplicationNavbar/>
      <Container className={"body-navbar-compensate"}>
        <FriendTable personMap={friendMap} onAddFriend={(first, last) => {
          let newList = {...friendMap};
          let newFriend = new FriendModel(uuidv4(), first + " " + last);
          newList[newFriend.id] = newFriend;
          setFriendMap(newList);
        }}
          onDeleteFriend={(person) => setFriendMap(cloneDictRemovingKey(friendMap, person.id))}
          onLogFriendEvent={(event) => {
            let newFriendMap = {...friendMap};
            newFriendMap[event.personId] = newFriendMap[event.personId].cloneWithEvent(event.cloneWithId(uuidv4()));
            setFriendMap(newFriendMap);
          }}
          onDeleteFriendEvent={(person, event) => {
            let newFriendMap = {...friendMap};
            newFriendMap[person.id] = clonePersonRemovingEvent(newFriendMap[person.id], event);
            setFriendMap(newFriendMap);
          }} />
      </Container>
    </>
  );
}

export default App;
