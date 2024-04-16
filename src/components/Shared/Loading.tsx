"use client"
import { CircularProgress } from '@nextui-org/react'
import React from 'react'

export default function Loading() {
    return (
        <div className='min-h-screen h-full w-full flex justify-center items-center' style={{ minHeight: "calc(100vh - 80px)" }}>
            <div
                className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span
                >
            </div>
        </div>
    )
}
