import { useEffect, useState } from "react";
import Header from "../Header";
import axios from "axios";
import { Link } from "react-router-dom";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    // fetch place data
    useEffect(() => {
        axios.get('/places').then(res => {
            console.log(res.data);
            setPlaces([...res.data, ...res.data, ...res.data]);
        })
    }, [])
    return (
        <div className="gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <Link to={'/place/' + place._id} className="" key={place.title}>
                    <div className="bg-gray-500 mb-2 rounded-2xl flex  ">
                        {place.photos?.[0] && (
                            <img className="rounded-2xl object-cover aspect-square" src={'http://127.0.0.1:4000/uploads/' + place.photos[0]} alt='img' />
                        )}
                    </div>
                    <h3 className="font-bold">{place.address}</h3>
                    <h2 className="text-sm text-gray-500">{place.title}</h2>
                    <h3 className="font-bold">$ {place.price} per night</h3>
                </Link>
            ))}
        </div>
    );
}