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

// const ColorPicker = (props) => {
//   return (
//       <ChromePicker
//           color={props.value || false}
//           value={props.value}
//           onChange={ color => {
//               props.onChange(color)
//           }}
//       />
//   )
// }

// const ColorPicker = () => {
//   const [color, setColor] = useState(null);

//   console.log("colorPicker", color);

//   return (
//     <input type="color" value={color} onChange={e => setColor(e.target.value)} />
//   );
// }
class Inbox extends React.Component{



  
 render(){ 
  return (
    <>
     <CRow>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>SEND REPORT</strong>
          </CCardHeader>
          <CCardBody>
            
            
            
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                    <CTableHeaderCell scope="col">User</CTableHeaderCell>
                    <CTableHeaderCell scope="col">User Group</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Delivery Status</CTableHeaderCell>
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
  )
            }
}

export default Inbox