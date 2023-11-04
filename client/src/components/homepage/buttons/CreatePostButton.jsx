//import bootstrap button 
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";

//import libraries
import { useNavigate } from 'react-router-dom';

export default function CreatePostButton() {

  //const to navigate to different pages
  const navigate = useNavigate();

  function handleCreatePostClick() {
    navigate("create-post");
  }

  return (
    <>
      <Button variant="primary" className='create-post-button gradient' onClick={handleCreatePostClick}>Create Post</Button>
    </>
  );
}
