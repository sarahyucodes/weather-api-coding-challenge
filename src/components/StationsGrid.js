import { useState, useEffect, useCallback } from 'react'
//
import Station from './Station'
import Pagination from './Pagination'

export default function StationsGrid({ 
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
        updateCurrentStations(currentPage)
    }, [currentPage, updateCurrentStations])

    return (
        <section className='col-span-3 h-full flex flex-col'>
            <h2 className='text-lg font-medium pb-4 md:text-xl'>
                Radar Stations
            </h2>
            <div className='mb-auto sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3'>
                {
                    error || !currentStations.length ? (
                        <div className='col-span-full text-red-600 text-sm md:text-base xl:text-lg'>
                            {error || 'No stations found.'}
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
            <Pagination
                currentPage={currentPage}
                updateCurrentPage={updateCurrentPage}
                totalPages={totalPages}
            />
        </section>
    )
}