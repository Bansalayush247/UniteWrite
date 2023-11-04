//import components
import FileUpload from "./file-upload/FileUpload";

// import icons
import { IconContext } from "react-icons";
import { FaUserEdit } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { MdTitle } from 'react-icons/md';
import { BsNewspaper } from 'react-icons/bs'

//import bootstrap components
import Spinner from "react-bootstrap/Spinner";

//import bootstrap elements
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";

//import libraries
import { useState } from "react";
import axios from "axios";

//import css file
import './styles.css';



export default function CreatePostForm({ WalletState }) {

    
    /*==================== HANDLE PUBLISH ====================*/

    //form input constants
    const [authorAlias, setAuthorAlias] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [formState, setFormState] = useState("writing");
    
    let imageHash = "#abc";
    let contentHash = "";

    // get contract from WalletState prop
    const {contract} = WalletState;

    const handlePublishButtonClick = async(event) => {

        //prevent the page from reloading on submit
        event.preventDefault();

        setFormState("publishing");
        
        //upload image to ipfs
        if (image) {
            try {

                //set file data with image to be uploaded
                const formData = new FormData();
                formData.append("file", image);

                //upload data to ipfs
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                      pinata_api_key: `c4068cbef0d9b592a229`,
                      pinata_secret_api_key: `ab193b324a23f5c41029c0514c967dcdb9d4f4c86b15b4da5236dbaa1ce670c5`,
                      "Content-Type": "multipart/form-data",
                    },
                });

                //get hash of uploaded data
                imageHash = `${resFile.data.IpfsHash}`;  
                console.log(imageHash);

            } catch (event) {
                alert("Unable to upload image.");
            }
        }

        // upload article content to ipfs
        if (content) {
            try {

                //upload data to ipfs
                const resText = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                    data: {
                        pinataContent: content,
                    },
                    headers: {
                      pinata_api_key: `c4068cbef0d9b592a229`,
                      pinata_secret_api_key: `ab193b324a23f5c41029c0514c967dcdb9d4f4c86b15b4da5236dbaa1ce670c5`,
                    },
                });

                //get hash of uploaded data
                contentHash = `${resText.data.IpfsHash}`;  
                console.log(contentHash);

            } catch (event) {
                alert("Unable to upload text.");
            }
        }
        
        try {
            // transaction
            const transaction = await contract.createPost(authorAlias, category, title, contentHash, imageHash);
            await transaction.wait();
            alert("Transaction executed successfully!");
            setAuthorAlias('');
            setCategory('');
            setTitle('');
            setContent('');
            setImage(null);
            setFormState("writing");
        } catch {
            alert("Transaction Failed!");
            setFormState("writing");
        }
    }
    /*==================== HANDLE PUBLISH END ====================*/

    /*==================== HANDLE SELECTED IMAGE ====================*/

    function handleImageInput(image) {
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(image);
        reader.onloadend = () => {
            setImage(image);
        }       
    }

    /*==================== HANDLE SELECTED IMAGE END ====================*/

    return (
        <div className="create-post-form-container">
            <form onSubmit={handlePublishButtonClick}>

                <div className="create-post-form-heading-container">
                    <h1>Let the World Know...Publish!</h1>
                </div>

                <div className="author-alias-input-container">
                    <IconContext.Provider value={{size: "1.8em", color: "#73AD21"}}>
                        <FaUserEdit/>
                    </IconContext.Provider>
                    &nbsp;&nbsp;&nbsp;
                    <input type="text" value={authorAlias} onChange={(event) => setAuthorAlias(event.target.value)} required />
                    <label className="floating-label-1">Author Alias</label>
                </div>

                <div className="create-post-form-category-select-container">

                    <IconContext.Provider value={{size: "1.8em", color: "#73AD21"}}>
                        <BiCategory/>
                    </IconContext.Provider>
                    &nbsp;&nbsp;&nbsp;

                    <select value={category} onChange={(event) => setCategory(event.target.value)}>
                        <option selected disabled>--- Select Category ---</option>
                        <option>Crime</option>
                        <option>Economics</option>
                        <option>Lifestyle</option>
                        <option>Medical</option>
                        <option>Politics</option>
                        <option>Science and Technology</option>
                        <option>Socio-Cultural</option>
                        <option>Sports</option>
                        <option>World Affairs</option>    
                        <option>Whistleblowing</option>
                    </select>
                </div>

                <div className="title-input-container">
                    <IconContext.Provider value={{size: "1.8em", color: "#73AD21"}}>
                        <MdTitle/>
                    </IconContext.Provider>
                    &nbsp;&nbsp;&nbsp;
                    <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} required />
                    <label className="floating-label-2">Title</label>
                </div>

                <div className="article-input-container">
                    <IconContext.Provider value={{size: "1.8em", color: "#73AD21"}}>
                        <BsNewspaper/>
                    </IconContext.Provider>
                    &nbsp;&nbsp;&nbsp;
                    <textarea className="article-input-textarea" value={content} onChange={(event) => setContent(event.target.value)}  required/>
                    <label className="floating-label-3">Your Article</label>
                </div>

                <div className="file-upload-container">
                    <FileUpload handleImageInput={handleImageInput} />
                </div>

                <div className="create-post-form-submit-button-container">
                    {formState === "publishing" ? <Spinner animation="border" variant="success" className="publish-spinner" /> : <Button type="submit" variant="success" className='publish-post-button' >Publish</Button>}
                </div>
            </form>
        </div>
    );
}