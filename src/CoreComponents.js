import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
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
      <>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.persons.map((friend) =>
              <FriendRow key={friend.id} person={friend} />
            )}
          </tbody>
        </Table>
        <FriendAddRow />
      </>
    );
  }
}

class FriendAddRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    alert("hi");
    e.preventDefault();
  }

  render() {
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Form.Row className="align-items-center">
          <Col sm={5}>
            <Form.Control id="inlineFormInputName" aria-label="First Name" placeholder="First" />
          </Col>
          <Col sm={5}>
            <FormControl aria-label="Last Name" placeholder="Last" />
          </Col>
          <Col xs="auto">
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
      <tr>
        <td>{this.props.person.name}</td>

        <td>
          <Button variant="success" onClick={this.handleLogClick}><FontAwesomeIcon icon={faCalendarPlus} /></Button>
          {' '}
          <Button variant="danger" onClick={this.handleDeleteClick}><FontAwesomeIcon icon={faTrashAlt} /></Button></td>
      </tr>
    );
  }
}

export { FriendTable, FriendRow, LogEventModal };