import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { EventModel } from './DataModels';

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
    // list of events in body, each showing details and delete button
    // this.props.onDeleteFriendEvent (person, event)
    const eventList = this.props.person ? this.props.person.events : [];

    return (
      <Modal show={!!this.props.person} onHide={this.handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Logged Events For <span className={"personname-title"}>{this.props.person?.name}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {eventList.map((event) => 
              <ListGroup.Item>{event.description}{' '}
                <RatingTextDisplay variant="badge" rating={event.rating} />
                <Button className="float-right" variant="danger" onClick={() => this.props.onDeleteFriendEvent(this.props.person, event)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </ListGroup.Item>
            )}
          </ListGroup>
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
      // last param: event ID, undefined (delegate to caller)
      let retVal = new EventModel(this.props.person.id, this.descRef.current.value,
        Date.parse(this.dateRef.current.value), parseFloat(this.ratingRef.current.value), undefined);

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
          <Button variant="link" onClick={this.handleRatingClick}><RatingTextDisplay rating={avgRating} variant="text" /></Button>
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
  static styleClassesByVariant = {
    notApplicable: {
      text: "text-muted",
      badge: "secondary"
    },
    high: {
      text: "text-success",
      badge: "success"
    },
    medium: {
      text: "text-warning",
      badge: "warning"
    },
    low: {
      text: "text-danger",
      badge: "danger"
    }
  };

  renderText(className, innerText) {
    return (
      <span className={className}>
          {innerText}
      </span>
    );
  }

  renderBadge(variantName, innerText) {
    return (
      <Badge variant={variantName}>{innerText}</Badge>
    );
  }

  render() {
    let ratingStyleClass;
    const rating = this.props.rating;
    const variant = this.props.variant;
    const classDict = RatingTextDisplay.styleClassesByVariant;

    if (!isFinite(rating)) {
      ratingStyleClass = classDict.notApplicable[variant];
    } else if (rating >= 60) {
      ratingStyleClass = classDict.high[variant];
    } else if (rating >= 25) {
      ratingStyleClass = classDict.medium[variant];
    } else {
      ratingStyleClass = classDict.low[variant];
    }

    const innerText = !isFinite(rating) ? "N/A" : rating.toFixed(1);

    if (variant === "text") {
      return this.renderText(ratingStyleClass, innerText);
    } else if (variant === "badge") {
      return this.renderBadge(ratingStyleClass, innerText);
    } else {
      throw new Error("Unrecognized variant " + variant);
    }
  }
}

export { LogEventModal, ManageEventsModal, FriendRow, FriendAddRow };