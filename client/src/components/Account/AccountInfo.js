import { Card, Button, Container, Row, Col } from "react-bootstrap";

import classes from "./UserProfile.module.css";

function AccountInfo() {
  return (
    <Card className={classes.box}>
      <Container>
        <h2>Username</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras blandit
          tristique est nec condimentum. Aliquam bibendum, urna at bibendum
          varius, augue purus varius erat, ut aliquam dolor lectus vitae urna.
          Duis convallis, ipsum vel porttitor pharetra, tellus neque accumsan
          urna, non tristique nibh felis ac eros. Ut sed orci lacinia, bibendum
          purus sit amet, eleifend ipsum. Ut eget lorem est. Nullam eu augue
          ligula. Cras placerat porttitor mi ac finibus. Vestibulum pretium,
          augue et bibendum facilisis, orci ligula rutrum libero, eu luctus orci
          nunc quis purus. Aliquam erat volutpat.
        </p>
        <Container>
          <Row>
            <Col>
              <Button>Edit</Button>
            </Col>
            <Col>
              <Button>Change Password</Button>
            </Col>
            <Col>
              <Button variant="danger">Delete Account</Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </Card>
  );
}

export default AccountInfo;
