import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";

const DynamicMap = ({ restaurant }) => {
    const [pos, setPos] = useState(null);

    const icon = L.icon({ iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/512px-Map_marker.svg.png" });

    useEffect(() => {
        const addressLoc = restaurant?.address?.split(",");
        if (addressLoc) {
            axios.post('https://food-masters-server-production.up.railway.app/locations', { loc: addressLoc[addressLoc.length - 1] })
                .then((response) => {
                    setPos({ lat: response.data.lat, lng: response.data.lng });
                })
        }
    }, [restaurant?.address]);

    return (
        <div className="ms-4">
            {
                pos && (
                    <MapContainer center={[pos.lat, pos.lng]} zoom={20} scrollWheelZoom={false} className="border-2 border-orange-400 max-w-full">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[pos.lat, pos.lng]} icon={icon}>
                            <Popup>
                                {restaurant?.restaurantName} <br /> {restaurant?.address}.
                            </Popup>
                        </Marker>
                    </MapContainer>
                )
            }
        </div>
    )
}

export default DynamicMap