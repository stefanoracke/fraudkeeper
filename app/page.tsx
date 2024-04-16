"use client"
import TableFK, { ActionI } from "@/src/components/TableFK";
import * as service from "@/src/utils/transformJson";
import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { Code } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setExposureTable, setPolicyTable } from "@/src/redux/features/tables";
import { ActionsExposure, ActionsPolicy } from "@/src/components/ActionsTable/Actions";
import ModalJSON from "@/src/components/Modals/ModalJSON";
import Loading from "@/src/components/Shared/Loading";

const columns = [
  {
    label: "#",
    key: "id"
  },
  {
    label: "Cobertura afectada",
    key: "damageType"
  },
  {
    label: "Fecha Ocurrencia",
    key: "date"
  },
  {
    label: "Motor",
    key: "engine"
  },
  {
    label: "Dominio Chasis/Motor Cobertura",
    key: "domain_chasis_engine",
  },
  {
    label: "Chasis",
    key: "chassis"
  },
  {
    label: "Concepto",
    key: "concept"
  },
  {
    label: "Entidad",
    key: "entity"
  },
  {
    label: "Acciones",
    key: "actions"
  }
]

export default function Home() {
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()
  const { policyTable, exposureTable } = useAppSelector((state) => state.data)
  const [json, setJson] = useState<any>()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
  const sendData = () => {
    const objPolicy = service.returnJson(policyTable)
    const objExposure = service.returnJson(exposureTable)
    const objSend = {
      policyInsured: objPolicy,
      exposurevehicles: [
        objExposure
      ]
    }
    setJson(objSend)
    onOpen()
  }


  useEffect(() => {
    if (!exposureTable.length && !policyTable.length){
      service.getJsonData("/ejemplo.json")
        .then((data: any) => {
          const exposure = service.transformExposure(data.exposurevehicles[0])
          const policy = service.transformPolicy(data.policyInsured)
          dispatch(setPolicyTable([...policy]))
          dispatch(setExposureTable([...exposure]))
          setLoading(false)
        })
        .catch(error => {
          console.error(error);
        });
    }else{
      setLoading(false)
    }
  }, [])

  if(loading){
    return(<Loading/>)
  }

  return (
    <main className="flex flex-col items-center justify-between pt-10">
      <div className="container px-4">
        <div className="w-full py-2 flex flex-wrap justify-end gap-4">
          <Link href={{
            pathname: "/create",
            query: { type: "exposure" }
          }}>
            <button className="border-secondary border-[3px] text-secondary font-bold rounded-full py-2 px-4" >
              Crear Expuesto +
            </button>
          </Link>
          <Link href={{
            pathname: "/create",
            query: { type: "policy" }
          }}>
            <button className="border-secondary border-[3px] text-secondary font-bold rounded-full py-2 px-4" >
              Crear Polizá +
            </button>
          </Link>
          <button className="bg-primary text-white font-bold rounded-full py-2 px-4" onClick={() => { sendData() }}>
            Enviar Data Transformada
          </button>
        </div>
        <div className="py-4">
          <h4 className="pb-4 text-primary font-bold">Vehiculos Expuestos</h4>
          <TableFK key="Tabla1" Actions={ActionsExposure} columns={columns} rows={exposureTable}></TableFK>
        </div>
        <div className="py-4">
          <h4 className="pb-4 text-primary font-bold">Póliza</h4>
          <TableFK key="Tabla2" Actions={ActionsPolicy} columns={columns} rows={policyTable}></TableFK>
        </div>
      </div>
      <ModalJSON isOpen={isOpen} onOpenChange={onOpenChange} json={json}></ModalJSON>
    </main>
  );
}


