import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
// import { NavbarBrand } from "react-bootstrap";

export const Login = (props) => {
  // const [cookies, setCookie, removeCookie] = useCookies(["myCookie"]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Set a cookie
  const port = 4444;
  const handleFormData = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function submitForm(event) {
    console.log("Trying to submit Login request");
    console.log(JSON.stringify(formData));
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:${port}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response = " + data.message + "\n" + data.token);

      if (response.ok) {
        Cookies.set("jwt_token", data.token, {
          path: "/",
          expires: 30,
        });
        console.log(data.message + ". Now navigating to home");
        window.location.href = "/home";
      } else {
        alert(data.message + " Please enter valid username and password");
      }
    } catch (error) {
      console.log("Failed to " + error.message);
      Cookies.remove("jwt_token");
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ position: "relative", height: "100vh" }}
    >
      <Form
        onSubmit={submitForm}
        className="rounded-4 border"
        // className=" m-4"
        style={{ padding: "20px" }}
      >
        <div className="text-center">
          <span className="span-class">SYNERGY</span>
          <span className="span-class1">WATCH</span>
        </div>
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

        <div className="d-grid gap-2 mb-3">
          <Button size="md" type="submit">
            Sign In
          </Button>
        </div>
        <Form.Text href="/login">
          Don't have an account?
          <Link to="/register"> Sign Up Here</Link>
        </Form.Text>
      </Form>
    </div>
  );
};

export default Login;
