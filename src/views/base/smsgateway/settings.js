import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
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
    CRow,
} from '@coreui/react';
import BaseURL from 'src/assets/contants/BaseURL';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sid: '',
            authToken: '',
            number: '',
        };
    }

    componentDidMount() {
        this.fetchSettings();
    }

    fetchSettings() {
        axios.get(BaseURL + 'smsgateway/setting/')
            .then(response => {
                const { sid, authToken, number } = response.data;
    
                this.setState({ 
                    sid, 
                    authToken, 
                    number
                });
            })
            .catch(error => {
                console.error('Error fetching settings:', error);
            });
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        if (Object.keys(errors).length === 0) {
            console.log('Submitted data:', this.state);

            const {sid, authToken, number } = this.state;
            const data = {
                sid,
                authToken,
                number
            };

            axios.put(BaseURL + 'smsgateway/setting/', data)
            .then(() => {
                this.setState({ successMessage: 'Settings updated successfully', errors: {} });
            })
            .catch(error => {
                console.error('Error updating settings:', error);
                toast.error('Failed to update settings');
            });
        } else {
            this.setState({ errors });
            console.log('Validation errors:', errors);
        }
    };

    render() {
        const { sid, authToken, number } = this.state;

        return (
            <>
                <CRow>
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Settings</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CForm>
                                    <CRow className="mb-3">
                                        <CFormLabel htmlFor="host" className="col-sm-2 col-form-label">SID</CFormLabel>
                                        <CCol sm={10}>
                                            <CFormInput type="text" id="sid" name="sid" value={sid} onChange={this.handleChange} />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel htmlFor="port" className="col-sm-2 col-form-label">Auth-Token</CFormLabel>
                                        <CCol sm={10}>
                                        <CFormInput type="password" id="authtoken" name="authToken" value={authToken} onChange={this.handleChange} />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel htmlFor="username" className="col-sm-2 col-form-label">Number</CFormLabel>
                                        <CCol sm={10}>
                                            <CFormInput type="text" id="username" name="username" value={number} onChange={this.handleChange} />
                                        </CCol>
                                    </CRow>
                                    <CRow className="justify-content-center">
                                        <CCol md="auto">
                                            <CButton color="primary" type="submit">Update</CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </>
        );
    }
}

export default Settings;