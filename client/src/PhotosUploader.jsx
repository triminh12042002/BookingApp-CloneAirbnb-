import axios from "axios";
import { useState } from "react";

export default function PhotosUploader({addedPhotos, setAddedPhoto}) {
    const [photoLink, setPhotoLink] = useState([]);

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data } = await axios.post('/upload-by-link', { link: photoLink });
        console.log({ data });
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
        <>
            <div className="flex gap-2">
                <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder="link of your photo" />
                <button onClick={addPhotoByLink} className="bg-gray-200 rounded-2xl px-2">add&nbsp;photo</button>
            </div>
            <div className='mt-2 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6'>
                {addedPhotos.length > 0 && addedPhotos.map((photolink) => (
                    <div className='h-32 flex' key={photolink}>
                        <img className='rounded-2xl w-full object-cover' src={"http://127.0.0.1:4000/uploads/" + photolink} alt="" />
                    </div>
                ))}
                <label className="h-32 cursor-pointer flex item-center justify-center border bg-transparent rounded-xl p-4">
                    <input type='file' multiple className="hidden" onChange={uploadPhoto} />
                    Upload
                </label>
            </div>
        </>
    )
}