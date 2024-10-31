import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import React from "react";

export default function ModalCommon({ isOpen, onOpenChange, children }: { isOpen: boolean, onOpenChange: (isOpen: boolean) => void, children: React.ReactNode }) {

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {children}
                </ModalContent>
            </Modal>
        </>
    );
}