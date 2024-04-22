import React from 'react'


import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CFormLabel,
    CFormSelect,
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

import {
  cilMagnifyingGlass
} from '@coreui/icons'

const Users = () => {
  
  return (
    <>
     <CRow>
     

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Data from HMI</strong>
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
              </CInputGroup>
              {/* <CButton color='primary'>Search</CButton> */}
              </CCol>
              
              <CCol className='mb-3'>

              </CCol>
            
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">User Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                    
                    
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>KKK2938</CTableDataCell>
                    <CTableDataCell>Anandkumar</CTableDataCell>
                    <CTableDataCell>Richianand1990@gmail.com</CTableDataCell>
                    <CTableDataCell>Manager</CTableDataCell>
                    
                    
                 
                   
                    
                    
                  </CTableRow>
                  <CTableRow>
                  <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>AA3948</CTableDataCell>
                    <CTableDataCell>Kumar</CTableDataCell>
                    <CTableDataCell>Richianand1990@gmail.com</CTableDataCell>
                    <CTableDataCell>Technician</CTableDataCell>
                    
                  </CTableRow>
                  <CTableRow>
                  <CTableHeaderCell scope="row">3</CTableHeaderCell>
                    <CTableDataCell>AA34394</CTableDataCell>
                    <CTableDataCell>Anand</CTableDataCell>
                    <CTableDataCell>Richianand1990@gmail.com</CTableDataCell>
                    <CTableDataCell>CEO</CTableDataCell>
                   
                    
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
