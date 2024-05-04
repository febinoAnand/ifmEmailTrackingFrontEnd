import React from 'react';
import axios from 'axios';
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
} from '@coreui/react';
import BaseURL from 'src/assets/contants/BaseURL';

class SendReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: []
        };
    }

    componentDidMount() {
        axios.get(BaseURL+'smsgateway/sendreport/')
            .then(response => {
                this.setState({ reports: response.data });
            })
            .catch(error => {
                console.error('Error fetching reports:', error);
            });
    }

    render() {
        const { reports } = this.state;

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
                                            <CTableHeaderCell scope="col">To Number</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">From Number</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Delivery Status</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {reports.map((report, index) => (
                                            <CTableRow key={index}>
                                                <CTableDataCell>{index + 1}</CTableDataCell>
                                                <CTableDataCell>{report.date}</CTableDataCell>
                                                <CTableDataCell>{report.time}</CTableDataCell>
                                                <CTableDataCell>{report.toNumber}</CTableDataCell>
                                                <CTableDataCell>{report.fromNumber}</CTableDataCell>
                                                <CTableDataCell>{report.message}</CTableDataCell>
                                                <CTableDataCell>{report.deliveryStatus}</CTableDataCell>
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

export default SendReport;