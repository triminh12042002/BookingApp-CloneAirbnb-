import { useState } from "react";

export default function PlaceGallery({ place }) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
            <div className="absolute bg-black inset-0 bg-white min-h-screen">
                <div className=" bg-black grid gap-4 p-8">
                    <div>
                        <h2 className="text-3xl text-white">{place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed top-8 right-12 p-2 flex shadow shadow-black rounded-2xl">Close photos</button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div>
                            <img src={'http://127.0.0.1:4000/uploads/' + photo} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                <div >
                    {place.photos?.[0] && (
                        <img onClick={() => setShowAllPhotos(true)} className=" aspect-square cursor-pointer object-cover" src={'http://127.0.0.1:4000/uploads/' + place.photos[0]} />
                    )}
                </div>
                <div className="grid ">
                    {place.photos?.[1] && (
                        <img onClick={() => setShowAllPhotos(true)} className="aspect-square  cursor-pointer object-cover" src={'http://127.0.0.1:4000/uploads/' + place.photos[1]} />
                    )}
                    <div className="overflow-hidden ">
                        {place.photos?.[2] && (
                            <img onClick={() => setShowAllPhotos(true)} className="aspect-square  cursor-pointer object-cover relative top-2" src={'http://127.0.0.1:4000/uploads/' + place.photos[2]} />
                        )}
                    </div>

                </div>
                <button onClick={() => setShowAllPhotos(true)} className="absolute bottom-2 right-2 px-2 py-4 bg-white rounded-2xl">
                    Show more image
                </button>
            </div>
        </div>
    )
}