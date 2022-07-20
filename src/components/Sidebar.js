import { useState, useEffect } from 'react'

export default function Sidebar({
    stations
}) {
    const [timeZones, setTimeZones] = useState([])
    
    useEffect(() => {
        setTimeZones([... new Set(stations.map(station => station.timeZone))])
    }, [stations])

    const renderTimeZoneOptions = () => {
        return timeZones.map((timeZone, index) => {
            return (
                <div key={index} className='text-xs xl:text-sm'>{timeZone.split('_').join(' ')}</div>
            )
        })
    }

    return (
        <aside className='col-span-1'>
            <h2 className='text-lg font-medium pb-4 md:text-xl'>
            Filter by Time Zone
            </h2>
            <div>
                {renderTimeZoneOptions()}
            </div>
        </aside>
    )
}