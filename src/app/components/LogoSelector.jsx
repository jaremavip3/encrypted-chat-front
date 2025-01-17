import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";
import Image from "next/image";

export const LogoIcon = ({ fill = "currentColor", size, height, width, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      fill="#a1a1aa"
      {...props}
    >
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </svg>
  );
};

export default function LogoSelector() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} isIconOnly aria-label="Take a photo" color="warning" variant="faded">
        <LogoIcon className="hover:fill-white rounded-full bg-background border-2 border-solid border-border_color " />
      </Button>

      <Modal
        className="bg-background text-white border-2 border-solid border-border_color"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">Select Logo</ModalHeader>
              <ModalBody className="flex flex-wrap gap-2">
                <Image src="/images/avatars/bear.png" alt="Bear Logo" fill className="object-contain p-2" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
