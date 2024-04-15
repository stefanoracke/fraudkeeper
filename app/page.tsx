"use client"
import TableFK, { ActionI } from "@/src/components/TableFK";
import DeleteIcon from "@/src/icons/DeleteIcon";
import EditIcon from "@/src/icons/EditIcon";
import { ClaimDataI } from "@/src/models/ClaimData.interface";
import * as service from "@/src/utils/transformJson";
import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Code } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setExposureTable, setPolicyTable } from "@/src/redux/features/tables";

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
  const dispatch = useAppDispatch()
  const { policyTable, exposureTable } = useAppSelector((state) => state.data)
  const [json, setJson] = useState<string>('')
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const sendData = () => {
    const objPolicy = service.returnJson(policyTable)
    const objExposure = service.returnJson(exposureTable)
    const objSend = {
      policyInsured: objPolicy,
      exposurevehicles: [
        objExposure
      ]
    }
    setJson(JSON.stringify(objSend, null, 4))
    onOpen()
  }
  const actionPolicy: ActionI[] = [
    {
      tooltipText: "Editar",
      icon: <EditIcon />,
      colorClass: "default",
      action: (ev: any) => {
        console.log(ev)
      }
    },
    {
      tooltipText: "Eliminar",
      colorClass: "primary",
      icon: <DeleteIcon />,
      action: (ev: any, rows: any) => {
        dispatch(setPolicyTable(deleteElement(ev, rows)))
      }
    },
  ]
  const actionExposure: ActionI[] = [
    {
      tooltipText: "Editar",
      icon: <EditIcon />,
      colorClass: "default",
      action: (ev: any) => {
        console.log(ev)
      }
    },
    {
      tooltipText: "Eliminar",
      colorClass: "primary",
      icon: <DeleteIcon />,
      action: (ev: any, rows: any) => {
        dispatch(setExposureTable(deleteElement(ev, rows)))
      }
    },
  ]

  const deleteElement = (el: ClaimDataI, rows: ClaimDataI[]) => {
    const filteredArray = exposureTable.filter(obj => obj.id !== el.id);
    return filteredArray;
  }



  useEffect(() => {
    service.getJsonData("/ejemplo.json")
      .then((data: any) => {
        const exposure = service.transformExposure(data.exposurevehicles[0])
        const policy = service.transformPolicy(data.policyInsured)
        dispatch(setPolicyTable([...policy]))
        dispatch(setExposureTable([...exposure]))
      })
      .catch(error => {
        console.error(error);
      });
  }, [])

  return (
    <main className="flex flex-col items-center justify-between pt-10">
      <div className="container px-4">
        <div className="w-full py-2 flex justify-end gap-4">
          <button className="bg-primary text-white font-bold rounded-full py-2 px-4 opacity-50" disabled>
            Crear +
          </button>
          <button className="bg-primary text-white font-bold rounded-full py-2 px-4" onClick={() => { sendData() }}>
            Enviar Data Transformada
          </button>
        </div>
        <div className="py-4">
          <h4 className="pb-4 text-primary font-bold">Vehiculos Expuestos</h4>
            <TableFK actions={actionExposure} columns={columns} rows={exposureTable}></TableFK>
        </div>
        <div className="py-4">
          <h4 className="pb-4 text-primary font-bold">Póliza</h4>
            <TableFK actions={actionPolicy} columns={columns} rows={policyTable}></TableFK>
        </div>
      </div>
      <Modal isOpen={isOpen} size="5xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <div className="max-h-[60vh] overflow-y-scroll">
                  <Code className="w-full">
                    <p className="whitespace-pre">
                      {json}
                    </p>
                  </Code>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}

