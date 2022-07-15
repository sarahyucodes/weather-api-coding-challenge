export default function Pagination({
   currentPage,
   updateCurrentPage,
   totalPages
}) {
   const renderPageToggle = (next, label) => {
      return (
         <button
            aria-label={label}
            className='p-2'
            onClick={() => updateCurrentPage(next)}
         >
            {next ? '>' : '<'}
         </button>
      )
   }

   return (
      <div className='text-right py-4 font-semibold text-sm'>
         {currentPage !== 1 ? renderPageToggle(false, 'previous page') : null}
         <span>Page {currentPage} / {totalPages}</span>
         {currentPage < totalPages ? renderPageToggle(true, 'next page') : ''}
      </div>   )
}