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
      this.state = { activeEventEditFriend: null, activeListEventFriend: null };
    }
  
    onFriendLog(person) {
      this.setState({ activeEventEditFriend: person });
    }
  
    friendLogModalCancel() {
      this.setState({ activeEventEditFriend: null });
    }
  
    friendLogModalSave(event) {
      this.setState({ activeEventEditFriend: null });
      this.props.onLogFriendEvent(event);
    }
  
    onViewFriendEvents(person) {
      this.setState({ activeListEventFriend: person });
    }
  
    friendEditModalClose() {
      this.setState({ activeListEventFriend: null });
    }
  
    render() {
      return (
        <>
          <LogEventModal person={this.state.activeEventEditFriend} onCancel={this.friendLogModalCancel} onSave={this.friendLogModalSave} />
          <ManageEventsModal person={this.state.activeListEventFriend} onClose={this.friendEditModalClose} onDeleteFriendEvent={this.props.onDeleteFriendEvent} />
          <Container>
              {(this.props.persons.length > 0 && (
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
              {this.props.persons.map((friend) =>
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