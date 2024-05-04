import React from 'react';
import axios from 'axios';
import { cilMediaSkipForward, cilFilter, cilMagnifyingGlass } from '@coreui/icons';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
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
  CFormTextarea,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import BaseURL from 'src/assets/contants/BaseURL';

class Parameter extends React.Component {
  

  render() {

    return (
      <>
    
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Search Parameter</strong>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">Alias</CFormLabel>
                    <CCol md={6}>
                      <CFormInput type="text" id="name" name="name" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="user_group" className="col-form-label">Field</CFormLabel>
                    </CCol>
                      <CCol md={6}>
                      <CFormSelect id="user_group" name="user_group" >
                        <option>1</option>
                          <option>2</option>
                      </CFormSelect>
                  </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="user_group" className="col-form-label">Data Types</CFormLabel>
                    </CCol>
                      <CCol md={6}>
                      <CFormSelect id="user_group" name="user_group" >
                        <option>1</option>
                          <option>2</option>
                      </CFormSelect>
                  </CCol>
                  </CRow>
                  <CRow className="justify-content-center">
                  <CCol xs={1}>
                    <div className='d-grid gap-2'>
                        <CButton color="primary" type="submit" >Add</CButton>
                    </div>
                  </CCol>
                  <CCol xs={1}>
                    <div className='d-grid gap-2'>
                        <CButton color="primary" type="button" >Update</CButton>
                    </div>
                  </CCol>
                  <CCol xs={1}>
                    <div className='d-grid gap-2'>
                        <CButton color="primary" type="button" >Delete</CButton>
                    </div>
                  </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
              <CCardBody>
                <CInputGroup className="flex-nowrap mt-3 col-sg-3">
                  <CInputGroupText id="addon-wrapping">
                    <CIcon icon={cilMagnifyingGlass} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="addon-wrapping"
                  />
                  <CButton type="button" color="secondary"  id="button-addon2">
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
                      <CTableHeaderCell scope="col">Alias</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Field</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Data Type</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                      <CTableRow>
                        <CTableHeaderCell scope="row"></CTableHeaderCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell>
                          <CButton><CIcon icon={cilMediaSkipForward} /></CButton>
                        </CTableDataCell>
                      </CTableRow>
                  </CTableBody>
                </CTable>

              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default Parameter;