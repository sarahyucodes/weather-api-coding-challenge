import { useState, useEffect, useCallback } from 'react'
//
import Station from './Station'
import Pagination from './Pagination'

export default function StationsGrid({
    filtering,
    setFiltering,
    filteredStations,
    error 
}) {    
    const [currentStations, setCurrentStations] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 9
    const totalPages = Math.ceil(filteredStations.length / itemsPerPage)

    // determine subset of stations based on page and items per page
    const updateCurrentStations = useCallback(page => {
        const sliceStart = (page - 1) * itemsPerPage
        const sliceEnd = page * itemsPerPage
        
        setCurrentStations(filteredStations.slice(sliceStart, sliceEnd))
    }, [filteredStations])
    
    const updateCurrentPage = next => {
        const updatedCurrentPage = next ? currentPage + 1 : currentPage - 1
        
        setCurrentPage(updatedCurrentPage)
        updateCurrentStations(updatedCurrentPage)
    }

    useEffect(() => {
        // always set page back to 1 when filtering
        if (filtering) {
            setCurrentPage(1)
            setFiltering(false)
        }

        updateCurrentStations(currentPage)

    }, [filtering, setFiltering, currentPage, updateCurrentStations])

    return (
        <section className='flex flex-col' >
            <div className='flex items-center justify-between pb-4'>
                <h2 className='text-base font-medium md:text-lg lg:text-xl'>
                    Radar Stations
                </h2>
                {
                    totalPages ? (
                        <Pagination
                            currentPage={currentPage}
                            updateCurrentPage={updateCurrentPage}
                            totalPages={totalPages}
                        />
                    ) : null
                }
            </div>
            <div className='grid grid-cols-2 gap-4 lg:grid-cols-3'>
                {
                    error || !currentStations.length ? (
                        <div className={`col-span-full text-sm md:text-base xl:text-lg ${error ? 'text-red-600' : ''}`}>
                            {error || 'Loading...'}
                        </div>
                    ) : (
                        currentStations.map((station, index) => {
                            return (
                                <Station key={index} station={station} />
                            )
                        })
                     )
                }
            </div>

        </section>
    )
}