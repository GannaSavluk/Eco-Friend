import { Container } from "react-bootstrap";
import { Row, Col } from "antd";
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
      <Row gutter={36}>
        <Col className="gutter-row" span={8}>
          <AccountImage user={user} />
        </Col>
        <Col className="gutter-row" span={16}>
          <AccountInfo user={user} />
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfile;
