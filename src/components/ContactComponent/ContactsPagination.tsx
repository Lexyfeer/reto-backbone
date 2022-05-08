import React, { useState } from 'react'
import { Pagination } from '@mui/material/';

const ContactsPagination = ({ setPage, pageNumber } : { setPage: any; pageNumber: number }) => {
    const handleChange = (pageNumber: any) => {
        setPage(pageNumber)
        console.log('pagenumber', pageNumber);
        
    }

    return (
        <div className='pagination'>
            <Pagination className='pagination'
                onClick={(e:any) => {
                    handleChange(e.currentTarget);
                    console.log('que trae e: ', e.target.value);
                }}
                variant="outlined"
                color="secondary"
                count={pageNumber} />
        </div>
    )
}

export default ContactsPagination;
