import React, { useState, useEffect }  from 'react'
import axios from 'axios';
import { cilMediaSkipForward, cilFilter, cilMagnifyingGlass } from '@coreui/icons';
import { NavLink } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormCheck,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CNavLink,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import BaseURL from 'src/assets/contants/BaseURL';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredusers, setFilteredusers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchUsers = () => {
    axios.get(BaseURL + 'EmailTracking/useremailtracking')
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };
  const handleSearch = () => {
    const filteredusers = users.filter(user =>
      user.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredusers(filteredusers);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const usersToDisplay = filteredusers.length > 0 ? filteredusers : users;

  return (
    <>
     <CRow>
     

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>USER LIST</strong>
          </CCardHeader>
          <CCardBody>
            {/* <p className="text-medium-emphasis small">
              Use <code>hover</code> property to enable a hover state on table rows within a{' '}
              <code>&lt;CTableBody&gt;</code>.
            </p>
             */}


            <CCol md={4}>
            
            
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
              {/* <CButton color='primary'>Search</CButton> */}
              </CCol>
              
              <CCol className='mb-3'>

              </CCol>
            
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    
                    
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                {usersToDisplay.map((user, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{user.user}</CTableDataCell>
                    <CTableDataCell>{user.mobile}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.designation}</CTableDataCell>
                    <CTableDataCell><CFormCheck /></CTableDataCell>
                    <CTableDataCell>
                    <CButton><CNavLink to={"/users/usersubpage"} component={NavLink}><CIcon icon={cilMediaSkipForward} /></CNavLink></CButton>
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
  )
}

export default Users;
