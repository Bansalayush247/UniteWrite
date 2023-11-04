//import bootstrap carousel
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';

//import images
import first_img1 from '../resources/placeholder_img1.jpg';
import second_img2 from '../resources/placeholder_img2.jpg';
import third_img3 from '../resources/placeholder_img3.jpg';

export default function HomepageCarousel() {
  return (
    <div className="carousel">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={first_img1}
            alt="First slide"
            width="500" height="600"
          />
          <Carousel.Caption>
            <h4>
              "Our liberty depends on freedom of the press, and that cannot be<br/>limited without being lost."
            </h4>
            <br/>
            <p> ~Thomas Jefferson </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={second_img2}
            alt="Second slide"
            width="500" height="600"
          />
          <Carousel.Caption>
            <h4>
              "A criticle, independent and investigative press is the<br/>lifeblood of any democracy."
            </h4>
            <br/>
            <p> ~Nelson Mandela </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={third_img3}
            alt="Third slide"
            width="500" height="600"
          />
          <Carousel.Caption>
            <h4>
              "If the freedom of speech is taken away then dumb and silent<br/>we may be led, like sheep to the slaughter."
            </h4>
            <br/>
            <p> ~Nelson Mandela </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
