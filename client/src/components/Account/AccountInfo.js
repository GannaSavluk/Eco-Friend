import { Card, Button, Container, Row, Col } from "react-bootstrap";

import Modal from "react-modal";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { deleteUserThunk, logoutThunk } from "../../store/auth/actions";

import classes from "./UserProfile.module.css";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function AccountInfo(props) {
  Modal.setAppElement("#root");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalIsOpen, setIsOpen] = useState(false);

  const deleteUserHandler = () => openModal();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(choice) {
    if (choice) {
      navigate("/logout");
      dispatch(deleteUserThunk(props.user.id));
    }
    setIsOpen(false);
  }

  return (
    <>
      <Card className={classes.box}>
        <Container>
          <h2>{props.user.name}</h2>

          <Container>
            <Row>
              {/* <Col>
              <Button>Edit</Button>
            </Col> */}
              <Col>
                <Button>Change Password</Button>
              </Col>
              <Col>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteUserHandler();
                  }}
                >
                  Delete Account
                </Button>
              </Col>
            </Row>
          </Container>
        </Container>
      </Card>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Account"
        style={customStyles}
      >
        <h2>
          Are you sure you want to delete your account? This action is permanent
          and cannot be undone.
        </h2>
        <Button onClick={() => closeModal(true)}>Yes</Button>
        <Button onClick={() => closeModal(false)} variant="danger">
          Cancel
        </Button>
      </Modal>
    </>
  );
}

export default AccountInfo;
