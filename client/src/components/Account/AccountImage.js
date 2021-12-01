import { Image, Card, Button } from "react-bootstrap";

function AccountImage(props) {
  return (
    <Card>
      <Card.Img
        variant="top"
        src="https://www.imgonline.com.ua/examples/bee-on-daisy.jpg"
      />
      <Card.Body>
        <Card.Title>Username</Card.Title>
        <Card.Text>Reputation: </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AccountImage;
