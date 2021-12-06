import React from "react";
import Carousel from "react-bootstrap/Carousel";

import 'bootstrap/dist/css/bootstrap.min.css';

const BootstrapCarousel = () => {
  return (
    <div>
      <Carousel fade>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://pbs.twimg.com/profile_banners/2787069396/1410132946/1500x500"
            alt="First slide"
            height="300px"
          />
          <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://pbs.twimg.com/profile_banners/803445496010383361/1532497617/1500x500"
            alt="Second slide"
            height="300px"
          />
          <Carousel.Caption>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://sun9-3.userapi.com/c840130/v840130333/680c9/nYA550e2YQM.jpg"
            alt="Third slide"
            height="300px"
          />
          <Carousel.Caption>
            <h5>Third slide label</h5>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://sun1-92.userapi.com/c851524/v851524824/124dd1/iyFUTfIuCDI.jpg"
            alt="Third slide"
            height="300px"
          />
          <Carousel.Caption>
            <h5>Third slide label</h5>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
export default BootstrapCarousel;
