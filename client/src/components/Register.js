import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";

export const Register = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phno: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormData = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = (event) => {
    console.log("Trying to submit registration request");
    console.log(JSON.stringify(formData));
    event.preventDefault();
    try {
      fetch("http://localhost:4444/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          var data = response.json();
          if (response.ok) {
          }
          return data;
        })
        .then((data) => {
          console.log(data.message);
          alert(data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Failed to " + error.message);
    }
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ position: "relative", height: "100vh" }}
    >
      <Form
        onSubmit={submitForm}
        className="rounded-4 border"
        style={{ padding: "20px" }}
      >
        <Form.Group
          as={Row}
          className="mb-3 mt-3 form-control-sm"
          controlId="formHoizontalFirstName"
        >
          <Form.Label column sm={3}>
            Name
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="name"
              placeholder="Name"
              className="form-control-sm"
              name="username"
              value={formData.username}
              onChange={handleFormData}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3 mt-3 form-control-sm"
          controlId="formHoizontalEmail"
        >
          <Form.Label column sm={3}>
            Email
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="email"
              placeholder="Email"
              className="form-control-sm"
              name="email"
              value={formData.email}
              onChange={handleFormData}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3 mt-3 form-control-sm "
          controlId="formHoizontalPhoneNumber"
        >
          <Form.Label column sm={3}>
            PhoneNo
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              placeholder="Phone Number"
              className="form-control-sm"
              name="phno"
              value={formData.phno}
              onChange={handleFormData}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3 mt-3 form-control-sm"
          controlId="formHoizontalAddress"
        >
          <Form.Label column sm={3}>
            Address
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              placeholder="Address"
              className="form-control-sm"
              name="address"
              value={formData.address}
              onChange={handleFormData}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3 mt-3 form-control-sm"
          controlId="formHoizontalpassword"
        >
          <Form.Label column sm={3}>
            Password
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="password"
              placeholder="Password"
              className="form-control-sm"
              name="password"
              value={formData.password}
              onChange={handleFormData}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3 mt-3 form-control-sm"
          controlId="formHoizontalConfirmPassword"
        >
          <Form.Label column sm={3}>
            Confirm
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              className="form-control-sm"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleFormData}
            />
          </Col>
        </Form.Group>

        <fieldset>
          <Form.Group as={Row} className="mb-3 form-control-sm">
            <Form.Label as="legend" column sm={3}>
              Gender
            </Form.Label>
            <Col sm={9}>
              <Form.Check
                type="radio"
                label="Male"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                type="radio"
                label="Female"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
              <Form.Check
                type="radio"
                label="Others"
                name="formHorizontalRadios"
                id="formHorizontalRadios3"
              />
            </Col>
          </Form.Group>
        </fieldset>

        <div className="d-grid gap-2 mb-3">
          <Button size="md" type="submit">
            Sign Up
          </Button>
        </div>
        <Form.Text href="/">
          Already have an account?
          <Link to="/"> Sign In Here</Link>
        </Form.Text>
      </Form>
    </div>
  );
};

export default Register;
