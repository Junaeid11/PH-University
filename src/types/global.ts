import { BaseQueryApi } from "@reduxjs/toolkit/query";
import React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TError ={
    data:{
        message: string
        stack: string
        success: boolean
    };
    status: number
}
export type TMeta ={
    total: number
    page: number
    limit: number
    totalPage: number

}


export type TResponse<T> = {
    data?: T,
    error?: TError,
    meta?: TMeta
    success: boolean
    message: string
}
export type TQueryParams = {
    name: string
    value: boolean | React.Key

}

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi