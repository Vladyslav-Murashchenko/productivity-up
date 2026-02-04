import { Button, Modal as ModalH } from "@heroui/react";

type ModalProps = {
  children: React.ReactNode;
  heading: React.ReactNode;
  className?: string;
  submitFormId?: string;
  submitText?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export const FormModal = ({
  children,
  heading,
  className,
  submitFormId,
  submitText = "Save",
  isOpen,
  onOpenChange,
}: ModalProps) => {
  return (
    <ModalH>
      <ModalH.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalH.Container size="lg">
          <ModalH.Dialog className={className}>
            <ModalH.CloseTrigger />
            <ModalH.Header>
              <ModalH.Heading>{heading}</ModalH.Heading>
            </ModalH.Header>
            <ModalH.Body className="overflow-visible py-8 border-y-2 border-separator my-8">
              {children}
            </ModalH.Body>
            <ModalH.Footer className="mt-0">
              <Button variant="secondary" slot="close">
                Cancel
              </Button>
              <Button type="submit" form={submitFormId}>
                {submitText}
              </Button>
            </ModalH.Footer>
          </ModalH.Dialog>
        </ModalH.Container>
      </ModalH.Backdrop>
    </ModalH>
  );
};
