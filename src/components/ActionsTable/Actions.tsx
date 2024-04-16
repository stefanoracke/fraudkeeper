"use client"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setExposureTable, setPolicyTable } from "@/src/redux/features/tables";
import { ClaimDataI } from "@/src/models/ClaimData.interface";
import { Tooltip } from "@nextui-org/react";
import EditIcon from "@/src/icons/EditIcon";
import DeleteIcon from "@/src/icons/DeleteIcon";
import Link from "next/link";

const deleteElement = (el: ClaimDataI, rows: ClaimDataI[]) => {
    const filteredArray = rows.filter(obj => obj.id !== el.id);
    return filteredArray;
}


export function ActionsExposure({ item }: { item: any }) {
    const { exposureTable } = useAppSelector((state) => state.data)
    const dispatch = useAppDispatch()

    const dispatchDeleteElement = () => {
        const newArray = deleteElement(item, exposureTable)
        dispatch(setExposureTable(newArray))
    }

    return (
        <div className="relative flex items-center gap-2">
            <Tooltip content="Editar" >
                <Link href={`/edit-exposure/${item.id}`}>
                    <span className={`text-lg text-default-400 cursor-pointer active:opacity-50`}>
                        <EditIcon />
                    </span>
                </Link>
            </Tooltip>
            <Tooltip content="Eliminar" color="primary">
                <span className={`text-lg text-primary cursor-pointer active:opacity-50`} onClick={() => { dispatchDeleteElement() }}>
                    <DeleteIcon />
                </span>
            </Tooltip>
        </div>
    )

}
export function ActionsPolicy({ item }: { item: any }) {
    const { policyTable } = useAppSelector((state) => state.data)
    const dispatch = useAppDispatch()

    const edit = () => {
        console.log(item)
    }

    const dispatchDeleteElement = () => {
        const newArray = deleteElement(item, policyTable)
        dispatch(setPolicyTable(newArray))
    }

    return (
        <div className="relative flex items-center gap-2">

            <Tooltip content="Editar" >
                <Link href={`/edit-policy/${item.id}`}>
                    <span className={`text-lg text-default-400 cursor-pointer active:opacity-50`} >
                        <EditIcon />
                    </span>
                </Link>
            </Tooltip>
            <Tooltip content="Eliminar" color="primary">
                <span className={`text-lg text-primary cursor-pointer active:opacity-50`} onClick={() => { dispatchDeleteElement() }}>
                    <DeleteIcon />
                </span>
            </Tooltip>

        </div>
    )

}