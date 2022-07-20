export default function Station({ station }) {
    function getLatLong() {   
        const { lat, lng } = station.coords

        return `${lat}, ${lng}`
    }

    function getGoogleMapsLink() {
        return `https://maps.google.com/?q=${getLatLong()}`
    }

    function renderDetail(property, value) {
        return (
            <div className='flex justify-between text-xs'>
                <span className='font-semibold'>{property}</span>
                <span>{value}</span>
            </div>
        )
    }

    return (
        <div className='
            col-span-1 w-full
            rounded p-4 mb-4 
            bg-slate-100
            flex flex-col
            md:mb-0'>
            <h3 className='mb-10 font-semibold text-base xl:text-lg'>
                {station.name}
            </h3>
            {renderDetail('Identifier', station.id)}
            {renderDetail('Altitude', `${station.altitude}m`)}
            {renderDetail('Coords', <a className='underline text-blue-700' href={getGoogleMapsLink()} target='_blank' rel='noreferrer'>{getLatLong()}</a>)}
            {renderDetail('Zone', station.timeZone.split('_').join(' '))}
        </div>
    )
}