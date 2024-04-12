import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgressBar = React.memo(({ pageCount, currentPage }: any) => {
    const calculatePercentage = () => {
        if (pageCount && pageCount !== 0) {
            return Math.ceil((currentPage / pageCount) * 100);
        }
        return 0;
    };

    const pageProgress = calculatePercentage();

    return (
        <div className='flex items-center'>
            <span className='text-xs mr-2'>{pageProgress}%</span>
            <div className="flex-start flex h-1 w-20 overflow-hidden rounded-full bg-gray-200 font-sans text-xs font-medium">
                <div className="flex h-full items-center justify-center overflow-hidden break-all rounded-full bg-green-300 text-white" style={{ width: `${pageProgress}%` }} />
            </div>
        </div>
    );
});

export default ProgressBar;
