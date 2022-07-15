export default function Station({ station }) {
    const {
        name,
        id,
        elevation
    } = station.properties

    const { coordinates } = station.geometry

    function getLatLong() {
        return `${coordinates[1]},${coordinates[0]}`
    }

    function getGoogleMapsLink() {
        return `https://maps.google.com/?q=${getLatLong(coordinates)}`
    }

    function renderDetail(property, value) {
        return (
            <div className='flex justify-between xl:text-sm'>
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
            text-xs
            flex flex-col
            md:mb-0'>
            <h3 className='mb-10 font-semibold text-base xl:text-lg'>{name}</h3>
            {renderDetail('Identifier', id)}
            {renderDetail('Altitude', `${elevation.value}m`)}
            {renderDetail('Coords', <a className='underline text-blue-700' href={getGoogleMapsLink()} target='_blank' rel='noreferrer'>{getLatLong()}</a>)}
        </div>
    )
}