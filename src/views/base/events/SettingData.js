import React from 'react'
import { cilTrash, cilFilter } from '@coreui/icons';



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

class SettingData extends React.Component{
  
  
  render(){
    return (
      <>
      <CRow>
      

        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Settings</strong>
            </CCardHeader>
            <CCardBody>
            <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="inputGroup-sizing-sm">Host</CInputGroupText>
                <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
            </CInputGroup>
            <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="inputGroup-sizing-sm">Port</CInputGroupText>
                <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
            </CInputGroup>
            <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="inputGroup-sizing-sm">Username</CInputGroupText>
                <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
                <CInputGroupText id="inputGroup-sizing-sm">Password</CInputGroupText>
                <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
            </CInputGroup>
            <fieldset className="row mb-3">
                <legend className="col-form-label col-sm-2 pt-0">Check Status :</legend>
                <CCol sm={10} >
                <CFormCheck type="radio" name="gridRadios" id="gridRadios1" value="option1" label="Enable" defaultChecked/>
                <CFormCheck type="radio" name="gridRadios" id="gridRadios2" value="option2" label="Disable"/>
                </CCol>
            </fieldset>
            <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="inputGroup-sizing-sm">Check Interval</CInputGroupText>
                <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
            </CInputGroup>
            <CRow className="justify-content-center">
                <CCol md="auto">
                    <CButton color="primary">Update</CButton>
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

export default SettingData;
