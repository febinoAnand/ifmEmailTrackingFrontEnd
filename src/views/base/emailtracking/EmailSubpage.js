import React, { Component } from 'react';
import axios from 'axios';
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CRow,
    CFormTextarea,
} from '@coreui/react';
import BaseURL from 'src/assets/contants/BaseURL';

class EmailSubpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromEmail: '',
            toEmail: '',
            date: '',
            time: '',
            message: ''
        };
    }

    componentDidMount() {
        const { email } = this.props;

        axios.get(BaseURL + "EmailTracking/inbox?emailid=" + email)
            .then(response => {
                const { fromEmail, toEmail, date, time, message } = response.data;
                this.setState({ fromEmail, toEmail, date, time, message });
            })
            .catch(error => {
                console.error('Error fetching email data:', error);
            });
    }

    render() {
        const { fromEmail, toEmail, date, time, message } = this.state;
        const { onBack } = this.props;

        return (
            <>
                <CRow>
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardBody>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="fromEmail" className="col-sm-2 col-form-label">From :</CFormLabel>
                                    <CCol sm={10}>
                                        <CFormInput type="text" id="fromEmail" value={fromEmail} readOnly />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="toEmail" className="col-sm-2 col-form-label">To :</CFormLabel>
                                    <CCol sm={10}>
                                        <CFormInput type="text" id="toEmail" value={toEmail} readOnly />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="date" className="col-sm-2 col-form-label">Date :</CFormLabel>
                                    <CCol sm={10}>
                                        <CFormInput type="text" id="date" value={date} readOnly />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="time" className="col-sm-2 col-form-label">Time :</CFormLabel>
                                    <CCol sm={10}>
                                        <CFormInput type="text" id="time" value={time} readOnly />
                                    </CCol>
                                </CRow>
                                <CForm>
                                    <CFormTextarea
                                        id="message"
                                        label="Message"
                                        rows={10}
                                        value={message}
                                        readOnly
                                    ></CFormTextarea>
                                </CForm>
                                <br />
                                <CRow className="justify-content-center">
                                    <CCol md="auto">
                                        <CButton color="primary" onClick={onBack}>Back</CButton>
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

export default EmailSubpage;