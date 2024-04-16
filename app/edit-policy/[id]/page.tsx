"use client"
import { ClaimDataI } from '@/src/models/ClaimData.interface'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import React, { useEffect, useState } from 'react'
import { Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { setPolicyTable } from '@/src/redux/features/tables';

export default function EditPolicyPage(params: any) {
    const { id } = params.params
    const router = useRouter();
    const { policyTable } = useAppSelector((state) => state.data)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>()
    const [item, setItem] = useState<ClaimDataI | null>(null)
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<any> = (data) => {
        const list = policyTable.map((value) => {
            if (value.id == id) {
                return { id, ...data }
            }
            else {
                return value
            }
        })
        console.log(list)
        dispatch(setPolicyTable(list))
        setTimeout(() => {
            router.push('/');
        }, 1500)
    }


    useEffect(() => {
        const newItem = policyTable.find((el: any) => (el.id == id))
        if (newItem)
            setItem(newItem)
    }, [])
    if (!item) {
        return (
            <div>404 not found</div>
        )
    }
    return (
        <div className='w-full flex justify-center'>
            <div className="container">
                <h4 className="text-2xl font-bold text-primary py-4">Editar Póliza ID: {item.id}</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 md:col-span-2 lg:col-span-1">
                        <Input {...register("damageType")} defaultValue={item.damageType} label="Cobertura afectada" ></Input>
                    </div>
                    <div className="col-span-3 md:col-span-2 lg:col-span-1">
                        <Input {...register("domain_chasis_engine")} defaultValue={item.domain_chasis_engine} label="Dominio Chasis Motor Cobertura" ></Input>
                    </div>
                    <div className="col-span-3 md:col-span-2 lg:col-span-1">
                        <Input {...register("date")} defaultValue={item.date} label="Fecha" ></Input>
                    </div>
                    <div className="col-span-3 md:col-span-2 lg:col-span-1">
                        <Input {...register("engine")} defaultValue={item.engine} label="Motor" ></Input>
                    </div>
                    <div className="col-span-3 md:col-span-2 lg:col-span-1">
                        <Input {...register("chassis")} defaultValue={item.chassis} label="Chasis" ></Input>
                    </div>
                    <div className="col-span-3 md:col-span-2 lg:col-span-1">
                        <Input {...register("concept")} defaultValue={item.concept} label="Concepto" ></Input>
                    </div>
                    <div className="col-span-3 md:col-span-2 lg:col-span-1">
                        <Input {...register("entity")} defaultValue={item.entity} label="Entidad" ></Input>
                    </div>
                    <div className="w-full col-span-3 px-2 flex justify-end">
                        <input className='bg-primary text-white rounded-full px-4 py-2 cursor-pointer' type="submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}
