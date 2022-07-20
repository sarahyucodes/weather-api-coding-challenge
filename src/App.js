import { useState, useEffect } from 'react'
//
import { fetchRadarStations } from './services'
import StationsGrid from './components/StationsGrid'
import Pagination from './components/Pagination'
import Sidebar from './components/Sidebar'

export default function App() {
  const [allStations, setAllStations] = useState([])
  const [error, setError] = useState(null)

  const [currentStations, setCurrentStations] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 9
  const totalPages = Math.ceil(allStations.length / itemsPerPage)

  useEffect(() => {
    fetchRadarStations()
      .then(response => {
        setAllStations(response)
        // initialize first page
        setCurrentStations(response.slice(0, itemsPerPage))
      })
      .catch(error => setError(error.message))

    return () => setError(null)
  }, [])

  // determine subset of stations based on page and items per page
  const updateCurrentStations = (page) => {
    const sliceStart = (page - 1) * itemsPerPage
    const sliceEnd = page * itemsPerPage

    setCurrentStations(allStations.slice(sliceStart, sliceEnd))

    // console.log(`
    //   ***
    //     PAGE: ${page}
    //     ITEMS START: ${sliceStart}
    //     ITEMS END: ${sliceEnd}
    //   ***
    // `);
  }

  const updateCurrentPage = next => {
    const updatedCurrentPage = next ? currentPage + 1 : currentPage - 1

    setCurrentPage(updatedCurrentPage)
    updateCurrentStations(updatedCurrentPage)
  }

  return (
    <div className='App text-slate-800'>
      <main className='container mx-auto py-10 px-5 min-h-screen flex flex-col'>
        <h1 className='text-2xl font-medium'>
          Weather API | Front-End Coding Challenge
        </h1>
        <div className='pt-8 md:pt-12 md:grid md:grid-cols-4 md:gap-4'>
          <Sidebar stations={allStations} />
          <StationsGrid 
            currentStations={currentStations}
            error={error}
          />
        </div>
        {
          totalPages ? 
          <Pagination
            currentPage={currentPage}
            updateCurrentPage={updateCurrentPage}
            totalPages={totalPages}
          /> : null
        }
      </main>
    </div>
  )
}