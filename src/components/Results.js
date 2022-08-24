import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Results=()=>{
    const navigate = useNavigate();
    const [results,setResults]=useState([]);
    const [appt,setAppt]=useState("");
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
                console.log(res.data);
                setResults(res.data.results)
                setAppt(res.data.completed);
            });
        }        
    },[])

    return(
        <><div style={{right:'1vh',marginTop:'5px',marginBottom:'15px !important',marginRight:'5px',display:'flex',justifyContent:'flex-end'}}><h4><strong>Appointments Completed: {appt}</strong></h4></div>
        <div className='gallery'>
            {
                results==null && <h1>No previous interactions found</h1>
            }
            {
                results &&
                results.map((result)=>{
                    var date=new Date(result.book_date.split('T')[0]);
                    date.setDate(date.getDate()+1)
                    return(
                        <div className='card home-card' key={result.id}>                     
                            <div className='card-image'>
                                <img src={result.image} style={{height:'300px'}}/>
                            </div>
                            <div className='card-content' style={{textAlign:'center'}}>
                                <h6><strong>Farmer Name:</strong> {result.farmerName}</h6>
                                <h6><strong>Appointment Date:</strong> {date.toDateString()}</h6>
                                <button className="btn waves-effect waves-light #00bcd4 cyan white-text text-lighten-3" onClick={()=>navigate(`/upload/solution/${result.id}`)}>Submit Advice</button>
                            </div>
                        </div>
                        
                    )
            })
            }                    
        </div>
        </>
    )
}

export default Results;