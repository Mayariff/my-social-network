import React, {useState} from 'react';
import {v1} from "uuid";
import s from "./Pagenator.module.css";
import cn from 'classnames'

type propsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

export const Pagenator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}: propsType) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = [];

    for (let i = 1; i < pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionNumber = portionNumber * portionSize

    let prevDisabledCondition = portionNumber < 2
    let nextDisabledCondition = portionCount < portionNumber

    return (
        <div className={s.paginator}>
            <button onClick={() => setPortionNumber(portionNumber - 1)} onDoubleClick={() => setPortionNumber(1)}
                    className={prevDisabledCondition ? s.buttonDisabled:s.btn} disabled={prevDisabledCondition}> PREV </button>
            {
                pages.filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
                    .map(p => <span key={v1()}
                                   /* className={currentPage === p ? `${s.page} ${s.selectedPage}`: s.page}*/
                                        className={cn({[s.selectedPage]:currentPage === p }, s.page)}
                                    onClick={() => {
                                        onPageChanged(p)
                                    }}>
                        {p} </span>)
            }
            <button onClick={() => setPortionNumber(portionNumber + 1)}
                    className={nextDisabledCondition ? s.buttonDisabled :s.btn } disabled={nextDisabledCondition}> NEXT </button>
        </div>
    );
};

