import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { Fragment, useState } from "react";

const EditModal = ({ user }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentUser, setCurrentUser] = useState({} as any);
  const name = user?.first_name + " " + user?.last_name;

  return (
    <Fragment>
      <Button
        className="font-medium px-1 py-1"
        color="primary"
        variant="solid"
        size="sm"
        onClick={onOpen}
      >
        Edit
      </Button>
      <Modal backdrop={"blur"} size="xs" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            EDIT ACCOUNT DETAILS
          </ModalHeader>
          <ModalBody className="flex flex-col gap-10 mt-5">
            <Input
              label="Full Name"
              labelPlacement="outside"
              type="text"
              value={name}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, name: e.target.value })
              }
            />
            <Input
              label="Email"
              labelPlacement="outside"
              type="email"
              value={user?.email}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, email: e.target.value })
              }
            />
            <Input
              label="Phone Number"
              labelPlacement="outside"
              type="tel"
              value={user?.phone_number}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, phone_number: e.target.value })
              }
            />
            <Input
              label="Address"
              labelPlacement="outside"
              type="text"
              value={user?.address}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, address: e.target.value })
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default EditModal;
