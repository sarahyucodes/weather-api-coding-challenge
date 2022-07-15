import Station from './Station'

export default function currentStationsGrid({ 
    currentStations,
    error 
}) {
    return (
        <section className='col-span-3'>
            <h2 className='text-lg font-medium pb-4 md:text-xl'>
                Radar Stations
            </h2>
            <div className='sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3'>
                {
                    error || !currentStations.length ? (
                        <div className='col-span-full text-red-600 text-sm md:text-base xl:text-lg'>{error || 'No stations found.'}</div>
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