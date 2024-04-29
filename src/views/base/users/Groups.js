import React from 'react'
import BaseURL from 'src/assets/contants/BaseURL';
import { cilTrash, cilFilter, cilMagnifyingGlass } from '@coreui/icons';

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    // CFormCheck,
    CFormInput,
    CFormLabel,
    CFormSelect,
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



class Groups extends React.Component{

  render(){
    return (
      <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>USER LIST</strong>
            </CCardHeader>
            <CCardBody>
            <CRow className="mb-3">
                <CFormLabel htmlFor="GroupName" className="col-sm-2 col-form-label">Group Name</CFormLabel>
                <CCol sm={10}>
                    <CFormInput type="text" id="GroupName" name="GroupName"/>
                </CCol>
            </CRow>
            <CRow className="mb-3">
                <CFormLabel htmlFor="userlist" className="col-sm-2 col-form-label">User List</CFormLabel>
                <CCol sm={10}>
                  <CFormSelect id="userlist" multiple value={[]}>
                      {/*<option>Users 2</option>
                      <option>Users 3</option> */}
                    </CFormSelect> 
                </CCol> 
            </CRow>
            <CRow className="justify-content-center">
                <CCol xs={1}>
                  <div className='d-grid gap-2'>
                    <CButton color="primary" type="submit">Add</CButton>
                  </div>
                </CCol>
                <CCol xs={1}>
                  <div className='d-grid gap-2'>
                    <CButton  color="primary" type="submit">Update</CButton>
                  </div>
                </CCol>
            </CRow>
            </CCardBody>
            <CCardBody>
            <CCol md={12}>
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
            </CCol>
            <CCol className='mb-3'>
            </CCol>
                <CTable striped hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Users</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Count</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                      <CTableRow>
                        <CTableHeaderCell scope="row">1</CTableHeaderCell>
                        <CTableDataCell>Operators</CTableDataCell>
                        <CTableDataCell>ram,ravi,raja,...</CTableDataCell>
                        <CTableDataCell>5</CTableDataCell>
                        <CTableDataCell>
                          <CButton><CIcon icon={cilTrash} /></CButton>
                        </CTableDataCell>
                      </CTableRow>
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
}

export default Groups