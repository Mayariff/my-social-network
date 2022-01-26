import React from 'react';
import {v1} from "uuid";
import s from "./Pagenator.module.css";

type propsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export const Pagenator = ({totalUsersCount, pageSize,currentPage, onPageChanged}: propsType) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = [];

    for (let i = 1; i < pagesCount; i++) {
        pages.push(i);
    }
    return (<span>
        {pages.map(p => <span key={v1()}
                              className={currentPage === p ? s.selectedPage : ""}
                              onClick={() => {onPageChanged(p)}}>
                        {p} </span>)}

    </span>);
};

