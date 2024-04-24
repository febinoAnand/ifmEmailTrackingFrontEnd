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

class EmailTable extends React.Component{
  
  
  render(){
    return (
      <>
      <CRow>
      

        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Inbox</strong>
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
                    <CButton color="primary">
                    <CIcon icon={cilFilter} />
                    </CButton>
                </CInputGroup>
                {/* <CButton color='primary'>Search</CButton> */}
                </CCol>
                <CCol className='mb-3'>

                </CCol>
                <CTable>
                    <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Subject</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                    </CTableHead>
                    <CTableBody>
                    <CTableRow>
                        <CTableHeaderCell scope="row">1</CTableHeaderCell>
                        <CTableDataCell>15.04.2024</CTableDataCell>
                        <CTableDataCell>11:34:23</CTableDataCell>
                        <CTableDataCell>Static threshold</CTableDataCell>
                        <CTableDataCell>Ticked type : upper alarm</CTableDataCell>
                        <CTableDataCell>Sent</CTableDataCell>
                        <CTableDataCell><CButton><CIcon icon={cilTrash} /></CButton></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableHeaderCell scope="row">2</CTableHeaderCell>
                        <CTableDataCell>15.04.2024</CTableDataCell>
                        <CTableDataCell>11:34:23</CTableDataCell>
                        <CTableDataCell>Static threshold</CTableDataCell>
                        <CTableDataCell>Ticked type : upper alarm</CTableDataCell>
                        <CTableDataCell>Sent</CTableDataCell>
                        <CTableDataCell><CButton><CIcon icon={cilTrash} /></CButton></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableHeaderCell scope="row">3</CTableHeaderCell>
                        <CTableDataCell>15.04.2024</CTableDataCell>
                        <CTableDataCell>11:34:23</CTableDataCell>
                        <CTableDataCell>Static threshold</CTableDataCell>
                        <CTableDataCell>Ticked type : upper alarm</CTableDataCell>
                        <CTableDataCell>Sent</CTableDataCell>
                        <CTableDataCell><CButton><CIcon icon={cilTrash} /></CButton></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableHeaderCell scope="row">4</CTableHeaderCell>
                        <CTableDataCell>15.04.2024</CTableDataCell>
                        <CTableDataCell>11:34:23</CTableDataCell>
                        <CTableDataCell>Static threshold</CTableDataCell>
                        <CTableDataCell>Ticked type : upper alarm</CTableDataCell>
                        <CTableDataCell>Sent</CTableDataCell>
                        <CTableDataCell><CButton><CIcon icon={cilTrash} /></CButton></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableHeaderCell scope="row">5</CTableHeaderCell>
                        <CTableDataCell>15.04.2024</CTableDataCell>
                        <CTableDataCell>11:34:23</CTableDataCell>
                        <CTableDataCell>Static threshold</CTableDataCell>
                        <CTableDataCell>Ticked type : upper alarm</CTableDataCell>
                        <CTableDataCell>Sent</CTableDataCell>
                        <CTableDataCell><CButton><CIcon icon={cilTrash} /></CButton></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableHeaderCell scope="row">6</CTableHeaderCell>
                        <CTableDataCell>15.04.2024</CTableDataCell>
                        <CTableDataCell>11:34:23</CTableDataCell>
                        <CTableDataCell>Static threshold</CTableDataCell>
                        <CTableDataCell>Ticked type : upper alarm</CTableDataCell>
                        <CTableDataCell>Sent</CTableDataCell>
                        <CTableDataCell><CButton><CIcon icon={cilTrash} /></CButton></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableHeaderCell scope="row">7</CTableHeaderCell>
                        <CTableDataCell>15.04.2024</CTableDataCell>
                        <CTableDataCell>11:34:23</CTableDataCell>
                        <CTableDataCell>Static threshold</CTableDataCell>
                        <CTableDataCell>Ticked type : upper alarm</CTableDataCell>
                        <CTableDataCell>Sent</CTableDataCell>
                        <CTableDataCell><CButton><CIcon icon={cilTrash} /></CButton></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableHeaderCell scope="row">8</CTableHeaderCell>
                        <CTableDataCell>15.04.2024</CTableDataCell>
                        <CTableDataCell>11:34:23</CTableDataCell>
                        <CTableDataCell>Static threshold</CTableDataCell>
                        <CTableDataCell>Ticked type : upper alarm</CTableDataCell>
                        <CTableDataCell>Sent</CTableDataCell>
                        <CTableDataCell><CButton><CIcon icon={cilTrash} /></CButton></CTableDataCell>
                    </CTableRow>
                    </CTableBody>
                    <br />
                    <CRow className="justify-content-center">
                    <CCol md="auto">
                        <CButton color="primary">Download</CButton>
                        </CCol>
                    </CRow>
                </CTable>
            </CCardBody>
          </CCard>
        </CCol>
        
        </CRow>

      </>
    )
  }
}

export default EmailTable;
