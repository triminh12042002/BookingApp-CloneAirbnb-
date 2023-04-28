export default function PlaceImg({ place, index=0, className=null }) {
    if(!place.photos?.length) {
        return '';
    }
    if(!className){
        className = 'object-cover';
    }
    return (
        <div>
            <img src={'http://127.0.0.1:4000/uploads/' + place.photos[index]} />
        </div>
    )
}