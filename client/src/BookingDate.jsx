import { format, differenceInCalendarDays } from "date-fns"

export default function BookingDate({ booking }) {
    return (
        <div>
            <div>
                Number of nights: {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} <br />
                Total price: ${booking.price}
            </div>
            <div className="border-t border-gray-300 py-2 mt-2 ">
                {format(new Date(booking.checkIn), 'yyyy-MM-dd')} {'-->'} {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
            </div>
        </div>

    )
}