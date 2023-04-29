import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    // fetch place data
    useEffect(() => {
        if (!id)
            return;
        axios.get(`/places/${id}`).then(res => {
            console.log(res);
            setPlace(res.data);
        })
    }, []);
    if (!place)
        return '';

    return (
        <div className="'mt-4 bg-gray-100 -mx-8 py-4 px-8 flex flex-col min-h-screen max-w-5xl mx-auto">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink >{place.address}</AddressLink>
            <PlaceGallery place={place} />
            <div className="mt-6 gap-8 grid grid-cols-1s md:grid-cols-[2fr_1fr]">
                <div>
                    <h2 className="font-semibold text-2xl">Description</h2>
                    <div className="my-4">
                        {place.description}
                    </div>
                    Check-in: {place.checkIn} <br />
                    Check-out: {place.checkOut} <br />
                    Max number of guest: {place.maxGuest}
                </div>
                <div>
                    <BookingWidget place={place} setPlace={setPlace} />
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 pt-8 mt-8">
                <h2 className="font-semibold text-2xl">Extra info</h2>
                <div className="mt-1 mb-4 text-sm text-gray-700 leading-4" >{place.extraInfo}</div>
            </div>

        </div>
    )
}