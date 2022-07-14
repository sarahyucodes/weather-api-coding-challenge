import Station from './Station'

export default function StationsGrid({ stations, error }) {
    return (
        <section className='col-span-3'>
            <h2 className='text-lg font-medium pb-4 md:text-xl'>Radar Stations</h2>
            <div className='sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3'>
                {
                    error ? (
                        <div className='col-span-full text-red-600 text-sm md:text-base xl:text-lg'>{error}</div>
                    ) : (
                        stations.map((station, index) => {
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