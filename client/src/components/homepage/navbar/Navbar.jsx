import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <nav className='navbar'>
                <div className='logo'><Link to='/'>UniteWrite</Link></div>
                <ul className='nav-links'>

                    {/*using checkbox hack*/}
                    <input type='checkbox' id='checkbox-toggle' />
                    <label htmlFor='checkbox-toggle' className='hamburger-menu'>&#9776;</label>

                    <div className='menu'>

                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/about'>About</NavLink></li>

                        <li className='my-account-link'>
                            <NavLink to='/'>My Account</NavLink>
                            <ul className='dropdown'>
                                <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                                <li><NavLink to='/'>Settings</NavLink></li>
                            </ul>
                        </li>
                        
                        <li><NavLink to='/contact-us'>Contact</NavLink></li>
                        <li><NavLink to='/'>Feedback</NavLink></li>
                        <li><NavLink to='/donate'>Donate</NavLink></li>
                    </div>
                </ul>
            </nav>
        </div>
    );
}