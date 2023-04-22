import axios from 'axios'
import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import Perks from "./Perks";

export default function PlacePage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhoto] = useState([]);
    const [photoLink, setPhotoLink] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [maxNumGuest, setMaxNumGuest] = useState(1);

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data } = await axios.post('/upload-by-link', { link: photoLink });
        // console.log({ data });
        setAddedPhoto([...addedPhotos, data]);
        setPhotoLink('');
    }

    function uploadPhoto(ev) {
        const files = ev.target.files;
        // console.log({files}); 
        const data = new FormData();
        for(let i = 0; i < (files.length); ++i){
            data.append('photos', files[i]);
        }
        axios.post('/uploads', data, {
            headers: {'Content-type': 'multipart/form-data'}
        }).then(response => {
            // console.log({response});
            const {data: filename} = response;
            setAddedPhoto([...addedPhotos, ...filename]);
        })
    }
    
    return (
        <div>
            {action !== 'new' && (
                <div className="text-center my-2 ">
                    <Link className='inline-flex bg-primary text-white py-2 px-4 rounded-full' to={'/account/places/new'} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        <h2 className="text-2xl mt-4">Title</h2>
                        <p className="text-gray-300">title for your place</p>
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title" />
                        <h2 className="text-2xl mt-4">Address</h2>
                        <p className="text-gray-300">adress of your place</p>
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                        <h2 className="text-2xl mt-4">Photos</h2>
                        <p className="text-gray-300">photos of your place</p>
                        <div className="flex gap-2">
                            <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder="link of your photo" />
                            <button onClick={addPhotoByLink} className="bg-gray-200 rounded-2xl px-2">add&nbsp;photo</button>
                        </div>
                        <div className='mt-2 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6'>
                            {addedPhotos.length > 0 && addedPhotos.map((photolink, key) => (
                                <div className='h-32 flex'>
                                    <img className='rounded-2xl w-full object-cover' src={"http://127.0.0.1:4000/uploads/" + photolink} alt="" />
                                </div>
                            ))}
                            <label className="h-32 cursor-pointer flex item-center justify-center border bg-transparent rounded-xl p-4">
                                <input type='file' multiple className="hidden" onChange={uploadPhoto}/>
                                Upload
                            </label>
                        </div>
                        <h2 className="text-2xl mt-4">Description</h2>
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} className=""></textarea>
                        <h2 className="text-2xl mt-4">Perks</h2>
                        <p className="text-gray-300">Select the perk that your place provide</p>
                        <Perks selected={perks} onChange={setPerks} />
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
        </div>
    )
}