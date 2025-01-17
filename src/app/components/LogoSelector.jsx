import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@heroui/react";
import Image from "next/image";
import Avatar from "./Avatar";
import { avatarsArray } from "./Avatar"; //id, name, image
import { useState } from "react";

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

export default function LogoSelector({ onLogoSelect }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [avatarPath, setAvatarPath] = useState("/images/avatars/placeholder.png");

  return (
    <>
      <Button onPress={onOpen} isIconOnly aria-label="Take a photo" color="warning" variant="faded">
        <LogoIcon className="hover:fill-white rounded-full bg-background border-2 border-solid border-border_color " />
      </Button>

      <Modal
        className="bg-background text-white border-2 border-solid border-border_color  mx-4"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">Select Logo</ModalHeader>
              <ModalBody className="flex flex-wrap flex-row gap-8 justify-center items-center">
                {avatarsArray.map((avatar) => {
                  return (
                    <Tooltip
                      key={avatar.id + 1}
                      content={avatar.name}
                      showArrow={true}
                      closeDelay={500}
                      delay={100}
                      className="px-2 py-1"
                    >
                      <Button
                        className="focus:scale-125 hover:scale-125 duration-500"
                        key={avatar.id}
                        isIconOnly
                        aria-label="Logo button"
                        color="warning"
                        variant="faded"
                        onPress={() => {
                          onLogoSelect(avatar.image);
                        }}
                      >
                        <Avatar key={avatar.id} alt={avatar.name} src={avatar.image} />
                      </Button>
                    </Tooltip>
                  );
                })}
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
