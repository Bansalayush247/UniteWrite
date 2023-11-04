// import libraries
import { NavLink, Outlet } from "react-router-dom"

// import icons
import { CgProfile } from 'react-icons/cg'
import { TfiWrite } from 'react-icons/tfi'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { AiFillSetting } from 'react-icons/ai'
import { FaWallet } from 'react-icons/fa'

// import styles
import "./styles.css";


export default function DashboardPage() {
    return (
        <div className="dashboard-container">
            <div className="dashboard-sidebar-container">
                <NavLink to='/dashboard'><CgProfile /> &nbsp; Profile</NavLink>
                <NavLink to='my-articles'><TfiWrite /> &nbsp; My Articles</NavLink>
                <NavLink to='bookmarked'><BsFillBookmarkFill /> &nbsp; Bookmarked</NavLink>
                <NavLink to='settings'><AiFillSetting /> &nbsp; Settings</NavLink>
                <NavLink to='my-wallets'><FaWallet /> &nbsp; My Wallets</NavLink>
            </div>
            <div className="dashboard-outlet">
                <Outlet />
            </div>
        </div>
    );
}