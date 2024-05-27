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
    CFormSwitch,
    CFormLabel,
    CForm,
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

    return (
      <>
      <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Trigger</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                            <CRow className="mb-3">
                                    <CFormLabel htmlFor="group" className="col-sm-2 col-form-label">Group</CFormLabel>
                                    <CCol md={6}>
                                        <CFormInput type="text" id="group" name="group" />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">User Name</CFormLabel>
                                    <CCol md={6}>
                                        <CFormInput type="text" id="name" name="name" />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">Email Address</CFormLabel>
                                    <CCol md={6}>
                                        <CFormInput type="text" id="email" name="email" />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                  <CFormLabel htmlFor="mobileno" className="col-sm-2 col-form-label">Mobile Number</CFormLabel>
                                  <CCol md={6}>
                                    <CFormInput type="text" id="mobileno" name="mobileno" />
                                  </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                  <CFormLabel htmlFor="toggle" className="col-sm-2 col-form-label">Login Status</CFormLabel>
                                  <CCol md={6}>
                                    <CFormSwitch defaultChecked/>
                                  </CCol>
                                </CRow>
                                <CRow className="justify-content-center">
                                  <CCol md="auto">
                                    <CButton color="primary">Update</CButton>
                                  </CCol>
                                </CRow>
                      </CForm>
                        </CCardBody>
                    </CCard>

                </CCol>
            </CRow>
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
                />
                <CButton type="button" color="secondary" id="button-addon2">
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
                      <CTableHeaderCell scope="col">Groups</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Monile No</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                      <CTableRow>
                        <CTableHeaderCell scope="row"></CTableHeaderCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell>
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

export default Groups