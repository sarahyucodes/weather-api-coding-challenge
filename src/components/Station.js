export default function Station({ station }) {
    function getLatLong() {   
        const { latitude, longitude } = station.coords

        return `${latitude}, ${longitude}`
    }

    function getGoogleMapsLink() {
        return `https://maps.google.com/?q=${getLatLong()}`
    }

    function renderDetail(property, value) {
        return (
            <div className='text-xs flex flex-row justify-between'>
                <span className='font-semibold'>{property}</span>
                <span>{value}</span>
            </div>
        )
    }

    return (
        <div className='col-span-2 md:col-span-1 flex flex-col rounded p-4 bg-slate-100'>
            <h3 className='mb-5 md:mb-10 font-semibold text-base xl:text-lg'>
                {station.name}
            </h3>
            {renderDetail('Identifier', station.id)}
            {renderDetail('Altitude', `${station.altitude}m`)}
            {renderDetail('Coords', <a className='underline text-blue-700' href={getGoogleMapsLink()} target='_blank' rel='noreferrer'>{getLatLong()}</a>)}
            {renderDetail('Zone', station.timeZone.split('_').join(' '))}
        </div>
    )
}