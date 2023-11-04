//import react card
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//import libraries
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

//import placeholder image
import placeholderImg from '../resources/card_placeholder_img.jpg';

// storing pinata keys to retrieve data
const pinataApiKey = 'c4068cbef0d9b592a229';
const pinataApiSecret = 'ab193b324a23f5c41029c0514c967dcdb9d4f4c86b15b4da5236dbaa1ce670c5';



export default function ArticleCard(props) {

  let image = null;

  //================== GET ARTICLE IMAGE ==================//

  
  if(props.article.imageHash !== "#abc") {
    image = `https://ipfs.io/ipfs/${props.article.imageHash}`;
  }
  else {
    image = placeholderImg;
  }

  //================== GET ARTICLE IMAGE END ==================//

  //================== GET ARTICLE CONTENT ==================//

  const [content, setContent] = useState('It takes some time to load the article! Feel free to explore other articles :)');

  useEffect(() => {

      if (props.article.contentHash !== '') {

          const url = `https://gateway.pinata.cloud/ipfs/${props.article.contentHash}?pinata_api_key=${pinataApiKey}&pinata_secret_api_key=${pinataApiSecret}`;

          axios.get(url)
              .then(response => {
                  setContent(response.data)
              })
              .catch(error => {
                  console.log(error);
              });
      }
  }, [props.article.contentHash]);


  //================== GET ARTICLE CONTENT ENDS ==================//

  //================== HANDLE READ MORE CLICK ==================//

  // const to navigate to different pages
  const navigate = useNavigate();

  function handleReadMoreClick() {
    navigate(`${props.Id}`);
  }

  //================== HANDLE READ MORE CLICK ==================//

  return (
    <div className='article-card'>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={image} width="286px" height="180px" />
        <Card.Body>
            <Card.Title>
              {props.article.title.length > 69 ? `${props.article.title.slice(0, 69)}...` : props.article.title}
            </Card.Title>
            <Card.Text style={{color: "black"}}>
              {content.length > 50 ? `${content.slice(0, 50)}...` : content}
            </Card.Text>
            <Button variant="outline-success" onClick={handleReadMoreClick}>Read More</Button>
        </Card.Body>
        </Card>
    </div>
  );
}