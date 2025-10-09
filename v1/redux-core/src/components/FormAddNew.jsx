import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNewUserRedux } from "../action/actions";

const FormAddNew = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  
  const dispatch = useDispatch();
  const isCreating = useSelector((state) => state.user.isCreating);

  const handleCreate = () => {
    if (!email || !password || !username) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    
    dispatch(createNewUserRedux(email, password, username));
    
    // Clear form after submit
    if (!isCreating) {
      setEmail("");
      setPassword("");
      setUsername("");
    }
  };

  return (
    <>
      <br />
      <Container>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" disabled={isCreating} onClick={handleCreate}>
            {isCreating ? "Creating..." : "Create"}
          </Button>
        </Form>
      </Container>
      <hr />
    </>
  );
};

export default FormAddNew;
