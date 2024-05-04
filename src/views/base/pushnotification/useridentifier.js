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


class UserIdentifier extends React.Component{



  
 render(){ 
  return (
    <>
     <CRow>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>USER IDENTIFIER</strong>
          </CCardHeader>
          <CCardBody>
            
            
            
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">User Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Noti-Token</CTableHeaderCell>

                    
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
      </CCol>
      
      </CRow>

     </>
  )
  }
}

export default UserIdentifier