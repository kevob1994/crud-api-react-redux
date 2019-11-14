import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark-bg-primary justify-content-between">
            <h1>
                <Link to={"/"}>
                    CRUD - React, Redux Hooks, REST API y Axios
                </Link> 
            </h1>

            <Link to={'/productos/nuevo'} className="btn btn-danger nuevo-post d-bloc d-md-inline-block">
                Agregar Producto &#43
            </Link>
        </nav>
     );
}
 
export default Header;