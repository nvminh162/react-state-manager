import { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { deleteUser, fetchAllUsers } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const TableUser = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users)
  const isLoading = useSelector(state => state.user.isLoading)
  const isError = useSelector(state => state.user.isError)
  
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  }

  return (
    <>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isError === true ? (
              <tr>
                <td colSpan="4" className="text-center text-danger">
                  Something wrongs, pls try again...
                </td>
              </tr>
            ) : (
              <>
                {isLoading === true ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Loading data...
                    </td>
                  </tr>
                ) : (
                  <>
                    {users &&
                      users.length > 0 &&
                      users.map((user, index) => (
                        <tr key={`users-${index}`}>
                          <td>{index + 1}</td>
                          <td>{user.email}</td>
                          <td>{user.username}</td>
                          <td>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default TableUser;
