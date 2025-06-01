// src/pages/Shortlisted.js
import React from 'react';
import { useShortlist } from '../context/ShortlistContext';
import Table, { Cell, HeadCell, Row, TBody, THead } from '@atlaskit/table';

const Shortlisted = () => {
  const { shortlisted } = useShortlist();

  return (
    <div>
      <h1>Shortlisted Employees</h1>
      {shortlisted.length === 0 ? (
        <p>No shortlisted employees yet.</p>
      ) : (
        <Table>
          <THead>
            <HeadCell>First Name</HeadCell>
            <HeadCell>Last Name</HeadCell>
            <HeadCell>Company</HeadCell>
            <HeadCell>Email</HeadCell>
            <HeadCell>Phone</HeadCell>
          </THead>
          <TBody>
            {shortlisted.map((emp) => (
              <Row key={emp.id}>
                <Cell>{emp.firstName}</Cell>
                <Cell>{emp.lastName}</Cell>
                <Cell>{emp.company?.name}</Cell>
                <Cell>{emp.email}</Cell>
                <Cell>{emp.phone}</Cell>
              </Row>
            ))}
          </TBody>
        </Table>
      )}
    </div>
  );
};

export default Shortlisted;
