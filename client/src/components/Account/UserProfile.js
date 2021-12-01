import { Container, Row, Col } from "react-bootstrap";
import AccountImage from "./AccountImage";

function UserProfile(props) {
  return (
    <Container>
      <Row>
        <Col>
          <AccountImage />
        </Col>
        <Col xs={8}>
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfile;
