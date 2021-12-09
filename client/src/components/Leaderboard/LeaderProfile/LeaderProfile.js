import React from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import style from "./LeaderProfile.module.css";
import "./LeaderProfile.css";

const LeaderProfile = ({ openProfile, setShowPublications }) => {
  const { img, name, rating } = openProfile;

  return (
    <div className="mt-1 border border-secondary rounded-3 backgroundUser">
      <Container data-bs-spy="scroll">
        <Row>
          <Col md={{ span: 6 }}>
            <Card.Img
              variant="top"
              src={img ? img : "/img/person/default_avatar.jpeg"}
              // height="200px"
              className="mt-1"
            />
          </Col>
          <Col md={{ span: 6 }} className="colorTextProfile">
            Coal powers 70 percent of India’s electricity generation, but Prime
            Minister Narendra Modi has pledged that by 2030, India will produce
            more energy through solar and other renewables than its entire grid
            now.
          </Col>
        </Row>
        <Row>
          <Form className="d-flex justify-content-between w-50 mt-1 mb-1">
            <div className="colorTextProfile">{name}</div>
            <span className="colorTextProfile">{rating}</span>
          </Form>
          <Button
            variant="outline-success"
            onClick={() => setShowPublications((value) => !value)}
          >
            Publications
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default LeaderProfile;
