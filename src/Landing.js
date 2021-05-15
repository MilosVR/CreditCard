import React from 'react'
import { Link } from 'react-router-dom'


const Landing = () => {
    return (
        <div className='landing'>
            <h1>Quantox </h1>
            <p>Zadatak - FrontEnd Dev</p>
            <img src="../images/quantox_logo.png" alt="" style={{ maxWidth:"100%", height:"200px" }}/>
            <Link to='cards'>Link do zadatka</Link>
        </div>
    )
}

export default Landing
