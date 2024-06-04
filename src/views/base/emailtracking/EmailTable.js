import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { cibBuffer, cibEmlakjet, cibStackexchange, cibUnsplash, cilTrash } from '@coreui/icons';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CNav,
  CNavItem,
  CBadge,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTooltip
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import BaseURL from 'src/assets/contants/BaseURL';

const EmailTable = () => {
  const [emails, setEmails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleRowClick = (email) => {
    setSelectedEmail(email);
    setModalVisible(true);
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
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>E-Mail box</strong>
              <CNav>
                <CNavItem className="mx-2 position-relative">
                  <CIcon icon={cibBuffer} />
                  <CBadge color="danger" className="position-absolute top-0 start-100 translate-middle" size="sm">
                    5
                  </CBadge>
                </CNavItem>
                <CNavItem className="mx-2 position-relative">
                  <CIcon icon={cibEmlakjet} />
                  <CBadge color="danger" className="position-absolute top-0 start-100 translate-middle" size="sm">
                    2
                  </CBadge>
                </CNavItem>
                <CNavItem className="mx-2 position-relative">
                  <CIcon icon={cibStackexchange} />
                  <CBadge color="danger" className="position-absolute top-0 start-100 translate-middle" size="sm">
                    7
                  </CBadge>
                </CNavItem>
                <CNavItem className="mx-2 position-relative">
                  <CIcon icon={cibUnsplash} />
                  <CBadge color="danger" className="position-absolute top-0 start-100 translate-middle" size="sm">
                    3
                  </CBadge>
                </CNavItem>
              </CNav>
            </CCardHeader>
            <CCardBody>
              <CCol md={4}>
                <CInputGroup className="flex-nowrap mt-3 mb-4">
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
                  <CTableHead color='dark'>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Sl.No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Subject</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredEmails.map((email, index) => (
                      <CTableRow key={index} onClick={() => handleRowClick(email)} style={{ cursor: 'pointer' }}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email.date}</CTableDataCell>
                        <CTableDataCell>{email.time}</CTableDataCell>
                        <CTableDataCell>{email.subject}</CTableDataCell>
                        <CTooltip placement="top" content="Click to view full Inbox.">
                        <CTableDataCell>{email.message}</CTableDataCell>
                        </CTooltip>
                        <CTableDataCell>
                        <CTooltip content="Delete">
                          <CButton  style={{ fontSize: '10px', padding: '6px 10px' }}>
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CTooltip>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal size='lg' visible={modalVisible} onClose={() => setModalVisible(false)} backdrop="static" keyboard={false}>
        <CModalHeader onClose={() => setModalVisible(false)}>
          <CModalTitle>E-Mail Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedEmail ? (
            <>
              <CRow className="mb-3">
                <CFormLabel htmlFor="fromEmail" className="col-sm-3 col-form-label"><strong>From Email:</strong></CFormLabel>
                <CCol sm={9}>
                  <CFormInput type="text" id="fromEmail" value={selectedEmail.from_email} readOnly plainText/>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="toEmail" className="col-sm-3 col-form-label"><strong>To Email:</strong></CFormLabel>
                <CCol sm={9}>
                  <CFormInput type="text" id="toEmail" value={selectedEmail.to_email} readOnly plainText/>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="subject" className="col-sm-3 col-form-label"><strong>Subject:</strong></CFormLabel>
                <CCol sm={9}>
                  <CFormInput type="text" id="subject" value={selectedEmail.subject} readOnly plainText/>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="datetime" className="col-sm-3 col-form-label"><strong>Date-Time:</strong></CFormLabel>
                <CCol sm={9}>
                  <CFormInput type="text" id="datetime" value={`${selectedEmail.date} - ${selectedEmail.time}`} readOnly plainText/>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="message" className="col-sm-3 col-form-label"><strong>Message:</strong></CFormLabel>
                <CCol sm={9}>
                  <CFormTextarea as="textarea" id="message" value={selectedEmail.message} readOnly rows="15"/>
                </CCol>
              </CRow>
            </>
          ) : (
            <p></p>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmailTable;