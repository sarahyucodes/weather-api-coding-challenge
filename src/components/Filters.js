import { useState, useEffect } from 'react'
//
import Checkbox from './Checkbox'

export default function Filters({
    stations,
    filterStations
}) {

    const [timeZones, setTimeZones] = useState([])
    const [showFilters, setShowFilters] = useState(true)
    
    useEffect(() => {
        // get all unique time zones and create array
        const allTimeZones = [...new Set(stations.map(station => station.timeZone))].map(timeZone => ({ name: timeZone, checked: false }))

        setTimeZones(allTimeZones)

        return () => setTimeZones(timeZones => timeZones.map(item => {
            return {...item, checked: false}
        }))
    }, [stations])

    const updateTimeZones = (selectedTimeZone) => {
        // mark selected time zone as checked or unchecked
        const updatedTimeZones = timeZones.map(item => item.name === selectedTimeZone ? {...item, checked: !item.checked} : item)

        setTimeZones(updatedTimeZones)
        updateFilters(updatedTimeZones)
    }

    // create array of time zones to filter by
    const updateFilters = updatedTimeZones => {
        let checkedTimeZones = []

        updatedTimeZones.forEach(timeZone => {
            if (timeZone.checked) {
                checkedTimeZones.push(timeZone.name)
            }
        })

        filterStations(checkedTimeZones)
    }

    const renderTimeZoneCheckboxes = () => {        
        return timeZones.length ? timeZones.map((timeZone, index) => {
            return (
                <Checkbox
                    key={index}
                    timeZone={timeZone.name}
                    checked={timeZone.checked}
                    name='timeZone'
                    updateTimeZones={updateTimeZones}
                />
            )
        }) : null
    }

    return (
        <>
            <h2 className='text-base font-medium flex items-center md:text-lg lg:text-xl'>
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
            <div id='time-zone-filters' className={`grid grid-cols-2 gap-x-4 overflow-y-hidden ${!showFilters ? 'h-0' : 'pt-4'}`}>
                {renderTimeZoneCheckboxes()}
            </div>
        </>
    )
}