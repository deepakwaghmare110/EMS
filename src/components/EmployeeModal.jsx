// src/components/EmployeeModal.js
import React from 'react';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button/new';
import { useShortlist } from '../context/ShortlistContext';

const EmployeeModal = ({ isOpen, employee, onClose }) => {
  const { addToShortlist } = useShortlist();

  if (!isOpen || !employee) return null;

  const handleShortlist = () => {
    addToShortlist(employee);
    onClose(); 
  };

  return (
    <ModalTransition>
      <Modal onClose={onClose}>
        <ModalHeader>
          <ModalTitle>
            {employee.firstName} {employee.lastName}'s Details
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Phone:</strong> {employee.phone}</p>
          <p><strong>Blood Group:</strong> {employee.bloodGroup}</p>
          <p><strong>Company:</strong> {employee.company?.name}</p>
          <p><strong>Address:</strong> {employee.address?.address}</p>
          <p><strong>University:</strong> {employee.university}</p>
        </ModalBody>
        <ModalFooter>
          <Button appearance="primary" onClick={handleShortlist}>
            Shortlist
          </Button>
          <Button appearance="subtle" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </ModalTransition>
  );
};

export default EmployeeModal;
