import React, { Component } from 'react';
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
  // CFormSelect,
  // CForm,
  // CFormLabel,
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
      searchQuery: '',
    };
  }

  async componentDidMount() {
    const responseFields = await axios.get(BaseURL + "emailtracking/parameter/");
    this.setState({ fields: responseFields.data });

    const responseTickets = await axios.get(BaseURL + "emailtracking/ticket/");
    this.setState({ ticketData: responseTickets.data.reverse() });
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  getFilteredData = () => {
    const { ticketData, searchQuery } = this.state;
    return ticketData.filter(ticket =>
      ticket.ticketname.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  render() {
    const { fields } = this.state;
    const filteredData = this.getFilteredData();

    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>TICKETS</strong>
              </CCardHeader>
              <CCardBody>
              <CCol md={4}>
                <CInputGroup className="flex-nowrap mt-3 mb-4">
                  <CFormInput
                    placeholder="Search by Ticket Name"
                    aria-label="Search"
                    aria-describedby="addon-wrapping"
                    value={this.state.searchQuery}
                    onChange={this.handleSearchChange}
                  />
                  <CButton type="button" color="secondary" id="button-addon2">
                    Search
                  </CButton>
                </CInputGroup>
              </CCol>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <CTable striped hover>
                    <CTableHead color='dark'>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date-Time</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Ticket Name</CTableHeaderCell>
                        {fields.map(field => (
                          <CTableHeaderCell scope="col" key={field.field}>
                            {field.field}
                          </CTableHeaderCell>
                        ))}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {filteredData.map((ticket, index) => (
                        <CTableRow key={index}>
                          <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{ticket.date}  {ticket.time}</CTableDataCell>
                          <CTableDataCell>{ticket.ticketname}</CTableDataCell>
                          {fields.map((field, i) => (
                            <CTableDataCell key={i}>{ticket.required_json[field.field]}</CTableDataCell>
                          ))}
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </div>
                <CRow className="justify-content-center mt-4">
                    <CCol xs={1}>
                      <div className='d-grid gap-2'>
                          <CButton color="primary" type="submit" >Download</CButton>
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

export default Ticket;