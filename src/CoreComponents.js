import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { EventModel } from './DataModels';

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

class ManageEventsModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);

    this.state = {};
  }

  handleClose(e) {
    this.props.onClose();
  }

  render() {
    // TODO list of events in body, each showing details and delete button
    return (
      <Modal show={!!this.props.person} onHide={this.handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Logged Events For <span className={"personname-title"}>{this.props.person?.name}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class LogEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancellationClose = this.handleCancellationClose.bind(this);
    this.handleAffirmativeClose = this.handleAffirmativeClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    // for convenience in a many-field situation, use refs not controlled
    // TODO is "form cleared when modal closes" safe to rely on?
    this.dateRef = React.createRef();
    this.descRef = React.createRef();
    this.ratingRef = React.createRef();
    this.formRef = React.createRef();

    this.state = {formValidated: false};
  }

  handleCancellationClose(e) {
    this.setState({ formValidated: false });
    this.props.onCancel();
  }

  handleAffirmativeClose(e) {
    if (this.formRef.current.checkValidity() === false) {
      this.setState({ formValidated: true });
    } else {
      let retVal = new EventModel(this.props.person.id, this.descRef.current.value,
        this.dateRef.current.value, this.ratingRef.current.value);

      this.setState({ formValidated: false });
      this.props.onSave(retVal);
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.handleAffirmativeClose();
  }

  render() {
    return (
      <Modal show={!!this.props.person} onHide={this.handleCancellationClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Log Event For <span className={"personname-title"}>{this.props.person?.name}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={this.state.formValidated} onSubmit={this.handleFormSubmit} ref={this.formRef} >
            <Form.Group>
              <Form.Label>Event Description</Form.Label>
              <Form.Control type="text" placeholder="Description" required ref={this.descRef} />
              <Form.Text className="text-muted">
                Anything you need to identify the meeting.
              </Form.Text>
              {/*
              <Form.Control.Feedback type="invalid">
                A description is required.
              </Form.Control.Feedback>
              */}
            </Form.Group>

            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" required ref={this.dateRef} />
              <Form.Text className="text-muted">
                When this event took place.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Control type="range" custom ref={this.ratingRef} />
              <Form.Text className="text-muted">
                How you felt about your friend! Higher is better.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCancellationClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.handleAffirmativeClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
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
        <ManageEventsModal person={this.state.activeListEventFriend} onClose={this.friendEditModalClose} />
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

class FriendAddRow extends React.Component {
  constructor(props) {
    super(props);
    this.firstNameRef = React.createRef();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.state = {firstName: '', lastName: ''};
  }

  handleFirstNameChange(e) {
    this.setState({firstName: e.target.value});
  }

  handleLastNameChange(e) {
    this.setState({lastName: e.target.value});
  }

  handleFormSubmit(e) {
    this.props.onSubmit(this.state.firstName, this.state.lastName);
    this.setState({firstName: '', lastName: ''});
    e.preventDefault();
    this.firstNameRef.current.focus();
  }

  render() {
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Form.Row>
          <Col>
            <Form.Control aria-label="First Name" placeholder="First" onChange={this.handleFirstNameChange} ref={this.firstNameRef} value={this.state.firstName} />
          </Col>
          <Col>
            <FormControl aria-label="Last Name" placeholder="Last" onChange={this.handleLastNameChange} value={this.state.lastName} />
          </Col>
          <Col lg={2}>
            <Button variant="success" type="submit"><FontAwesomeIcon icon={faPlus} /></Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

class FriendRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleLogClick = this.handleLogClick.bind(this);
    this.handleRatingClick = this.handleRatingClick.bind(this);
  }

  handleDeleteClick(e) {
    this.props.onDelete(this.props.person);
  }

  handleLogClick(e) {
    this.props.onLogEvent(this.props.person);
  }

  handleRatingClick(e) {
    this.props.onViewEvents(this.props.person);
  }

  render() {
    let avgRating = this.props.person.events.length > 0 ? this.props.person.events
      .reduce((all, one, _, src) => all += one.rating / src.length, 0) : NaN;
    
    return (
      <Row className={"table-row"}>
        <Col>{this.props.person.name}</Col>

        <Col lg={2}>
          <Button variant="link" onClick={this.handleRatingClick}><RatingTextDisplay rating={avgRating} /></Button>
        </Col>

        <Col lg={2}>
          <Button onClick={this.handleLogClick}><FontAwesomeIcon icon={faCalendarPlus} /></Button>
          {' '}
          <Button variant="danger" onClick={this.handleDeleteClick}><FontAwesomeIcon icon={faTrashAlt} /></Button>
        </Col>
      </Row>
    );
  }
}

class RatingTextDisplay extends React.Component {
  render() {
    let ratingStyleClass;
    let rating = this.props.rating;
    

    if (!isFinite(rating)) {
      ratingStyleClass = "text-muted";
    } else if (rating >= 60) {
      ratingStyleClass = "text-success";
    } else if (rating >= 25) {
      ratingStyleClass = "text-warning";
    } else {
      ratingStyleClass = "text-danger";
    }

    return (
      <span className={ratingStyleClass}>
          {!isFinite(rating) ? "N/A" : rating.toFixed(1)}
      </span>
    );
  }
}

export { FriendsApplicationNavbar, FriendTable, FriendRow, LogEventModal };