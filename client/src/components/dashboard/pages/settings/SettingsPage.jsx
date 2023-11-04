import WorkInProgress from "../../../work-in-progress/WorkInProgress";
import "./styles.css";

export default function SettingsPage() {
    return (
        <div className="settings-page-container">
            <div className="settings-page-heading-container">
                <h1>| Settings |</h1>
            </div>
            <hr/>
            <WorkInProgress />
        </div>
    )
}