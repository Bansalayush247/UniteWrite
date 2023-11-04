
import image from "./work-in-progress.png";
import "./styles.css";

export default function WorkInProgress() {

    return (
        <div className="work-in-progress-container">
            <img src={image} alt="WORK IN PROGRESS !!! :)" width="170px" height="170px" />
        </div>
    )
}