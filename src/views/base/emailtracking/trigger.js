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
  CFormCheck,
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

class Trigger extends React.Component {
  

  render() {

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
                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">Trigger Name</CFormLabel>
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
                      <CFormLabel htmlFor="user_group" className="col-form-label">User Group</CFormLabel>
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
                      <CFormLabel htmlFor="user_group" className="col-form-label">Notification Message</CFormLabel>
                    </CCol>
                      <CCol md={6}>
                      <CFormSelect id="user_group" name="user_group" multiple value={[]}>
                        <option>1</option>
                          <option>2</option>
                      </CFormSelect>
                  </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="user_group" className="col-form-label">Status</CFormLabel>
                    </CCol>
                      <CCol md={6}>
                      <CFormCheck id="checkboxNoLabel" value="" aria-label="..."/>
                  </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="user_group" className="col-form-label">SMS</CFormLabel>
                    </CCol>
                      <CCol md={6}>
                      <CFormCheck id="checkboxNoLabel" value="" aria-label="..."/>
                  </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="user_group" className="col-form-label">Notify</CFormLabel>
                    </CCol>
                      <CCol md={6}>
                      <CFormCheck id="checkboxNoLabel" value="" aria-label="..."/>
                  </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="user_group" className="col-form-label">Operator</CFormLabel>
                    </CCol>
                      <CCol md={6}>
                      <CFormSelect id="user_group" name="user_group">
                        <option>number</option>
                        <option>greater than</option>
                        <option>less than</option>
                        <option>equals</option>
                        <option>not equals</option>
                      </CFormSelect>
                  </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">Value</CFormLabel>
                    <CCol md={6}>
                      <CFormInput type="text" id="name" name="name" /><br />
                      <CButton color="primary" type="submit" >Add</CButton>
                    </CCol>
                  </CRow>
                </CForm>
                <CCard className="mb-4">
          <CCardHeader>
            <strong>FILTER TABLE</strong>
          </CCardHeader>
          <CCardBody>
            
            
            
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Operation</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Value</CTableHeaderCell>
                    
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                      <CTableRow >
                        <CTableHeaderCell></CTableHeaderCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                      </CTableRow>
                  </CTableBody>
              </CTable>
              
            
          </CCardBody>
        </CCard>
              </CCardBody>
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
            </CCard>
            
      </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>TRIGGER TABLE</strong>
          </CCardHeader>
          <CCardBody>
            
            
            
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Trigger Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Field</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Group</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Notification Message</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                      <CTableRow >
                        <CTableHeaderCell></CTableHeaderCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell>
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

export default Trigger;