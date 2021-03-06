import React from "react";
import { Container, Button, Col, Row, Form } from "react-bootstrap";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "../Portfolio.css";

const style = {
  page: {
    marginTop: "25rem"
  },
  text: {
    fontSize: "1.2rem"
  },
  linkedin: {
    color: "#0077B5",
    marginRight: "1rem",
    marginBottom: "5px",
    fontSize: "2.5rem"
  },
  github: {
    color: "#000000",
    marginRight: "1rem",
    marginBottom: "5px",
    fontSize: "2.5rem"
  },
  email: {
    color: "#003366"
  }
};

const initialState = {
  fname: "",
  lname: "",
  email: "",
  phone: "",
  message: "",
  fnameError: "",
  lnameError: "",
  emailError: ""
};

//this is the contact form
class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.fname.length === 0) {
      this.setState({
        fnameError: "Please enter your first name."
      });
    } else if (this.state.lname.length === 0) {
      this.setState({
        lnameError: "Please enter your last name"
      });
    } else if (!this.state.email.includes("@")) {
      this.setState({
        emailError: "Please enter a valid email address"
      });
    } else {
      const info = {
        firstName: this.state.fname,
        lastName: this.state.lname,
        email: this.state.email,
        phone: this.state.phone,
        message: this.state.message
      };

      let self = this;
      axios.post("api/form", info).then(function(data) {
        console.log(data);
        self.props.history.push("/thank-you");
      });
    }
  };
  // }

  //Contact Form
  render() {
    return (
      <div>
        <Container style={style.page}>
          <Row style={{ marginBottom: "1.5rem" }}>
            <Col sm={1} md={10}>
              <div style={style.text}>
                <h2 style={{ marginTop: "10rem", marginBottom: "15px" }}>Let's Connect</h2>
                <a href="https://www.linkedin.com/in/andreaminhas/">
                  <i style={style.linkedin} className="fab fa-linkedin" />
                </a>
                <a href="https://github.com/andreaMT15">
                  <i style={style.github} className="fab fa-github" />
                </a>
                <br />
                <a href="mailto:andrea.minhas@gmail.com" style={style.email}>
                  andrea.minhas@gmail.com
                </a>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={10}>
              <div>
                <h3>Interested in working a project together?</h3>
              </div>
              <p style={style.text}>Please fill out the contact form below.</p>
            </Col>
          </Row>
          <Form id="contact" onSubmit={this.handleSubmit} style={{ marginBottom: "1.5rem" }}>
            <Form.Group>
              <Form.Row>
                <Col md={4}>
                  <Form.Control placeholder="First Name" type="text" name="fname" onChange={this.handleChange} />
                  <div style={{ marginLeft: "5px", marginTop: "2px" }}>{this.state.fnameError}</div>
                </Col>
                <Col md={4}>
                  <Form.Control placeholder="Last Name" type="text" name="lname" onChange={this.handleChange} />
                  <div>{this.state.lnameError} </div>
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Col md={8}>
                  <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleChange} />
                  <div>{this.state.emailError}</div>
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Col md={8}>
                  <Form.Control type="test" name="phone" placeholder="(708) 123-456" onChange={this.handleChange} />
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Col md={8}>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    placeholder="Message"
                    name="message"
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Row>
            </Form.Group>

            <Button
              style={{ backgroundColor: "#003366" }}
              onClick={e => this.handleSubmit(e)}
              value="Submit"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(ContactForm);
