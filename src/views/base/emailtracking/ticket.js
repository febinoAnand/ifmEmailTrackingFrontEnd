import React, { Component } from 'react';
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

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      ticketData: [],
    };
  }

  async componentDidMount() {
    const responseFields = await axios.get(BaseURL + "emailtracking/parameter/");
    this.setState({ fields: responseFields.data });

    const responseTickets = await axios.get(BaseURL + "emailtracking/ticket/");
    this.setState({ ticketData: responseTickets.data });
  }

  render() {
    const { fields, ticketData } = this.state;

    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>TICKET TABLE</strong>
              </CCardHeader>
              <CCardBody>
                <CTable striped hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Ticket Name</CTableHeaderCell>
                      {fields.map(field => (
                        <CTableHeaderCell scope="col" key={field.field}>
                          {field.field}
                        </CTableHeaderCell>
                      ))}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {ticketData.map((ticket, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{ticket.date}</CTableDataCell>
                        <CTableDataCell>{ticket.time}</CTableDataCell>
                        <CTableDataCell>{ticket.ticketname}</CTableDataCell>
                        {fields.map((field, i) => (
                          <CTableDataCell key={i}>{ticket.required_json[field.field]}</CTableDataCell>
                        ))}
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default Ticket;