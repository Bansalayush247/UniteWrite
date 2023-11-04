//import bootstrap button
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";

//import libraries
import { useNavigate } from 'react-router-dom';

export default function DashboardButton() {

  //const to navigate to different pages
  const navigate = useNavigate();

  function handleDashboardClick() {
    navigate("dashboard");
  }

  return (
    <>
      <Button variant="primary" onClick={handleDashboardClick} className='dashboard-button gradient'>Dashboard</Button>
    </>
  );
}
