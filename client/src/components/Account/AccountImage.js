import { Image, Card, Button } from "react-bootstrap";

function AccountImage(props) {
  return (
    <Card>
      <Card.Img
        variant="top"
        src="https://www.imgonline.com.ua/examples/bee-on-daisy.jpg"
      />
      <Card.Body>
        <Card.Title>{props.user.name}</Card.Title>
        <Card.Text>Reputation: {props.user.reputation}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AccountImage;
