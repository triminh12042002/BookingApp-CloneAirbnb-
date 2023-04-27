import axios from 'axios'
import { useEffect, useState } from "react";
import Perks from "./Perks";
import PhotosUploader from '../PhotosUploader';
import AccountNav from '../AccountNav';
import { Navigate, useParams } from 'react-router-dom';
export default function PlaceFormPage() {
    const { id } = useParams();
    // console.log({id});
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhoto] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [maxNumGuest, setMaxNumGuest] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(res => {
            const { data } = res;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhoto(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckInTime(data.checkIn);
            setCheckOutTime(data.checkOut);
            setMaxNumGuest(data.maxGuest);
            setPrice(data.price);
        })
    }, [id]);

    async function savePlace(e) {
        e.preventDefault();
        // console.log('addedPhotos');
        // console.log(addedPhotos);
        const newPlaceData = {
            title, address, addedPhotos, price,
            description, perks, extraInfo,
            checkInTime, checkOutTime, maxNumGuest, 
        }
        if (id) {
            // update
            newPlaceData.id = id;
            const { data: responseData } = await axios.put('/places', newPlaceData);
            console.log('responseData');
            console.log(responseData);
        } else {
            // create
            const { data: responseData } = await axios.post('/places', newPlaceData);
            console.log('responseData');
            console.log(responseData);
        }



        setRedirect(true);
        // action = undefined;

    }
    if (redirect) {
        return <Navigate to='/account/places/' />;
    }
    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                <h2 className="text-2xl mt-4">Title</h2>
                <p className="text-gray-300">title for your place</p>
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title" />
                <h2 className="text-2xl mt-4">Address</h2>
                <p className="text-gray-300">adress of your place</p>
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                <h2 className="text-2xl mt-4">Photos</h2>
                <p className="text-gray-300">photos of your place</p>
                <PhotosUploader addedPhotos={addedPhotos} setAddedPhoto={setAddedPhoto} />
                <h2 className="text-2xl mt-4">Description</h2>
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} className=""></textarea>
                <h2 className="text-2xl mt-4">Perks</h2>
                <p className="text-gray-300">Select the perk that your place provide</p>
                <Perks selectedPerks={perks} onChange={setPerks} />
                <h2 className="text-2xl mt-4">Extra info</h2>
                <p className="text-gray-300">house rule, etc</p>
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                <h2 className="text-2xl mt-4">Check in&out time</h2>
                <p className="text-gray-300">add check in and check out time</p>
                <div className=" grid md:grid-cols-4 sm:grid-cols-3 gap-2">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input type="text" value={checkInTime} onChange={ev => setCheckInTime(ev.target.value)} placeholder="12:04" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input type="text" value={checkOutTime} onChange={ev => setCheckOutTime(ev.target.value)} placeholder="20:02" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input type="number" value={maxNumGuest} onChange={ev => setMaxNumGuest(ev.target.value)} placeholder="2" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price</h3>
                        <input type="number" value={price} onChange={ev => setPrice(ev.target.value)} placeholder="100" />
                    </div>
                </div>
                <button className="primary">Save</button>

            </form>
        </div>

    )
}