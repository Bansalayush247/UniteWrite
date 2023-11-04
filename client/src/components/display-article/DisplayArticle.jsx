// import libraries
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

// import css file
import './styles.css';

// pinata api keys
const pinataApiKey = 'c4068cbef0d9b592a229';
const pinataApiSecret = 'ab193b324a23f5c41029c0514c967dcdb9d4f4c86b15b4da5236dbaa1ce670c5';

export default function DisplayArticle(props) {
    const { Id } = useParams();
    const {contract} = props.WalletState;
    const [article, setArticle] = useState({});
    const [content, setContent] = useState('It takes some time to load the article! Feel free to explore other articles :)');
    const [timestamp, setTimestamp] = useState({});
    let image = null;
  
    if(article.imageHash !== "#abc") {
        image = `https://ipfs.io/ipfs/${article.imageHash}`;
    }

    useEffect(() => {
        async function getArticle() {
            const _post = await contract.getPost(Id);
            setArticle(_post);
        }
        getArticle();
    }, [Id, contract]);

    useEffect(() => {
        if (article.contentHash !== '') {
            const url = `https://gateway.pinata.cloud/ipfs/${article.contentHash}?pinata_api_key=${pinataApiKey}&pinata_secret_api_key=${pinataApiSecret}`;

            axios.get(url)
                .then(response => {
                    setContent(response.data);
                })
                .catch(error => {
                    //console.log(error);
                });
        }
    }, [article.contentHash]);

    useEffect(() => {
        function getTime(){
            const timestamp = String(article.timestamp);
            const date = new Date(timestamp * 1000); // multiply by 1000 to convert to milliseconds
            const dateString = date.toLocaleDateString(); // get the date as a string
            const timeString = date.toLocaleTimeString(); // get the time as a string
            setTimestamp({date: dateString, time: timeString});;
        }
        getTime();
    }, [article.timestamp]);

    return(
        <div className="article-display-container">
            <h1>{article.title}</h1>
            <br/>
            <div className="article-author-info">
                <h6>✏️ {article.authorAlias}</h6>
                <h6>🕒 Published on <span>{timestamp.date}</span> At <span>{timestamp.time}</span></h6>
            </div>
            <hr className="article-solid-divider"/>
            <br/>
            <br/>
                {image && <img src={image} alt="" className="article-display-image"/>}
            <br/>
            <p>{content.split('\n').map((line, index) => {
                    return <React.Fragment key={index}>{line}<br/></React.Fragment>;
                })}
            </p>
            <br/>
        </div>
    )
}
