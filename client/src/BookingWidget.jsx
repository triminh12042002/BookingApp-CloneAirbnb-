import { useState } from "react"
import { differenceInCalendarDays } from 'date-fns'
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function BookingWidget({ place, setPlace }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('')
    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    function bookThisPlace(ev) {
        const data = {place: place._id, checkIn, checkOut,
            numberOfGuests, name, phone, price:numberOfNights * place.price};
        axios.post('/bookings', data).then((res) => {
            console.log(res);
            setRedirect('account/bookings/' + res.data._id);
        }).catch(err => {
            throw err;
        })
    }

    if(redirect){
        return <Navigate to={redirect} />    
    }
    
    return (
        <div className="bg-white shadow p-4 rounded-2xl  ">
            <div className="text-2xl text-center ">
                Price: ${place.price} / per night
            </div>
            <div className="border rounded-2xl m-2 ">
                <div className="flex">
                    <div className=" py-3 px-4 ">
                        <label>Check in:</label>
                        <input type="date" value={checkIn} onChange={(ev) => setCheckIn(ev.target.value)} />
                    </div>
                    <div className=" border-l px-4 py-3 ">
                        <label>Check out:</label>
                        <input type="date" value={checkOut} onChange={(ev) => setCheckOut(ev.target.value)} />
                    </div>
                </div>
                <div className=" border-t py-3 px-4 py-1">
                    <label>Number of guest:</label>
                    <input type="number" value={numberOfGuests} onChange={(ev) => setNumberOfGuests(ev.target.value)} />
                </div>
                {numberOfNights > 0 && (
                    <div className=" border-t py-3 px-4 py-1">
                        <label>Your full name:</label>
                        <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} />
                        <label>Your phone number:</label>
                        <input type="tel" value={phone} onChange={(ev) => setPhone(ev.target.value)} />
                    </div>
                    
                )}
            </div>

            <button onClick={bookThisPlace} className="primary">
                Book this place
                {numberOfNights > 0 && (
                    <span>  ${numberOfNights * place.price}</span>
                )}
            </button>

        </div>
    )
}