import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import '../main.css'
import {addCard, loadCards} from '../actions/action'
import { useHistory } from 'react-router-dom'

const Edit = (props) => {

    const history = useHistory()

    useEffect(() => {
        props.loadCards()
    }, [])

    const [username, setUsername] = useState(props.matchCard && props.matchCard.username)

    const [number1, setNumber1] = useState(props.matchCard && props.matchCard.number1)
    const [number2, setNumber2] = useState(props.matchCard && props.matchCard.number2)
    const [number3, setNumber3] = useState(props.matchCard && props.matchCard.number3)
    const [number4, setNumber4] = useState(props.matchCard && props.matchCard.number4)
    const [expDate, setExpDate] = useState(props.matchCard && props.matchCard.expDate)
    
    const [img, seTimg] = useState(props.matchCard && props.matchCard.img)

    const [isDisabled, setIsDisabled] = useState(true)

    const cardNumberCheck = number1 ? number1.split('')[0] : ''

    const [cardImg] = useState([
        {id:4, img:"../images/visacard.png"},
        {id:5, img:"../images/discovercard.png"},
        {id:6, img:"../images/mastercard.png"},
    ])

    const match = cardImg.filter(item => {
        return item.id == cardNumberCheck
    })[0]

    const onChangeDateHandler = e => {
        setExpDate(e.target.value)
    }

    const [expError, setExpError] = useState('')

    const onSubmitForm = e => {
        e.preventDefault()

        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        let convertYear = Number(year.toString().split('')[2]+year.toString().split('')[3])
        let convertMonth = Number(month.length == 2 ? month : '0' + month)

        let expMonth = Number(expDate.slice(0,2))
        let expYear = Number(expDate.slice(3,5))

        if(convertYear < expYear  ){
             setExpError('')
        } 
        else if(convertYear == expYear && convertMonth < expMonth ){
             setExpError('')
        }
        else{
             setExpError('Wrong date')
        }

        let cardToEdit = props.cards.map(item => {
            if (item.id == props.matchCard.id) {
                item.username = username
                item.number1 = number1
                item.number2 = number2
                item.number3 = number3
                item.number4 = number4
                item.img = match.img
                item.expDate = expDate
                return item
            }else{
                return item
            }
        }) 
        let arr = [...cardToEdit]
        localStorage.setItem('data', JSON.stringify(arr));
        props.addCard(arr)
        history.push('/cards')
    }

    const [expErr, setExpErr] = useState('')

    

    return (
        !props.matchCard ? "Loading" :
        <div className='cards_add'>
            <h1>Edit Card</h1>

            <div className="card_add_wraper">
                <div className="card">
                    <div className="card_type">
                        <img src={match ? `/images/${match.img}` : `/images/${props.matchCard && props.matchCard.img}`} alt="" id='visa' style={{  maxWidth:'50%', height:'50px' }}/>
                    </div>
                    <img src="/images/chip.png" alt="" style={{ width:'50px' }}/>
                    <div className="card_numbers">
                        <div className="card_number one"><span>{number1}</span></div>
                        <div className="card_number two"><span>{number2}</span></div>
                        <div className="card_number three"><span>{number3}</span></div>
                        <div className="card_number four"><span>{number4}</span></div>
                    </div>
                    <div className="card_name_footer">
                        <div className="card_username">{username}</div>
                        <div className="card_date">{expDate}</div>
                    </div>
                </div>
                <form onSubmit={onSubmitForm}>
                    <div className="card_name_field">
                        <p>Name</p>
                        <input type="text" name='name' onChange={e=>setUsername(e.target.value)} defaultValue={username}/>
                    </div>
                    <p>Card Number</p>
                    <div className="card_numbers_field">
                     
                            <input  type="number" pattern="\d*" minLength='4' maxLength='4' name='card_1' 
                                    onChange={e=>setNumber1(e.target.value)} 
                                    value={number1 && number1.length > 4 ? setNumber1(number1.slice(0,4)) : number1}
                                />
                     
                            <input  type="number" pattern="\d*" minLength='4' maxLength='4' name='card_2' 
                                    onChange={e=>setNumber2(e.target.value)} 
                                    value={number2 && number2.length > 4 ? setNumber2(number2.slice(0,4)) : number2}
                                />
                    
                            <input  type="number" pattern="\d*" minLength='4' maxLength='4' name='card_3' 
                                    onChange={e=>setNumber3(e.target.value)} 
                                    value={number3 && number3.length > 4 ? setNumber3(number3.slice(0,4)) : number3}
                                />
                       
                            <input  type="number" pattern="\d*" minLength='4' maxLength='4' name='card_4' 
                                    onChange={e=>setNumber4(e.target.value)} 
                                    value={number4 && number4.length > 4 ? setNumber4(number4.slice(0,4)) : number4}
                                />
                      
                    </div>

                    {match == undefined || number2=='' || number3=='' || number4=='' ? 'Wrong card number' : null}

                    <div className='card_date_field'>
                        <p>Expires on</p>
                        <input  type="text" pattern="\d\d/\d\d" placeholder='mm/yy' onChange={onChangeDateHandler} 
                                defaultValue={expDate} minLength='5' maxLength='5' />
                    </div>
                    {expError ? expError : null}
                    <div>
                        <button type="submit" className={`btn_primary ${match !== undefined ? '' : 'disabled'}`} disabled={match !== undefined ? false : true}>Update</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

const actions = {
    addCard,
    loadCards
}

const mapStateToProps = (state, ownProps) => {
    
    return {
        cards: state.cards.cards,
        matchCard:state.cards.cards.find(item => item.id == ownProps.match.params.id)
    }
}

export default connect(mapStateToProps, actions)(Edit)
