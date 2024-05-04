import React from 'react'
import axios from 'axios';
import { cilMediaSkipForward, cilFilter, cilMagnifyingGlass } from '@coreui/icons';

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormLabel,
    CFormInput,
    CFormSelect,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react';
import BaseURL from 'src/assets/contants/BaseURL';

class Setting extends React.Component{



  
 render(){ 
  return (
    <>
     <CRow>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>SETTING</strong>
          </CCardHeader>
          <CCardBody>
            
            
            
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">Application ID</CFormLabel>
                    <CCol md={6}>
                      <CFormInput type="text" id="name" name="name" />
                    </CCol>
                  </CRow>
                  <CRow className="justify-content-center">
                  <CCol xs={1}>
                    <div className='d-grid gap-2'>
                        <CButton color="primary" type="submit" >Update</CButton>
                    </div>
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

export default Setting