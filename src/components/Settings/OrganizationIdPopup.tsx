"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress } from "@nextui-org/react";

interface OrganizationIdPopupProps {
  showLoading?: boolean;
}

export default function OrganizationIdPopup({ showLoading }: OrganizationIdPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [orgId, setOrgId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setIsOpen(Boolean(showLoading));
  }, [showLoading]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setIsOpen(false);
    // TODO: persist orgId via API or local storage if needed.
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {showLoading ? "Client lookup in progress" : "Organization / Corporate ID"}
              </ModalHeader>
              <ModalBody>
                {showLoading ? (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600">
                      Client not found for the current referer. Checking records and loading client data.
                    </p>
                    <Progress isIndeterminate aria-label="Loading client" className="max-w-md" size="sm" />
                  </div>
                ) : (
                  <>
                    <p className="mb-4 text-sm text-slate-600">
                      Please enter your unique organization or corporate ID so Marina can identify your company.
                    </p>
                    <form id="org-id-form" onSubmit={handleSubmit}>
                      <Input
                        fullWidth
                        label="Unique Organization ID"
                        placeholder="e.g. ORG-12345"
                        value={orgId}
                        onChange={(event) => setOrgId(event.target.value)}
                        required
                      />
                    </form>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                {showLoading ? (
                  <Button
                    variant="flat"
                    color="secondary"
                    onPress={() => {
                      setIsOpen(false);
                      onClose();
                    }}
                  >
                    Close
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="flat"
                      color="secondary"
                      onPress={() => {
                        setIsOpen(false);
                        onClose();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" form="org-id-form" disabled={!orgId.trim()}>
                      Save ID
                    </Button>
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {submitted && orgId && (
        <div className="sr-only">Organization ID saved: {orgId}</div>
      )}
    </>
  );
}
