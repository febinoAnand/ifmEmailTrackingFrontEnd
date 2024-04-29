import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { cilTrash, cilFilter, cilMagnifyingGlass } from '@coreui/icons';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import BaseURL from 'src/assets/contants/BaseURL';
import { useNavigate } from 'react-router-dom';

const EmailTable = () => {
  const navigate = useNavigate();
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchEmails();
    const interval = setInterval(fetchEmails, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchEmails = () => {
    axios.get(BaseURL + 'EmailTracking/inbox')
      .then(response => {
        setEmails(response.data);
      })
      .catch(error => {
        console.error('Error fetching emails:', error);
      });
  };

  const handleDelete = (emailId) => {
    axios.delete(BaseURL + 'EmailTracking/inbox')
      .then(response => {
        const updatedEmails = emails.filter(email => email.id !== emailId);
        setEmails(updatedEmails);
        setSuccessMessage('Deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting email:', error);
      });
  };

  const handleSearch = () => {
    const filteredEmails = emails.filter(email =>
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEmails(filteredEmails);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRowClick = (emailId) => {
    navigate(`/emailtracking/emailsubpage/${emailId}`);
  };

  const emailsToDisplay = filteredEmails.length > 0 ? filteredEmails : emails;

  return (
    <>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>E-Mail box</strong>
            </CCardHeader>
            <CCardBody>
              <CInputGroup className="flex-nowrap mt-3 col-sg-3">
                <CInputGroupText id="addon-wrapping"><CIcon icon={cilMagnifyingGlass} /></CInputGroupText>
                <CFormInput
                  placeholder="Search by Subject or Message"
                  aria-label="Search"
                  aria-describedby="addon-wrapping"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <CButton type="button" color="secondary" onClick={handleSearch} id="button-addon2">
                  Search
                </CButton>
                <CButton color="primary">
                  <CIcon icon={cilFilter} />
                </CButton>
              </CInputGroup>
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Subject</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {emailsToDisplay.map((email, index) => (
                    <CTableRow key={index} onClick={() => handleRowClick(email.id)}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{email.date}</CTableDataCell>
                      <CTableDataCell>{email.time}</CTableDataCell>
                      <CTableDataCell>{email.subject}</CTableDataCell>
                      <CTableDataCell>{email.message}</CTableDataCell>
                      <CTableDataCell>
                        <CButton onClick={() => handleDelete(email.id)}><CIcon icon={cilTrash} /></CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default EmailTable;