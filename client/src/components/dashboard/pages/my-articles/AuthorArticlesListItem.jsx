import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export default function AuthorArticlesListItem(props) {

    const navigate = useNavigate();

    const contract = props.contract;
    const id = props.articleId;

    const[article, setArticle] = useState({});

    const getPost = async() => {
        const _post = await contract.getPost(id);
        setArticle(_post);
    }
    if(contract) {
        getPost();
    }

    function handleViewClick() {
        navigate(`/${id}`);
    }

    const handleDeleteClick = async() => {
        await contract.deletePost(id);
    }

    return (
        <div className="article-list-item-div">
            <h4>{article.title}</h4>
            <div className="article-list-item-button-container">
                <Button variant="outline-success" className="article-list-item-button" onClick={handleViewClick}>View</Button>
                <Button variant="outline-primary" className="article-list-item-button">Edit</Button>
                <Button variant="outline-danger" className="article-list-item-button" onClick={handleDeleteClick}>Delete</Button>
            </div>
        </div>
    )
}
