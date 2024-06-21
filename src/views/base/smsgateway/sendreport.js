import React from 'react';
import axios from 'axios';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormCheck,
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
            reports: [],
            selectedRows: [], // Array to store selected row indices
            selectAllChecked: false, // Whether select all checkbox is checked
        };
    }

    componentDidMount() {
        axios.get(BaseURL + 'smsgateway/sendreport/')
            .then(response => {
                this.setState({ reports: response.data.reverse() });
            })
            .catch(error => {
                console.error('Error fetching reports:', error);
            });
    }

    // Toggle selection of a single row
    toggleRowSelection = index => {
        let { selectedRows } = this.state;
        if (selectedRows.includes(index)) {
            selectedRows = selectedRows.filter(i => i !== index);
        } else {
            selectedRows = [...selectedRows, index];
        }
        this.setState({ selectedRows });
    };

    toggleSelectAll = () => {
        const { reports, selectAllChecked } = this.state;
        if (selectAllChecked) {
            this.setState({ selectedRows: [], selectAllChecked: false });
        } else {
            const allIndexes = reports.map((report, index) => index);
            this.setState({ selectedRows: allIndexes, selectAllChecked: true });
        }
    };

    deleteSelectedRows = () => {
        const { reports, selectedRows } = this.state;
        const remainingReports = reports.filter((report, index) => !selectedRows.includes(index));
        this.setState({ reports: remainingReports, selectedRows: [], selectAllChecked: false });
    };

    render() {
        const { reports, selectedRows, selectAllChecked } = this.state;

        return (
            <>
                <CRow>
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <div className="d-flex justify-content-between align-items-center">
                                    <strong>SEND REPORT</strong>
                                    <CButton color="primary" size='sm' onClick={this.deleteSelectedRows}>
                                        Delete Selected
                                    </CButton>
                                </div>
                            </CCardHeader>
                            <CCardBody>
                                <CTable striped hover>
                                    <CTableHead>
                                        <CTableRow color="dark">
                                            <CTableHeaderCell scope="col">
                                                <CFormCheck
                                                    onChange={this.toggleSelectAll}
                                                    checked={selectAllChecked}
                                                />
                                            </CTableHeaderCell>
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
                                                <CTableDataCell>
                                                    <CFormCheck
                                                        onChange={() => this.toggleRowSelection(index)}
                                                        checked={selectedRows.includes(index)}
                                                    />
                                                </CTableDataCell>
                                                <CTableDataCell>{index + 1}</CTableDataCell>
                                                <CTableDataCell>{report.date}</CTableDataCell>
                                                <CTableDataCell>{report.time}</CTableDataCell>
                                                <CTableDataCell>{report.to_number}</CTableDataCell>
                                                <CTableDataCell>{report.from_number}</CTableDataCell>
                                                <CTableDataCell>{report.message}</CTableDataCell>
                                                <CTableDataCell>
                                                    <span style={{ fontWeight: report.delivery_status ? 'bold' : 'normal', color: report.delivery_status ? 'green' : 'red' }}>
                                                        {report.delivery_status ? 'True' : 'False'}
                                                    </span>
                                                </CTableDataCell>
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