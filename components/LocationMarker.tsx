import React from 'react';

const LocationMarker: React.FC<{ location: string; onClick: () => void }> = ({ location, onClick }) => {
    return (
        <div className="location-marker" onClick={onClick}>
            <h2>{location}</h2>
            <button>View Location</button>
        </div>
    );
};

export default LocationMarker;