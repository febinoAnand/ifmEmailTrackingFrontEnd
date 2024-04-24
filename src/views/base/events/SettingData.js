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
            <CRow className="mb-3">
                <CFormLabel htmlFor="input6" className="col-sm-2 col-form-label">Host</CFormLabel>
                <CCol sm={10} >
                <CFormInput type="text" id="input6"/>
                </CCol>
            </CRow>
            <CRow className="mb-3">
                <CFormLabel htmlFor="input5" className="col-sm-2 col-form-label">Port</CFormLabel>
                <CCol sm={10} >
                <CFormInput type="text" id="input5"/>
                </CCol>
            </CRow>
            <CRow className="mb-3">
                <CFormLabel htmlFor="inputtext" className="col-sm-2 col-form-label">Username</CFormLabel>
                <CCol sm={10} >
                <CFormInput type="text" id="inputtext3"/>
                </CCol>
            </CRow>
            <CRow className="mb-3">
                <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</CFormLabel>
                <CCol sm={10} >
                <CFormInput type="password" id="input4"/>
                </CCol>
            </CRow>
            <fieldset className="row mb-3">
                <legend className="col-form-label col-sm-2 pt-0">Check Status</legend>
                <CCol sm={10} >
                <CFormCheck type="radio" name="gridRadios" id="gridRadios1" value="option1" label="Enable" defaultChecked/>
                <CFormCheck type="radio" name="gridRadios" id="gridRadios2" value="option2" label="Disable"/>
                </CCol>
            </fieldset>
            <CRow className="mb-3">
                <CFormLabel htmlFor="input3" className="col-sm-2 col-form-label">Check Interval</CFormLabel>
                <CCol sm={10} >
                <CFormInput type="text" id="input3"/>
                </CCol>
            </CRow>
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
