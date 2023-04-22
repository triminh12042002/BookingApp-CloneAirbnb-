export default function Perks(selectedPerks, onChange) {
    return (
        <div className="grid grid-cols-3 gap-2 mt-2">
            <label className="border p-4 flex gap-2 item-center cursor-pointer">
                <input type="checkbox" />
                <span>Wifi</span>
            </label>
            <label className="border p-4 flex gap-2 item-center cursor-pointer">
                <input type="checkbox" />
                <span>Free parking spot</span>
            </label>
            <label className="border p-4 flex gap-2 item-center cursor-pointer">
                <input type="checkbox" />
                <span>TV</span>
            </label>
            <label className="border p-4 flex gap-2 item-center cursor-pointer">
                <input type="checkbox" />
                <span>Pets</span>
            </label>
            <label className="border p-4 flex gap-2 item-center cursor-pointer">
                <input type="checkbox" />
                <span>Private entrance</span>
            </label>
        </div>
    )
}