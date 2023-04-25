import axios from 'axios'
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom"
import Perks from "./Perks";
import PhotosUploader from '../PhotosUploader';

export default function PlacePage() {
    // let { action } = useParams();
    const [title, setTitle] = useState('');
    const [action, setAction] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhoto] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [maxNumGuest, setMaxNumGuest] = useState(1);

    const [redirect, setRedirect] = useState(false);
    
    // let { subpage } = useParams();
    console.log('action at begin:');
    console.log(action);
    
    async function addNewPlace(e){
        e.preventDefault();
        console.log('addedPhotos');
        console.log(addedPhotos);
        const newPlaceData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkInTime, checkOutTime, maxNumGuest,
        }
        const {data: responseData} = await axios.post('/places', newPlaceData);
        console.log(responseData);
        setAction('');
        setRedirect(true);


        // setRedirect(true);
        // action = undefined;
        // return <Navigate to={'/account'} />
    }
    useEffect(() => {
        if (redirect) {
          setRedirect(false);
        }
      }, [redirect]);
    
    // useEffect(() => {
    //     console.log("action");
    //     console.log(action);
    //     if(action){
    //         console.log('redirect');
    //         console.log(redirect);
    //         setRedirect(true);
    //     }
    // },[action]);
    
    function handleSetAction(){
        setAction('new');
    }
   
    
    return (
        <div>
            {action !== 'new' && (
                <div className="text-center my-2 ">
                    <Link className='inline-flex bg-primary text-white py-2 px-4 rounded-full' onClick={handleSetAction} to={'/account/places/new'} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form onSubmit={addNewPlace}>
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
                        <div className=" grid grid-cols-3 gap-2">
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
                        </div>
                        <button className="primary">Save</button>

                    </form>
                </div>
            )}
            {redirect && (
                <Navigate to={'/account/places'} />
            )}
        </div>
    )
}