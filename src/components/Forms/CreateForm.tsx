"use client"
import { ClaimDataI } from '@/src/models/ClaimData.interface'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import React, { useEffect, useState } from 'react'
import { Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { setExposureTable, setPolicyTable } from '@/src/redux/features/tables';

export default function CreateForm({ type }: { type: string }) {
    const router = useRouter();
    const { exposureTable, policyTable } = useAppSelector((state) => state.data)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>()
    const [item, setItem] = useState<ClaimDataI | null>(null)
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<any> = (data) => {
        const list = type == "exposure" ? exposureTable : policyTable

        if (type === "exposure") {
            dispatch(setExposureTable([...list, { ...data, id: 22 }]))
        } else {
            dispatch(setPolicyTable([...list, { ...data, id: 23 }]))
        }
        setTimeout(() => {
            router.push('/');
        }, 1500)
    }



    return (
        <div className='w-full flex justify-center'>
            <div className="container">
                <h4 className="text-2xl font-bold text-primary py-4">Crear {type === "exposure" ? " Vehiculo Expuesto" : "Póliza"}  </h4>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 md:col-span-2 lg:col-span-1">
                        <Input {...register("damageType")} label="Cobertura afectada" ></Input>
                    </div>
                    {
                        type === "exposure" ?
                            <div className="col-span-3 md:col-span-2 lg:col-span-1">
                                <Input {...register("asegurado")} label="Asegurado" ></Input>
                            </div> :
                            <div className="col-span-3 md:col-span-2 lg:col-span-1">
                                <Input {...register("domain_chasis_engine")} label="Dominio Chasis Motor Cobertura" ></Input>
                            </div>
                    }
                    <div className="col-span-3 md:col-span-2 lg:col-span-1">
                        <Input {...register("date")} label="Fecha" ></Input>
                    </div>
                    <div className="col-span-3 md:col-span-2 lg:col-span-1">
                        <Input {...register("engine")} label="Motor" ></Input>
                    </div>
                    <div className="col-span-3 md:col-span-2 lg:col-span-1">
                        <Input {...register("chassis")} label="Chasis" ></Input>
                    </div>
                    <div className="col-span-3 md:col-span-2 lg:col-span-1">
                        <Input {...register("concept")} label="Concepto" ></Input>
                    </div>
                    <div className="col-span-3 md:col-span-2 lg:col-span-1">
                        <Input {...register("entity")} label="Entidad" ></Input>
                    </div>
                    <div className="w-full col-span-3 px-2 flex justify-end">
                        <input className='bg-primary text-white rounded-full px-4 py-2 cursor-pointer' type="submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}
