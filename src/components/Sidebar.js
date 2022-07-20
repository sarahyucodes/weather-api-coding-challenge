import { useState } from 'react'

export default function Sidebar({
    stations,
    filterStations
}) {
    // get all unique time zones
    const allTimeZones = [...new Set(stations.map(station => station.timeZone))]

    const [filters, setFilters] = useState([])
    const [showFilters, setShowFilters] = useState(true)

    const handleOnChange = (event, selectedTimeZone) => {
        if (event.target.checked) {
            setFilters([...filters, selectedTimeZone])
            filterStations([...filters, selectedTimeZone])
        } else {
            setFilters(filters.filter(item => item !== selectedTimeZone))
            filterStations(filters.filter(item => item !== selectedTimeZone))
        }
    }

    const renderTimeZoneOptions = () => {
        return allTimeZones.map((timeZone, index) => {
            return (
                <label key={index} className='text-xs mb-1 last:mb-0'>
                    <input 
                        type='checkbox'
                        name='timeZone'
                        value={timeZone}
                        onChange={event => handleOnChange(event, timeZone)}
                    />
                    <span className='ml-2'>{timeZone.split('_').join(' ')}</span>
                </label>
            )
        })
    }

    return (
        <aside className='col-span-1 mb-4 md:mb-0'>
            <h2 className='text-base font-medium pb-4 flex items-center'>
                <span>Filter by Time Zone</span>
                <button
                    className='ml-2 text-xl'
                    aria-label={showFilters ? 'hide filters' : 'expand filters'}
                    aria-controls='time-zone-filters'
                    onClick={() => setShowFilters(!showFilters)}
                >
                    {showFilters ? '-' : '+'}
                </button>
            </h2>
            <div id='time-zone-filters' className={`flex flex-col overflow-y-hidden ${!showFilters ? 'h-0' : ''}`}>
                {renderTimeZoneOptions()}
            </div>
        </aside>
    )
}