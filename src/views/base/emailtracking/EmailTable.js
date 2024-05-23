import React, { useState, useEffect } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import { cilTrash, cilFilter, cilMagnifyingGlass } from '@coreui/icons';
=======
import { cilFilter, cilMagnifyingGlass, cilMediaSkipForward } from '@coreui/icons';
>>>>>>> current_merge_branch
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CInputGroup,
  CNavLink,
  CInputGroupText,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { NavLink } from 'react-router-dom'

import CIcon from '@coreui/icons-react';
import BaseURL from 'src/assets/contants/BaseURL';
<<<<<<< HEAD
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
    navigate("/emailtracking/emailsubpage/?emailid=" + emailId);
  };

  const emailsToDisplay = filteredEmails.length > 0 ? filteredEmails : emails;

  return (
    <>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
=======

const EmailTable = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await axios.get(BaseURL+ "emailtracking/inbox/");
      setEmails(response.data);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  return (
    <>
>>>>>>> current_merge_branch
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
<<<<<<< HEAD
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <CButton type="button" color="secondary" onClick={handleSearch} id="button-addon2">
=======
                />
                <CButton type="button" color="secondary" id="button-addon2">
>>>>>>> current_merge_branch
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
<<<<<<< HEAD
                  {emailsToDisplay.map((email, index) => (
                    <CTableRow key={index}>
                    {/* <CTableRow key={index} onClick={() => handleRowClick(email.id)}> */}
                      <CNavLink to={"/emailtracking/emailsubpage/?emailid=" + email.id} component={NavLink}>
                      
                    
=======
                  {emails.map((email, index) => (
                    <CTableRow key={index}>
>>>>>>> current_merge_branch
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{email.date}</CTableDataCell>
                      <CTableDataCell>{email.time}</CTableDataCell>
                      <CTableDataCell>{email.subject}</CTableDataCell>
                      <CTableDataCell>{email.message}</CTableDataCell>
                      <CTableDataCell>
<<<<<<< HEAD
                        <CButton onClick={() => handleDelete(email.id)}><CIcon icon={cilTrash} /></CButton>
                      </CTableDataCell>
                      </CNavLink>
=======
                        <CButton>
                          <CNavLink to={`/emailtracking/emailsubpage/${email.id}`} component={NavLink}>
                            <CIcon icon={cilMediaSkipForward} />
                          </CNavLink>
                        </CButton>
                      </CTableDataCell>
>>>>>>> current_merge_branch
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