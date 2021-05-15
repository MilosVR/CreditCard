import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../main.css'

import {loadCards} from '../actions/action'


const Cards = (props) => {

    useEffect(() => {
        props.loadCards()
    }, [])

    return (
        <div className='cards'>
            <h1>My Cards</h1>

            <div className="card_wraper">
                {
                    props.cards.cards.map(item=>{
                        return (
                            <div key={item.id}>
                                <Link to={`cards/${item.id}/edit`}>
                                    <div className="card">
                                        <div className="card_type">
                                            <img src={`images/${item.img}`} alt="" id='visa' style={{ maxWidth:'50%', height:'50px' }}/>
                                        </div>
                                        <img src="images/chip.png" alt="" style={{ width:'50px' }}/>
                                        <div className="card_numbers">
                                            <div className="card_number one"><span>{item.number1}</span></div>
                                            <div className="card_number two"><span>{item.number2}</span></div>
                                            <div className="card_number three"><span>{item.number3}</span></div>
                                            <div className="card_number four"><span>{item.number4}</span></div>
                                        </div>
                                        <div className="card_name_footer">
                                            <div className="card_username">{item.username}</div>
                                            <div className="card_date">{item.expDate}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            <Link to='cards/add'>
                <div className="card card_add">
                    <span>+</span>
                </div>
            </Link>
            </div>

        </div>
    )
}

const actions = {
    loadCards
}

const mapStateToProps = state => {
    return {
        cards : state.cards
    }
}

export default connect(mapStateToProps, actions)(Cards)
