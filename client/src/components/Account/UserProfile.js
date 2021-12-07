import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import AccountImage from "./AccountImage";
import AccountInfo from "./AccountInfo";
import Modal from "react-modal";

import classes from "./UserProfile.module.css";

function UserProfile(props) {
  const user = useSelector((store) => store.auth.user);
  console.log(user);
  return (
    <Container className={classes.box}>
      <Row>
        <Col>
          <AccountImage user={user} />
        </Col>
        <Col xs={8}>
          <AccountInfo user={user} />
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfile;
