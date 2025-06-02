import React, { useCallback, useState } from "react";
import { useFetchEmployees } from "../hooks/useFetchEmployees";
import Table, { Cell, HeadCell, Row, TBody, THead } from "@atlaskit/table";
import Button from "@atlaskit/button/new";
import Textfield from "@atlaskit/textfield";
import Pagination from "@atlaskit/pagination";
import Select from "@atlaskit/select";
import EmployeeModal from "../components/EmployeeModal";
import "../css/Home.css";

const Home = () => {
  const { employees, loading } = useFetchEmployees();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");
  const [universityFilter, setUniversityFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const pageSize = 15;

  const openModal = useCallback((employee) => {
    setSelectedEmployee(employee);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedEmployee(null);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!employees || employees.length === 0) return <p>No employees found</p>;

  const filteredEmployees = employees
    .filter((emp) =>
      `${emp.firstName} ${emp.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .filter((emp) => !genderFilter || emp.gender === genderFilter)
    .filter((emp) => !bloodGroupFilter || emp.bloodGroup === bloodGroupFilter)
    .filter((emp) => !universityFilter || emp.university === universityFilter)
    .sort((a, b) => {
      if (!sortKey) return 0;
      if (a[sortKey] < b[sortKey]) return -1;
      if (a[sortKey] > b[sortKey]) return 1;
      return 0;
    });

  const totalPages = Math.ceil(filteredEmployees.length / pageSize);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="home-container">
      <div className="filter-bar">
        <Select
          inputId="sort-by"
          options={[
            { label: "All", value: "" },
            { label: "First Name", value: "firstName" },
            { label: "Last Name", value: "lastName" },
            { label: "Age", value: "age" },
          ]}
          placeholder="Sort by"
          onChange={(e) => setSortKey(e?.value || "")}
        />

        <Select
          inputId="gender-select"
          options={[
            { label: "All", value: "" },
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
          placeholder="Select Gender"
          onChange={(e) => setGenderFilter(e?.value || "")}
        />

        <Select
          inputId="blood-group-select"
          options={[
            { label: "All", value: "" },
            { label: "A+", value: "A+" },
            { label: "B+", value: "B+" },
            { label: "O+", value: "O+" },
          ]}
          placeholder="Select Blood Group"
          onChange={(e) => setBloodGroupFilter(e?.value || "")}
        />

        <Select
          inputId="university-select"
          options={[
            { label: "All", value: "" },
            { label: "Harvard University", value: "Harvard University" },
            { label: "MIT", value: "MIT" },
            { label: "Stanford University", value: "Stanford University" },
          ]}
          placeholder="Select University"
          onChange={(e) => setUniversityFilter(e?.value || "")}
        />

        <Textfield
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Table>
        <THead>
          <HeadCell>First Name</HeadCell>
          <HeadCell>Last Name</HeadCell>
          <HeadCell>Company</HeadCell>
          <HeadCell>Blood Group</HeadCell>
          <HeadCell>Email</HeadCell>
          <HeadCell>Phone</HeadCell>
          <HeadCell>Action</HeadCell>
        </THead>
        <TBody>
          {paginatedEmployees.map((row) => (
            <Row key={row.id}>
              <Cell>{row.firstName}</Cell>
              <Cell>{row.lastName}</Cell>
              <Cell>{row.company?.name}</Cell>
              <Cell>{row.bloodGroup}</Cell>
              <Cell>{row.email}</Cell>
              <Cell>{row.phone}</Cell>
              <Cell>
                <Button appearance="primary" onClick={() => openModal(row)}>
                  Details
                </Button>
              </Cell>
            </Row>
          ))}
        </TBody>
      </Table>

      <div className="pagination-wrapper">
        <Pagination
          nextLabel="Next"
          label="Page"
          pageLabel="Page"
          pages={Array.from({ length: totalPages }, (_, i) => i + 1)}
          onChange={(e, page) => setCurrentPage(page)}
          previousLabel="Previous"
        />
      </div>

      <EmployeeModal
        isOpen={isOpen}
        employee={selectedEmployee}
        onClose={closeModal}
      />
    </div>
  );
};

export default Home;
