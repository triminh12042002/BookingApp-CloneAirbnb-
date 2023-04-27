export default function Perks({selectedPerks, onChange}) {
    function setPerkClick(ev){
        console.log(selectedPerks);
        console.log(ev.target.name);
        console.log(ev.target.checked);
        const {checked, name} = ev.target;
        if(checked){
            onChange([...selectedPerks, ev.target.name]);
        }
        else {
            onChange([...selectedPerks.filter(selectedName => selectedName != name)])
        }
    }
    return (
        <div className="grid grid-cols-3 gap-2 mt-2">
            <label className="border p-4 flex gap-2 item-center cursor-pointer">
                <input type="checkbox" checked={selectedPerks.includes('wifi')} name="wifi" onClick={setPerkClick} />
                <span>Wifi</span>
            </label>
            <label className="border p-4 flex gap-2 item-center cursor-pointer">
                <input type="checkbox" checked={selectedPerks.includes('free parking spot')} name="free" onClick={setPerkClick} />
                <span>Free parking spot</span>
            </label>
            <label className="border p-4 flex gap-2 item-center cursor-pointer">
                <input type="checkbox" checked={selectedPerks.includes('tv')} name="tv" onClick={setPerkClick} />
                <span>TV</span>
            </label>
            <label className="border p-4 flex gap-2 item-center cursor-pointer">
                <input type="checkbox" checked={selectedPerks.includes('pets')} name="pets" onClick={setPerkClick} />
                <span>Pets</span>
            </label>
            <label className="border p-4 flex gap-2 item-center cursor-pointer">
                <input type="checkbox" checked={selectedPerks.includes('private entrance')} name="private entrance" onClick={setPerkClick} />
                <span>Private entrance</span>
            </label>
        </div>
    )
}