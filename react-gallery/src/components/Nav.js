import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav(props) {
    return(
        <nav className="main-nav">
            <ul>
                <li><NavLink to='/waterfall'>Waterfall</NavLink></li>
                <li><NavLink to='/leaves'>Leaves</NavLink></li>
                <li><NavLink to='/dessert'>Dessert</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav;