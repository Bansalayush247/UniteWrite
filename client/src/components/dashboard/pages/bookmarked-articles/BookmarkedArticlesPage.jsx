import WorkInProgress from "../../../work-in-progress/WorkInProgress";
import "./styles.css";

export default function BookmarkedArticlesPage() {
    return (
        <div className="bookmarks-page-container">
            <div className="bookmarks-page-heading-container">
                <h1>| Bookmarked Articles |</h1>
            </div>
            <hr/>
            <WorkInProgress />
        </div>
    )
}