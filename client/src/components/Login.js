import React, { useState } from "react";
import { Container, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import black_theme_logo from "../resources/PFXWatchWhite.png";
import light_theme_logo from "../resources/PFXWatchBlack.png";

export const Login = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showWrongPassword, setShowWrongPassword] = useState(false);
  const [showNoUser, setNoUser] = useState(false);

  const theme =
    localStorage.getItem("theme") === "dark" ? "dark" : "light" || "light";
  const logo = theme !== "dark" ? light_theme_logo : black_theme_logo;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleShowPasswordChange = (event) => {
    setShowPassword(event.target.checked);
  };

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
      } else if (response.status === 401) {
        setShowWrongPassword(true);
        console.log(data.message + " Please enter valid username and password");
      } else if (response.status === 406) {
        setNoUser(true);
        console.log(data.message + " User doesn't exists. Please register");
      }
    } catch (error) {
      console.log("Failed to " + error.message);
      Cookies.remove("jwt_token");
    }
  }

  return (
    <div
      className={`d-flex justify-content-center align-items-center ${theme}`}
      style={{ position: "relative", height: "100vh" }}
    >
      <Form
        onSubmit={submitForm}
        className="rounded-2 border"
        style={{ padding: "20px", width: "400px" }}
      >
        <Container className="text-center">
          <Image src={logo} width={"125px"} alt="logo" />
        </Container>
        <Form.Group
          className="mb-3 mt-3 form-control-sm"
          controlId="formHoizontalUsername"
        >
          <Form.Label>USERNAME</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleFormData}
          />
        </Form.Group>

        <Form.Group
          className="mb-3 mt-3 form-control-sm"
          controlId="formHoizontalPassword"
        >
          <Form.Label>PASSWORD</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleFormData}
          />
          <Form.Check
            className="mt-2"
            type="checkbox"
            id="showpassword-checkbox"
            label="Show Password"
            onChange={handleShowPasswordChange}
          />
        </Form.Group>
        <div className="d-grid gap-2 mb-3">
          <Button size="md" type="submit">
            Login
          </Button>
          {showWrongPassword && (
            <Form.Text as="small" className="text-danger mt-0">
              *Username and Password didn't match
            </Form.Text>
          )}
          {showNoUser && (
            <Form.Text as="small" className="text-danger mt-0">
              User doesn't exists.
              <Link to="/register"> Register Here</Link>
            </Form.Text>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Login;
