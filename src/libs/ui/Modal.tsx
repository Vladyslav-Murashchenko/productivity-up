import { Modal as ModalH } from "@heroui/react";

type ModalProps = {
  trigger?: React.ReactNode;
  children: React.ReactNode;
  heading: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  size?: "lg";
};

export const Modal = ({
  trigger,
  children,
  heading,
  className,
  footer,
  size = "lg",
}: ModalProps) => {
  return (
    <ModalH>
      {trigger}
      <ModalH.Backdrop>
        <ModalH.Container size={size}>
          <ModalH.Dialog>
            <ModalH.CloseTrigger />
            <ModalH.Header>
              <ModalH.Heading>{heading}</ModalH.Heading>
            </ModalH.Header>
            <ModalH.Body className={className}>{children}</ModalH.Body>
            {footer && <ModalH.Footer>{footer}</ModalH.Footer>}
          </ModalH.Dialog>
        </ModalH.Container>
      </ModalH.Backdrop>
    </ModalH>
  );
};
