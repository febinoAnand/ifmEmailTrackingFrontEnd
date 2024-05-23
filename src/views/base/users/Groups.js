import React, { useState, useEffect }  from 'react'
import BaseURL from 'src/assets/contants/BaseURL';
import { cilFilter, cilMagnifyingGlass } from '@coreui/icons';

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    // CFormCheck,
    CFormInput,
    CRow,
    CInputGroup,
    CInputGroupText,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import axios from 'axios';


const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [filteredgroups, setFilteredgroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = () => {
    axios.get(BaseURL + 'Userauth/setting/')
      .then(response => {
        console.log(response.data);
        setGroups(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };
  const handleSearch = () => {
    const filteredgroups = groups.filter(group =>
      group.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredgroups(filteredgroups);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const groupsToDisplay = filteredgroups.length > 0 ? filteredgroups : groups || [];

    return (
      <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>USER LIST</strong>
            </CCardHeader>
            <CCardBody>
            <CCol md={12}>
            <CInputGroup className="flex-nowrap mt-3 col-sg-3">
                <CInputGroupText id="addon-wrapping"><CIcon icon={cilMagnifyingGlass}/></CInputGroupText>
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
            </CCol>
            <CCol className='mb-3'>
            </CCol>
                <CTable striped hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Expiry Time</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Resend Interval</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Valid Time</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Call Count</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Wrong Count</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                  {groupsToDisplay.map((group, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{group.all_user_expiry_time}</CTableDataCell>
                        <CTableDataCell>{group.OTP_resend_interval}</CTableDataCell>
                        <CTableDataCell>{group.OTP_valid_time}</CTableDataCell>
                        <CTableDataCell>{group.OTP_call_count}</CTableDataCell>
                        <CTableDataCell>{group.OTP_wrong_count}</CTableDataCell>
                      </CTableRow>
                  ))}
                  </CTableBody>
                </CTable>
                <CRow className="justify-content-center">
                  <CCol md="auto">
                    <CButton color="primary">Download</CButton>
                  </CCol>
                </CRow>
              </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      </>
    )
}

export default Groups