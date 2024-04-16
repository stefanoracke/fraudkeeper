import CreateForm from '@/src/components/Forms/CreateForm'
import React from 'react'

export default function page(params: any) {
    const { type } = params.searchParams
    console.log(params)
    return (
        <CreateForm type={type}></CreateForm>
    )
}
