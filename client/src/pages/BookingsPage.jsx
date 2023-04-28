import axios from "axios"
import { useEffect, useState } from "react"
import AccountNav from "../AccountNav";
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import BookingDate from "../BookingDate";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    // fetch bookings of user
    useEffect(() => {
        axios.get('/bookings').then(res => {
            setBookings(res.data);
        }).catch(err => {
            throw err;
        })
    }, [])
    return (
        <div>
            <AccountNav />
            <div>
                {bookings?.length > 0 && bookings.map(booking => (
                    <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden my-2" key={booking.place}>
                        <div className="w-48">
                            <PlaceImg place={booking.place} />
                        </div>
                        <div className="py-3 grow pr-3">
                            <h2 className="text-xl">{booking.place.title}</h2>
                            <BookingDate booking={booking} />
                            
                        </div>

                    </Link>
                ))}
            </div>
        </div>
    )
}