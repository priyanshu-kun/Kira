import React,{useState} from 'react'
import ReactPaginate from "react-paginate"
import { FiMoreHorizontal } from 'react-icons/fi'



function Items({currentItems,handleProject}) {
    return (
        currentItems.map(({ _id, title, tags, projectLead }, index) => {
            return (
                <tr onClick={(e) => handleProject(_id)} key={_id} className="cursor-pointer hover:opacity-80 transition-all">
                    <th className='bg-slate-600/20 project-index opacity-60 text-center text-sm'>{index}</th>
                    <td className='bg-slate-600/20 project-title pl-6'>{title}</td>
                    <td className='bg-slate-600/20'>{
                        tags.map((b, idx) => <span key={idx} className="badge bg-button-main-light text-black mr-1">{b}</span>)
                    }</td>
                    <td className='bg-slate-600/20 text-blue-400 project-lead text-sm'>@{projectLead}</td>
                    <td onClick={(e) => {
                        e.stopPropagation()
                    }} className='bg-slate-600/20 text-center'>
                        <span className='w-12 h-12 flex items-center justify-center rounded-full hover:bg-slate-400/30 transition-all cursor-pointer'><FiMoreHorizontal className='text-2xl' /></span>
                    </td>
                </tr>
            )
        })
    )
}

function PaginateComp({ items,itemsPerPage,handleProject }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} handleProject={handleProject} />
            <ReactPaginate
                breakLabel="..."
                nextLabel='Next'
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel='Prev'
                renderOnZeroPageCount={null}
                className=" text-white/60 mt-6 flex justify-between items-center px-6 py-3 border-2px border-solid border-white/10 bg-black rounded-full absolute max-w-pagenation-comp left-1/2 transform -translate-x-1/2"
                activeLinkClassName="text-button-main-light border border-solid py-2 px-3 bg-button-main-light/10 border-button-main-light/30 rounded-md text-white"
                previousClassName='paginate-buttons hover:text-white mr-4'
                nextClassName=' paginate-buttons hover:text-white ml-4'
                pageClassName='mx-3 hover:text-white'
                disabledClassName='hover:text-white/30 text-white/30 '
            />
        </>
    );
}

export default PaginateComp