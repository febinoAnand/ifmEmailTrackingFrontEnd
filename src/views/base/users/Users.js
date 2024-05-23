<<<<<<< HEAD
import React from 'react'
import { cilTrash, cilFilter, cilMagnifyingGlass } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
=======
import React, { useState, useEffect }  from 'react'
import axios from 'axios';
import { cilMediaSkipForward, cilFilter, cilMagnifyingGlass } from '@coreui/icons';
import { NavLink } from 'react-router-dom'
>>>>>>> current_merge_branch
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
<<<<<<< HEAD
=======
    CNavLink,
>>>>>>> current_merge_branch
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'
import CIcon from '@coreui/icons-react';
<<<<<<< HEAD

const Users = () => {
  const navigate = useNavigate();
  
  const handleRowClick = () => {
    navigate("/users/usersubpage");
  };
  
=======
import BaseURL from 'src/assets/contants/BaseURL';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredusers, setFilteredusers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    fetchUsers();

    return () => clearInterval();
  }, []);

  const fetchUsers = () => {
    axios.get(BaseURL + 'Userauth/unauthuser/')
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

  const handleStatusChange = (mobile_no) => {
  };
  
  const usersToDisplay = filteredusers.length > 0 ? filteredusers : users;

>>>>>>> current_merge_branch
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
<<<<<<< HEAD
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
                <CButton type="button" color="secondary"  id="button-addon2">
=======
                  placeholder="Search by Subject or Message"
                  aria-label="Search"
                  aria-describedby="addon-wrapping"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <CButton type="button" color="secondary" onClick={handleSearch} id="button-addon2">
>>>>>>> current_merge_branch
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
<<<<<<< HEAD
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
=======
                    <CTableHeaderCell scope="col">Device ID</CTableHeaderCell>
>>>>>>> current_merge_branch
                    <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    
                    
                  </CTableRow>
                </CTableHead>
                <CTableBody>
<<<<<<< HEAD
                  <CTableRow  onClick={handleRowClick}>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Anandkumar</CTableDataCell>
                    <CTableDataCell>+91-xxxxxxxxx</CTableDataCell>
                    <CTableDataCell>Richianand1990@gmail.com</CTableDataCell>
                    <CTableDataCell>Manager</CTableDataCell>
                    <CTableDataCell><CFormCheck/></CTableDataCell>
                    <CTableDataCell>
                      <CButton><CIcon icon={cilTrash} /></CButton>
                    </CTableDataCell>
                    
                    
                 
                   
                    
                    
                  </CTableRow>
                  <CTableRow  onClick={handleRowClick}>
                  <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>Kumar</CTableDataCell>
                    <CTableDataCell>+91-xxxxxxxxx</CTableDataCell>
                    <CTableDataCell>Richianand1990@gmail.com</CTableDataCell>
                    <CTableDataCell>Technician</CTableDataCell>
                    <CTableDataCell><CFormCheck/></CTableDataCell>
                    <CTableDataCell>
                      <CButton><CIcon icon={cilTrash} /></CButton>
                    </CTableDataCell>
                    
                  </CTableRow>
                  <CTableRow  onClick={handleRowClick}>
                  <CTableHeaderCell scope="row">3</CTableHeaderCell>
                    <CTableDataCell>Anand</CTableDataCell>
                    <CTableDataCell>+91-xxxxxxxxx</CTableDataCell>
                    <CTableDataCell>Richianand1990@gmail.com</CTableDataCell>
                    <CTableDataCell>CEO</CTableDataCell>
                    <CTableDataCell><CFormCheck/></CTableDataCell>
                    <CTableDataCell>
                      <CButton><CIcon icon={cilTrash} /></CButton>
                    </CTableDataCell>
                   
                    
                  </CTableRow>
                  <CTableRow  onClick={handleRowClick}>
                  <CTableHeaderCell scope="row">4</CTableHeaderCell>
                    <CTableDataCell>Anand</CTableDataCell>
                    <CTableDataCell>+91-xxxxxxxxx</CTableDataCell>
                    <CTableDataCell>Richianand1990@gmail.com</CTableDataCell>
                    <CTableDataCell>CEO</CTableDataCell>
                    <CTableDataCell><CFormCheck/></CTableDataCell>
                    <CTableDataCell>
                      <CButton><CIcon icon={cilTrash} /></CButton>
                    </CTableDataCell>
                   
                    
                  </CTableRow>
                  <CTableRow  onClick={handleRowClick}>
                  <CTableHeaderCell scope="row">5</CTableHeaderCell>
                    <CTableDataCell>Anand</CTableDataCell>
                    <CTableDataCell>+91-xxxxxxxxx</CTableDataCell>
                    <CTableDataCell>Richianand1990@gmail.com</CTableDataCell>
                    <CTableDataCell>CEO</CTableDataCell>
                    <CTableDataCell><CFormCheck/></CTableDataCell>
                    <CTableDataCell>
                      <CButton><CIcon icon={cilTrash} /></CButton>
                    </CTableDataCell>
                   
                    
                  </CTableRow>
                  <CTableRow  onClick={handleRowClick}>
                  <CTableHeaderCell scope="row">6</CTableHeaderCell>
                    <CTableDataCell>Anand</CTableDataCell>
                    <CTableDataCell>+91-xxxxxxxxx</CTableDataCell>
                    <CTableDataCell>Richianand1990@gmail.com</CTableDataCell>
                    <CTableDataCell>CEO</CTableDataCell>
                    <CTableDataCell><CFormCheck /></CTableDataCell>
                    <CTableDataCell>
                      <CButton><CIcon icon={cilTrash} /></CButton>
                    </CTableDataCell>
                   
                    
                  </CTableRow>
                  
=======
                {usersToDisplay.map((user, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{user.device_id}</CTableDataCell>
                    <CTableDataCell>{user.mobile_no}</CTableDataCell>
                    <CTableDataCell>{user.emailaddress}</CTableDataCell>
                    <CTableDataCell>{user.designation}</CTableDataCell>
                    <CTableDataCell>
                        <CFormCheck checked={user.is_existing_user} onChange={() => handleStatusChange(user.id)} />
                    </CTableDataCell>
                    <CTableDataCell>
                    <CButton><CNavLink to={"users/UserSubpage"} component={NavLink}><CIcon icon={cilMediaSkipForward} /></CNavLink></CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
>>>>>>> current_merge_branch
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
