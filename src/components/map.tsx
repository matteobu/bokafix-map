import { useEffect, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";

export default function Map() {
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [zoom, setZoom] = useState(12);
    const [arrayOfLocation, setArrayOfLocation] = useState([]);

    function getUserLocation() {
        function success(pos: any) {
            var crd = pos.coords;
            console.log("Your current position is:");
            console.log("Latitude: ", crd.latitude);
            console.log("Longitude: ", crd.longitude);
            let coordinates: any = [crd.latitude, crd.longitude];
            setArrayOfLocation(arrayOfLocation.concat(coordinates));
            setCenter({ lat: crd.latitude, lng: crd.longitude });
            setZoom(16);
        }
        navigator.geolocation.getCurrentPosition(success);
    }

    function getRandomLocation() {
        let latitude: number = Math.floor(Math.random() * (90.0 - -90.0) - 90);
        let longitude: number = Math.floor(
            Math.random() * (180.0 - -180.0) - 180
        );
        let coordinates: any = [latitude, longitude];
        setArrayOfLocation(arrayOfLocation.concat(coordinates));
        setCenter({ lat: latitude, lng: longitude });
        setZoom(7);
    }
    useEffect(() => {
        getUserLocation();
    }, []);

    return (
        <div className="container">
            <div className="map">
                <GoogleMap
                    zoom={zoom}
                    center={center}
                    mapContainerClassName="map-container"
                ></GoogleMap>
            </div>
            <div className="buttons-container">
                <div>
                    <button className="button" onClick={getUserLocation}>
                        Get Your Location
                    </button>
                    <button
                        type="button"
                        className="button"
                        onClick={getRandomLocation}
                    >
                        Get Random Location
                    </button>
                    <div className="location-container">
                        LAT: {center.lat} - LNG: {center.lng}
                    </div>
                </div>
            </div>
            <div className="current-coordinates">
                VISITED LOCATIONS:
                {arrayOfLocation &&
                    arrayOfLocation.map((location, i) => (
                        <div className="current-coordinates" key={i}>
                            [{location}]
                        </div>
                    ))}
            </div>
        </div>
    );
}
