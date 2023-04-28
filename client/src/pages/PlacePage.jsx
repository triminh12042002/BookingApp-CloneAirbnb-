import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget";

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
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

    if (showAllPhotos) {
        return (
            <div className="absolute bg-black inset-0 bg-white min-h-screen">
                <div className=" bg-black grid gap-4 p-8">
                    <div>
                        <h2 className="text-3xl text-white">{place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed top-8 right-12 p-2 flex shadow shadow-black rounded-2xl">Close photos</button>
                    </div>
                    
                </div>
            </div>
        )
    }
    return (
        <div className="'mt-4 bg-gray-100 -mx-8 p-8">
            <h1 className="text-3xl">{place.title}</h1>
            <a className="block underline mb-2" target='_blank' href={"https://www.google.com/?g=" + place.address} >{place.address}</a>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                    <div >
                        {place.photos?.[0] && (
                            <img onClick={() => setShowAllPhotos(true)} className=" aspect-square cursor-pointer object-cover" src={'http://127.0.0.1:4000/uploads/' + place.photos[0]} />
                        )}
                    </div>
                    <div className="grid ">
                        {place.photos?.[1] && (
                            <img onClick={() => setShowAllPhotos(true)} className="aspect-square  cursor-pointerobject-cover" src={'http://127.0.0.1:4000/uploads/' + place.photos[1]} />
                        )}
                        <div className="overflow-hidden ">
                            {place.photos?.[2] && (
                                <img onClick={() => setShowAllPhotos(true)} className="aspect-square  cursor-pointerobject-cover relative top-2" src={'http://127.0.0.1:4000/uploads/' + place.photos[2]} />
                            )}
                        </div>

                    </div>
                    <button onClick={() => setShowAllPhotos(true)} className="absolute bottom-2 right-2 px-2 py-4 bg-white rounded-2xl">
                        Show more image
                    </button>
                </div>
            </div>

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