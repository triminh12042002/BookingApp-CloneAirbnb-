import axios from 'axios'
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom"


export default function UserPlacePage() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            console.log('data');
            console.log(data);
            setPlaces(data);
        });
    }, []) // [] -> run only after render component, not run on updating

    return (
        <div>
            <div className="text-center my-2 ">
                <br />
                <Link className='inline-flex bg-primary text-white py-2 px-4 rounded-full' to={'/account/places/new'} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>
            <div>
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/' + place._id } key={place.title} className='cursor-pointer flex gap-4 bg-gray-200 p-2 m-2 mt-4 rounded-2xl'>
                        <div className='w-32 h-32 flex bg-gray-300 shrink-0'>
                            {place.photos?.[0] && (
                                <img  className='rounded-2xl w-full object-cover' key={place.photos[0]} src={'http://127.0.0.1:4000/uploads/' + place.photos[0]} alt='' />
                            )}
                        </div>
                        <div>
                            <h2>{place.title}</h2>
                            <p>{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    )
}