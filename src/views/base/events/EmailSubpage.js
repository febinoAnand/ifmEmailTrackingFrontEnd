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
    CFormTextarea,
  } from '@coreui/react'

  class EmailSubpage extends React.Component {
  
    render() {
  
      return (
        <>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardBody>
                <CRow className="mb-3">
                <CFormLabel htmlFor="fromEmail" className="col-sm-2 col-form-label">From :</CFormLabel>
                <CCol sm={10}>
                    <CFormInput type="text" id="fromEmail" defaultValue="******@xmail.com" readOnly plainText/>
                </CCol>
                </CRow>
                <CRow className="mb-3">
                <CFormLabel htmlFor="toEmail" className="col-sm-2 col-form-label">To :</CFormLabel>
                <CCol sm={10}>
                    <CFormInput type="text" id="toEmail" defaultValue="********@xmail.com" readOnly plainText/>
                </CCol>
                </CRow>
                <CRow className="mb-3">
                <CFormLabel htmlFor="date" className="col-sm-2 col-form-label">Date :</CFormLabel>
                <CCol sm={10}>
                    <CFormInput type="text" id="date" defaultValue="11-12-2023" readOnly plainText/>
                </CCol>
                </CRow>
                <CRow className="mb-3">
                <CFormLabel htmlFor="time" className="col-sm-2 col-form-label">Time :</CFormLabel>
                <CCol sm={10}>
                    <CFormInput type="text" id="time" defaultValue="11:30 pm" readOnly plainText/>
                </CCol>
                </CRow>
                <CForm>
                <CFormTextarea
                    id="exampleFormControlTextarea1"
                    label="Message"
                    rows={10}
                ></CFormTextarea>
                </CForm>
                <br />
                <CRow className="justify-content-center">
                    <CCol md="auto">
                        <CButton color="primary" type="submit">Back</CButton>
                    </CCol>
                </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </>
      );
    }
  }
  
  export default EmailSubpage;