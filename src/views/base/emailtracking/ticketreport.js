import React from 'react';
import axios from 'axios';

import {
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
} from '@coreui/react';
import BaseURL from 'src/assets/contants/BaseURL';

class TicketReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
    };
  }

  componentDidMount() {
    this.fetchTickets();
  }

  fetchTickets() {
    axios
      .get(BaseURL + 'emailtracking/ticket/')
      .then((response) => {
        this.setState({ tickets: response.data.reverse() });
      })
      .catch((error) => {
        console.error('Error fetching tickets:', error);
      });
  }

  render() {
    const { tickets } = this.state;

    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>TICKET TABLE</strong>
              </CCardHeader>
              <CCardBody>
                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                  <CTable striped hover>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Ticket Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Extracted json</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Actual json</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {tickets.map((ticket, index) => (
                        <CTableRow key={index}>
                          <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{ticket.ticketname}</CTableDataCell>
                          <CTableDataCell>{ticket.date}</CTableDataCell>
                          <CTableDataCell>{ticket.time}</CTableDataCell>
                          <CTableDataCell>{ticket.inboxMessage}</CTableDataCell>
                          <CTableDataCell>{JSON.stringify(ticket.required_json)}</CTableDataCell>
                          <CTableDataCell>{JSON.stringify(ticket.actual_json)}</CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default TicketReport;