import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { cilMagnifyingGlass } from '@coreui/icons';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CInputGroup,
  // CNavLink,
  CInputGroupText,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
// import { NavLink } from 'react-router-dom'

import CIcon from '@coreui/icons-react';
import BaseURL from 'src/assets/contants/BaseURL';

const EmailTable = () => {
  const [emails, setEmails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await axios.get(BaseURL + "emailtracking/inbox/");
      setEmails(response.data.reverse());
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredEmails = emails.filter((email) =>
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>E-Mail box</strong>
            </CCardHeader>
            <CCardBody>
              <CCol md={4}>
                <CInputGroup className="flex-nowrap mt-3 col-sg-3">
                  <CInputGroupText id="addon-wrapping"><CIcon icon={cilMagnifyingGlass} /></CInputGroupText>
                  <CFormInput
                    placeholder="Search by Subject or Message"
                    aria-label="Search"
                    aria-describedby="addon-wrapping"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <CButton type="button" color="secondary" id="button-addon2">
                    Search
                  </CButton>
                </CInputGroup>
              </CCol>
              <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <CTable striped hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Subject</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                      {/* <CTableHeaderCell scope="col">Action</CTableHeaderCell> */}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredEmails.map((email, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email.date}</CTableDataCell>
                        <CTableDataCell>{email.time}</CTableDataCell>
                        <CTableDataCell>{email.subject}</CTableDataCell>
                        <CTableDataCell>{email.message}</CTableDataCell>
                        {/* <CTableDataCell>
                          <CButton>
                            <CNavLink to={`/emailtracking/emailsubpage/${email.id}`} component={NavLink}>
                              <CIcon icon={cilMediaSkipForward} />
                            </CNavLink>
                          </CButton>
                        </CTableDataCell> */}
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default EmailTable;