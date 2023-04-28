import axios from "axios"
import { useEffect, useState } from "react"
import AccountNav from "../AccountNav";
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";

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
                            <div className="border-t border-gray-300 py-2 mt-2 ">
                                {format(new Date(booking.checkIn), 'yyyy-MM-dd')} {'-->'} {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                            </div>
                            <div>
                                Number of nights: {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} <br />
                                Total price: ${booking.price}
                            </div>
                        </div>

                    </Link>
                ))}
            </div>
        </div>
    )
}