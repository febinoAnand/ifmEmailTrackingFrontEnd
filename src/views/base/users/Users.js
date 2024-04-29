import React from 'react'
import { cilTrash, cilFilter, cilMagnifyingGlass } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
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
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'
import CIcon from '@coreui/icons-react';

const Users = () => {
  const navigate = useNavigate();
  
  const handleRowClick = () => {
    navigate("/users/usersubpage");
  };
  
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
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
                <CButton type="button" color="secondary"  id="button-addon2">
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
