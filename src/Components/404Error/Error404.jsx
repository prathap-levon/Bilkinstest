import React from 'react'
import error from "../../Assets/Img/hero/404 error page.webp";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
    const navigate = useNavigate();

    const handleHomeLink = () => {
        navigate("/");
    }
    
    return (
        <div className="container">
            <div className="row error-page-row">
                <div className='error-image'>
                    <img src={error} alt="" />
                </div>
                <h1>Page Not Found</h1>
                <p>You can serach for page you want in menu or return to home page</p>
                <div className="d-flex justify-content-center">
                    <button onClick={handleHomeLink}>
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Error404;
