import { Container, Row, Col } from "react-bootstrap";
import AccountImage from "./AccountImage";
import AccountInfo from "./AccountInfo";

import classes from "./UserProfile.module.css";

function UserProfile(props) {
  return (
    <Container className={classes.box}>
      <Row>
        <Col>
          <AccountImage />
        </Col>
        <Col xs={8}>
          <AccountInfo />
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfile;
