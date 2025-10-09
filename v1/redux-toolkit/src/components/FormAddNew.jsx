import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createUser, fetchAllUsers } from "../redux/slices/userSlice";

const FormAddNew = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  
  const isCreating = useSelector((state) => state.user.isCreating);

  const handleCreateUser = async () => {
    if (!email || !password || !username) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const userData = {
      email,
      password,
      username
    };

    const resultAction = await dispatch(createUser(userData));
    
    if (createUser.fulfilled.match(resultAction)) {
      // Tạo user thành công
      setEmail("");
      setPassword("");
      setUsername("");
      // Fetch lại danh sách user
      dispatch(fetchAllUsers());
    } else {
      // Xử lý lỗi nếu cần
      alert("Có lỗi xảy ra khi tạo user!");
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
          <Button 
            variant="primary"
            onClick={handleCreateUser}
            disabled={isCreating}
          >
            {isCreating ? 'Creating...' : 'Create'}
          </Button>
        </Form>
      </Container>
      <hr />
    </>
  );
};

export default FormAddNew;
