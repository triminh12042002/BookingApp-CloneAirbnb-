export default function BookingWidget({place, setPlace}) {
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center ">
                Price: ${place.price} / per night
            </div>
            <div className="border">
                <div className="flex">
                    <div className="  px-2 py-1 my-2">
                        <label>Check in:</label>
                        <input type="date" />
                    </div>
                    <div className=" border-l px-2 py-1 my-2">
                        <label>Check out:</label>
                        <input type="date" />
                    </div>
                </div>
                <div className=" border-t px-2 py-1 my-2">
                    <label>Number of guest:</label>
                    <input type="number" value={1} />
                </div>
            </div>

            <button className="primary">Book this place</button>
        </div>
    )
}