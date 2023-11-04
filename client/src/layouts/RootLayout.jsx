import { Outlet } from "react-router-dom";
import Navbar from "../components/homepage/navbar/Navbar";
import Footer from "../components/homepage/footer/Footer";

export default function RootLayout() {
    return(
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}