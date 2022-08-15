import React from 'react'
import { Link,useNavigate } from 'react-router-dom';


const NavBar=()=>{
    const navigate=useNavigate()
   
    const renderList=()=>{
        if(localStorage.getItem("user")){
            return [
                <li><Link to="/">Home</Link></li>,
                <li><Link to="/expert/viewResults">Results</Link></li>,
                <li><button className="btn waves-effect waves-light #f44336 red" style={{marginRight:'10px'}} onClick={()=>{
                    localStorage.clear()
                    navigate('/api/auth/loginExpert')
                }}>Logout</button></li>
            ]
        }
        else{
            return [
                <li><Link to="/api/auth/loginExpert">Login</Link></li>
            ]
        }
    }
    return(
        <nav>
            <div className="nav-wrapper black">
                <Link to={localStorage.getItem("user")?"/":'/api/auth/loginExpert'} className="brand-logo left" style={{marginLeft:"10px"}}>AgriSewa</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}                    
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;