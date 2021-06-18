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

  function clonePersonEditingEvent(person, event) {
    let retVal = person.clone();
    retVal.events = retVal.events.map(x => x.id === event.id ? event.clone() : x);
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
          onDeleteFriend={(person) => setFriendMap(x => cloneDictRemovingKey(x, person.id))}
          onLogFriendEvent={(event) => setFriendMap(x => {
            let newFriendMap = {...x};
            newFriendMap[event.personId] = newFriendMap[event.personId].cloneWithEvent(event.cloneWithId(uuidv4()));
            return newFriendMap;
          })}
          onDeleteFriendEvent={(person, event) => setFriendMap(x => {
            let newFriendMap = {...x};
            newFriendMap[person.id] = clonePersonRemovingEvent(newFriendMap[person.id], event);
            return newFriendMap;
          })}
          onEditFriendEvent={(person, event) => setFriendMap(x => {
            let newFriendMap={...x};
            newFriendMap[person.id] = clonePersonEditingEvent(person, event);
            return newFriendMap;
          })} />
      </Container>
    </>
  );
}

export default App;
