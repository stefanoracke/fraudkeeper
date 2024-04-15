"use client"

import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import ReduxProvider from '../redux/provider';

export default function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ReduxProvider>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </ReduxProvider>
    )
}
