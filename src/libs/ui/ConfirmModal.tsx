import { Button, Modal } from "@heroui/react";

type ConfirmModalProps = {
  children: React.ReactNode;
  className?: string;
  heading: React.ReactNode;
  body: React.ReactNode;
  confirmText: string;
  onConfirm: () => void;
};

export const ConfirmModal = ({
  className,
  heading,
  body,
  children,
  confirmText,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <Modal>
      {children}
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className={className}>
            <Modal.CloseTrigger />
            <Modal.Header className="flex-row items-center">
              <Modal.Heading>{heading}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" slot="close">
                Cancel
              </Button>
              <Button variant="danger" onClick={onConfirm} slot="close">
                {confirmText}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
