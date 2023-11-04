
export default function FileUpload(props) {

    function handleImageInput(event) {
        const file = event.target.files[0];
        props.handleImageInput(file);
    }

    return(
        <label htmlFor="create-post-file-upload-input" className="create-post-file-upload-drop-container">

            <span className="create-post-file-upload-drop">Drop file here</span>
            or
            <input type="file" id="create-post-file-upload-input" accept="image/*" onChange={handleImageInput}/>
            
        </label>
    );
}