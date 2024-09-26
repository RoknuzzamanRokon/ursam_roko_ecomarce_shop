// import React, { useState, useContext, useEffect, useCallback } from "react";
// import { AuthContext } from "../AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import { Form, Button, Container, Modal, Row, Col } from "react-bootstrap";
// import {jwtDecode} from "jwt-decode";
// import "./style/Login.css";

// const InputField = ({ label, type, value, onChange }) => {
//   return (
//     <Form.Group className="mb-4">
//       <Form.Label className="input-label">{label}</Form.Label>
//       <Form.Control
//         type={type}
//         value={value}
//         onChange={onChange}
//         className="form-input"
//         required
//       />
//     </Form.Group>
//   );
// };

// function Login() {
//   const { loginUser, googleLoginUser } = useContext(AuthContext);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   const handleClose = () => setShowModal(false);
//   const handleShow = () => setShowModal(true);

//   const handleGoogleLoginSuccess = useCallback(
//     (response) => {
//       const token = response.credential;
//       const userObject = jwtDecode(token);
//       googleLoginUser(userObject);
//       navigate("/");
//     },
//     [googleLoginUser, navigate]
//   );

//   useEffect(() => {
//     if (showModal) {
//       window.google.accounts.id.initialize({
//         client_id: "YOUR_GOOGLE_CLIENT_ID",
//         callback: handleGoogleLoginSuccess,
//       });

//       window.google.accounts.id.renderButton(
//         document.getElementById("google-signin-button"),
//         {
//           theme: "outline",
//           size: "large",
//           shape: "rectangular",
//           logo_alignment: "left",
//           width: "100%",
//         }
//       );
//     }
//   }, [handleGoogleLoginSuccess, showModal]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const success = await loginUser(username, password);
//     if (success) {
//       navigate("/");
//       handleClose();
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <>
//       {/* Login button to trigger modal */}
//       <Button variant="outline-primary" onClick={handleShow}>
//         Login
//       </Button>

//       {/* Modal for Login */}
//       <Modal show={showModal} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title className="text-center w-100">Login</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Container className="login-container">
//             <Row className="justify-content-center">
//               <Col md={12}>
//                 <h5 className="text-center mb-4">Login to Your Account</h5>
//                 <Form onSubmit={handleSubmit}>
//                   <InputField
//                     label="Username"
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                   />
//                   <InputField
//                     label="Password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <Button
//                     variant="primary"
//                     type="submit"
//                     className="login-button w-100"
//                   >
//                     Login
//                   </Button>
//                 </Form>
//                 <div className="divider my-4 text-center">or</div>
//                 <div id="google-signin-button" className="google-button"></div>
//                 <div className="text-center mt-4">
//                   <p>
//                     New User?{" "}
//                     <Link to="/register" className="register-link">
//                       Register here
//                     </Link>
//                   </p>
//                 </div>
//               </Col>
//             </Row>
//           </Container>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default Login;
