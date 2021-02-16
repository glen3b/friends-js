import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

class LogEventModal extends React.Component {

  render() {
    // TODO 

    return (
      <Modal show={false} onHide={() => alert('hide')}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => alert('close')}>
            Close
                </Button>
          <Button variant="primary" onClick={() => alert('submit')}>
            Save Changes
                </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class FriendTable extends React.Component {
  render() {
    return (
      <Container>
          {(this.props.persons.length > 0 && (
            <Row>
              <Col>Name</Col>
              <Col lg={2}>Actions</Col>
            </Row>)) || (
              <Row>
                {"No friends yet!"}
              </Row>
            )
          }
          {this.props.persons.map((friend) =>
            <FriendRow key={friend.id} person={friend} onDelete={this.props.onDeleteFriend} />
          )}
        <FriendAddRow onSubmit={this.props.onAddFriend} />
      </Container>
    );
  }
}

class FriendAddRow extends React.Component {
  constructor(props) {
    super(props);
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
  }

  render() {
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Form.Row>
          <Col>
            <Form.Control aria-label="First Name" placeholder="First" onChange={this.handleFirstNameChange} value={this.state.firstName} />
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
  }

  handleDeleteClick(e) {
    this.props.onDelete(this.props.person);
  }

  handleLogClick(e) {
    this.props.onLogEvent(this.props.person);
  }

  render() {
    return (
      <Row>
        <Col>{this.props.person.name}</Col>

        <Col lg={2}>
          <Button onClick={this.handleLogClick}><FontAwesomeIcon icon={faCalendarPlus} /></Button>
          {' '}
          <Button variant="danger" onClick={this.handleDeleteClick}><FontAwesomeIcon icon={faTrashAlt} /></Button>
        </Col>
      </Row>
    );
  }
}

export { FriendTable, FriendRow, LogEventModal };