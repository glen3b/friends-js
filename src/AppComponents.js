import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';

import { LogEventModal, ManageEventsModal, FriendRow, FriendAddRow } from './CoreComponents';

class FriendsApplicationNavbar extends React.Component {
    render() {
      // TODO 
  
      return (
        <Navbar bg="light" expand="lg" fixed="top">
          <Navbar.Brand href="#home">Friends.JS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            <b>Login Info Here</b>
          </Navbar.Collapse>
        </Navbar>
      );
    }
}

class FriendTable extends React.Component {
    constructor(props) {
      super(props);
      this.onViewFriendEvents = this.onViewFriendEvents.bind(this);
      this.friendEditModalClose = this.friendEditModalClose.bind(this);
      this.onFriendLog = this.onFriendLog.bind(this);
      this.friendLogModalCancel = this.friendLogModalCancel.bind(this);
      this.friendLogModalSave = this.friendLogModalSave.bind(this);
      this.resolvePersonId = this.resolvePersonId.bind(this);
      // these are person IDs
      // we don't want to clone a person in here, because if our prop changes that state might become
      //   invalid non-obviously
      // a deletion does risk invalidating IDs but that will fail more obviously
      // further, since we're not (ref)copying Persons, `resolvePersonId` will always
      // mean that we're valid with respect to the property personMap
      this.state = { activeEventEditFriend: null, activeListEventFriend: null };
    }
  
    onFriendLog(person) {
      this.setState({ activeEventEditFriend: person.id });
    }
  
    friendLogModalCancel() {
      this.setState({ activeEventEditFriend: null });
    }
  
    friendLogModalSave(event) {
      this.setState({ activeEventEditFriend: null });
      this.props.onLogFriendEvent(event);
    }
  
    onViewFriendEvents(person) {
      this.setState({ activeListEventFriend: person.id });
    }
  
    friendEditModalClose() {
      this.setState({ activeListEventFriend: null });
    }

    resolvePersonId(id) {
        return id ? this.props.personMap[id] : null;
    }
  
    render() {
      return (
        <>
          <LogEventModal person={this.resolvePersonId(this.state.activeEventEditFriend)} onCancel={this.friendLogModalCancel} onSave={this.friendLogModalSave} />
          <ManageEventsModal person={this.resolvePersonId(this.state.activeListEventFriend)} onClose={this.friendEditModalClose} onDeleteFriendEvent={this.props.onDeleteFriendEvent} />
          <Container>
              {(Object.keys(this.props.personMap).length > 0 && (
                <Row className={"table-header"}>
                  <Col>Name</Col>
                  <Col lg={2}>Rating</Col>
                  <Col lg={2}>Actions</Col>
                </Row>)) || (
                  <Row>
                    {"No friends yet!"}
                  </Row>
                )
              }
              {Object.values(this.props.personMap).map((friend) =>
                <FriendRow key={friend.id} person={friend} onDelete={this.props.onDeleteFriend} onLogEvent={this.onFriendLog} onViewEvents={this.onViewFriendEvents} />
              )}
            <hr/>
            <FriendAddRow onSubmit={this.props.onAddFriend} />
          </Container>
        </>
      );
    }
  }

  export { FriendsApplicationNavbar, FriendTable };