import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Code } from '@nextui-org/react'

export interface ModalJSONI {
    onOpenChange: any,
    isOpen: boolean,
    json: string,

}

export default function ModalJSON(params: any) {
    const { onOpenChange, isOpen, json } = params
    return (
        <Modal isOpen={isOpen} size="5xl" onOpenChange={onOpenChange}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Json Data</ModalHeader>
                        <ModalBody>
                            <div  style={{ maxHeight: "60vh", overflowY: "scroll" }}>
                                <Code className="w-full">
                                    <p style={{ whiteSpace: "pre" }}>
                                        {JSON.stringify(json, null, 4)}
                                    </p>
                                </Code>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
