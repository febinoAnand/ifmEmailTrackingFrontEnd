import React from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CNav,
  CNavItem,
} from '@coreui/react';
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import BaseURL from 'src/assets/contants/BaseURL';

class SendReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: [],
      selectedRows: [],
      selectAllChecked: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get(BaseURL + "pushnotification/sendreport/")
      .then(response => {
        this.setState({ rowData: response.data.reverse() });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  handleDelete = (id) => {
    axios.delete(`${BaseURL}pushnotification/sendreport/${id}/`)
      .then(() => {
        this.fetchData();
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  }

  handleCheckboxChange = (event, id) => {
    const { checked } = event.target;
    let { selectedRows } = this.state;

    if (checked && !selectedRows.includes(id)) {
      selectedRows.push(id);
    } else {
      selectedRows = selectedRows.filter(rowId => rowId !== id);
    }

    this.setState({ selectedRows });
  };

  handleSelectAllCheckboxChange = () => {
    const { rowData, selectAllChecked } = this.state;
    const allRowIds = rowData.map(row => row.id);

    if (selectAllChecked) {
      this.setState({ selectedRows: [], selectAllChecked: false });
    } else {
      this.setState({ selectedRows: allRowIds, selectAllChecked: true });
    }
  };

  render() {
    const { rowData, selectedRows, selectAllChecked } = this.state;

    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader  className="d-flex justify-content-between align-items-center">
              <strong>SEND REPORT</strong>
              <CNav>
                <CNavItem className="mx-2 position-relative">
                  <CButton color="primary" className="ml-auto" size='sm' onClick={() => this.handleDelete(selectedRows)}>
                    Delete Selected
                  </CButton>
                </CNavItem>
              </CNav>
            </CCardHeader>
            <CCardBody>
              <CTable striped hover>
                <CTableHead>
                  <CTableRow color="dark">
                    <CTableHeaderCell scope="col">
                      <input
                        type="checkbox"
                        checked={selectAllChecked}
                        onChange={this.handleSelectAllCheckboxChange}
                      />
                    </CTableHeaderCell>
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
                  {rowData.map((row, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={(e) => this.handleCheckboxChange(e, row.id)}
                        />
                      </CTableHeaderCell>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{row.date}</CTableDataCell>
                      <CTableDataCell>{row.time}</CTableDataCell>
                      <CTableDataCell>{row.title}</CTableDataCell>
                      <CTableDataCell>{row.message}</CTableDataCell>
                      <CTableDataCell>{row.send_to_user}</CTableDataCell>
                      <CTableDataCell>{row.users_group}</CTableDataCell>
                      <CTableDataCell>{row.delivery_status}</CTableDataCell>
                      <CTableDataCell>
                        <CButton onClick={() => this.handleDelete(row.id)}>
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    );
  }
}

export default SendReport;