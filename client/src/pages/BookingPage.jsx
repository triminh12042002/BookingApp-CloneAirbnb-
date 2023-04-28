import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDate from "../BookingDate";

export default function BookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(res => {
                const foundedBooking = res.data.find(({ _id }) => _id == id);
                console.log(foundedBooking);
                if (foundedBooking) {
                    setBooking(foundedBooking);
                }
            })
        }
    }, [id])
    if (!booking) {
        return '';
    }
    return (
        <div className="my-8">
            <h1>{booking.place.title}</h1>
            <AddressLink >{booking.place.address}</AddressLink>
            <div className="flex justify-between bg-gray-200 p-4 mb-4 rounded-2xl">
                <div>
                    <h2>Your booking infomation</h2>
                    <BookingDate booking={booking} />
                </div>
                <div>
                    <div>Total price</div>
                    <div className="text-3xl">{booking.price}</div>
                </div>
            </div>

            <PlaceGallery place={booking.place} />
        </div>
    )
}