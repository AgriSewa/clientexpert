import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Results=()=>{
    const navigate = useNavigate();
    const [results,setResults]=useState([]);
    useEffect(()=>{
        if (!localStorage.getItem("user")) {
            navigate("/api/auth/loginExpert");
        }
        else {
            axios({
                url:'/expert/viewResults',
                method:'GET',
                headers: {
                    'auth': `Bearer ${localStorage.getItem("jwt")}`,
                }
            }).then(res=>{
                setResults(res.data.results)
            })
        }        
    },[])

    return(
        <div className='gallery'>
            {
                results &&
                results.map((result)=>{
                    var date=new Date(result.book_date.split('T')[0])
                    date.setDate(date.getDate()+1)
                    return(
                        result.update_expert==0 
                        && 
                        result.image!=='https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg'
                        && 
                        <div className='card home-card' key={result.id}>                     
                            <div className='card-image'>
                                <img src={result.image} style={{height:'300px'}}/>
                            </div>
                            <div className='card-content' style={{textAlign:'center'}}>
                                <h6><strong>Appointment Date:</strong> {date.toDateString()}</h6>
                                <button className="btn waves-effect waves-light #00bcd4 cyan white-text text-lighten-3" onClick={()=>navigate(`/upload/solution/${result.id}`)}>Submit Advice</button>
                            </div>
                        </div>
                    )
            })
            }                       
        </div>
    )
}

export default Results;