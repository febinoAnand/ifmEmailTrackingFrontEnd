import React from 'react';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CButton,
  CFormInput,
  CInputGroup,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import BaseURL from 'src/assets/contants/BaseURL';

class TicketReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios.get(BaseURL+"emailtracking/report/")
      .then(response => {
        this.setState({
          tickets: response.data,
          loading: false,
        });
      })
      .catch(error => {
        console.error('Error fetching tickets:', error);
        this.setState({ loading: false });
      });
  }

  render() {
    const { tickets, loading } = this.state;

    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong> REPORT</strong>
              </CCardHeader>
              <CCardBody>
                <CCol md={4}>
                  <CInputGroup className="flex-nowrap mt-3 mb-4">
                    <CFormInput
                      placeholder="Search by Ticket Name"
                      aria-label="Search"
                      aria-describedby="addon-wrapping"
                    />
                    <CButton type="button" color="secondary" id="button-addon2">
                      Search
                    </CButton>
                  </CInputGroup>
                </CCol>
                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                  <CTable striped hover>
                    <CTableHead color='dark'>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Sl.No</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Ticket</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Rule Engine</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Actual Value</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Send to User</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {loading ? (
                        <tr>
                          <td colSpan="6" className="text-center">Loading...</td>
                        </tr>
                      ) : (
                        tickets.map((ticket, index) => (
                          <CTableRow key={index}>
                            <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{ticket.date}</CTableDataCell>
                            <CTableDataCell>{ticket.time}</CTableDataCell>
                            <CTableDataCell>{ticket.ticket.ticketname}</CTableDataCell>
                            <CTableDataCell>{ticket.active_trigger.trigger_name}</CTableDataCell>
                            <CTableDataCell>{ticket.actual_value}</CTableDataCell>
                            <CTableDataCell>{ticket.active_trigger.users_to_send.username}</CTableDataCell>
                          </CTableRow>
                        ))
                      )}
                    </CTableBody>
                  </CTable>
                </div>
                <CRow className="justify-content-center mt-4">
                  <CCol xs={1}>
                    <div className='d-grid gap-2'>
                      <CButton color="primary" type="submit">Download</CButton>
                    </div>
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

export default TicketReport;