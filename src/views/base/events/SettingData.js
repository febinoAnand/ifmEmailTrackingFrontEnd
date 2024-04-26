import React from 'react';
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

class SettingData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            host: '',
            port: '',
            username: '',
            password: '',
            checkInterval: '',
            checkStatus: false,
            sid: '',
            authToken: '',
            phone: '',
            errors: {}
        };
    }

    componentDidMount() {
        this.fetchSettings();
    }

    fetchSettings() {
        axios.get(BaseURL + 'EmailTracking/settings')
            .then(response => {
                const { host, port, username, password, checkInterval, sid, authToken, phone, checkStatus } = response.data;
                const validCheckInterval = typeof checkInterval !== 'undefined' ? String(checkInterval) : '';
                const validCheckStatus = typeof checkStatus !== 'undefined' ? checkStatus : false;
    
                this.setState({ 
                    host, 
                    port, 
                    username, 
                    password, 
                    checkInterval: validCheckInterval, 
                    sid, 
                    authToken, 
                    phone,
                    checkStatus: validCheckStatus
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

    handleRadioChange = (e) => {
        const { name, value } = e.target;
        const newValue = value === 'true';
        this.setState({
            [name]: newValue
        });
    };    
      
    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        if (Object.keys(errors).length === 0) {
            console.log('Submitted data:', this.state);

            const { host, port, username, password, checkInterval, checkStatus, sid, authToken, phone } = this.state;
            const data = {
                host,
                port: parseInt(port),
                username,
                password,
                checkInterval: checkInterval !== '' ? parseInt(checkInterval) : null,
                checkStatus: checkStatus === 'true',
                sid,
                authToken,
                phone
            };

            axios.put(BaseURL + 'EmailTracking/settings', data)
                .then(() => {
                    toast.success('Settings updated successfully');
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

    validate = () => {
        const { host, port, username, password, checkInterval, sid, authToken, phone } = this.state;
        const errors = {};

        if (!host || !host.trim()) {
            errors.host = 'Host is required';
        } else if (host.length > 200) {
            errors.host = 'Host must be less than 200 characters';
        }
        if (!port || !String(port).trim()) {
            errors.port = 'Port is required';
        } else {
            const portNum = parseInt(port);
            if (isNaN(portNum) || portNum < 0 || portNum > 65535) {
                errors.port = 'Port must be a number between 0 to 65535';
            }
        }
        if (!username || !username.trim()) {
            errors.username = 'Username is required';
        } else if (username.length > 50) {
            errors.username = 'Username must be less than 50 characters';
        }
        if (!password || !password.trim()) {
            errors.password = 'Password is required';
        } else if (password.length > 50) {
            errors.password = 'Password must be less than 50 characters';
        }
        if (checkInterval !== '' && (isNaN(checkInterval) || checkInterval < 0 || checkInterval > 3600)) {
            errors.checkInterval = 'Check Interval must be a number between 0 to 3600';
        }
        if (!sid || !sid.trim()) {
            errors.sid = 'SID is required';
        } else if (sid.length > 100) {
            errors.sid = 'SID must be less than 100 characters';
        }
        if (!authToken || !authToken.trim()) {
            errors.authToken = 'Auth Token is required';
        } else if (authToken.length > 100) {
            errors.authToken = 'Auth Token must be less than 100 characters';
        }
        if (!phone || !phone.trim()) {
            errors.phone = 'Phone is required';
        }
    
        return errors;
    };    

    render() {
        const { host, port, username, password, checkInterval, checkStatus, sid, authToken, phone, errors } = this.state;

        return (
            <>
                <CRow>
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>SMTP Settings</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CForm onSubmit={this.handleSubmit}>
                                    <CRow className="mb-3">
                                        <CFormLabel htmlFor="host" className="col-sm-2 col-form-label">Host</CFormLabel>
                                        <CCol sm={10}>
                                            <CFormInput type="text" id="host" name="host" value={host} onChange={this.handleChange} />
                                            {errors.host && <div className="text-danger">{errors.host}</div>}
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel htmlFor="port" className="col-sm-2 col-form-label">Port</CFormLabel>
                                        <CCol sm={10}>
                                            <CFormInput type="text" id="port" name="port" value={port} onChange={this.handleChange} />
                                            {errors.port && <div className="text-danger">{errors.port}</div>}
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel htmlFor="username" className="col-sm-2 col-form-label">Username</CFormLabel>
                                        <CCol sm={10}>
                                            <CFormInput type="text" id="username" name="username" value={username} onChange={this.handleChange} />
                                            {errors.username && <div className="text-danger">{errors.username}</div>}
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel htmlFor="password" className="col-sm-2 col-form-label">Password</CFormLabel>
                                        <CCol sm={10}>
                                            <CFormInput type="password" id="password" name="password" value={password} onChange={this.handleChange} />
                                            {errors.password && <div className="text-danger">{errors.password}</div>}
                                        </CCol>
                                    </CRow>
                                    <fieldset className="row mb-3">
                                        <legend className="col-form-label col-sm-2 pt-0">Check Status</legend>
                                        <CCol sm={10}>
                                        <CFormCheck
                                            type="radio"
                                            name="checkStatus"
                                            id="gridRadios1"
                                            value="true"
                                            label="Enable"
                                            checked={checkStatus === true}
                                            onChange={this.handleRadioChange}
                                        />
                                        <CFormCheck
                                            type="radio"
                                            name="checkStatus"
                                            id="gridRadios2"
                                            value="false"
                                            label="Disable"
                                            checked={checkStatus === false}
                                            onChange={this.handleRadioChange}
                                        />
                                        </CCol>
                                    </fieldset>
                                    <CRow className="mb-3">
                                        <CFormLabel htmlFor="checkInterval" className="col-sm-2 col-form-label">Check Interval</CFormLabel>
                                        <CCol sm={10}>
                                            <CFormInput type="text" id="checkInterval" name="checkInterval" value={checkInterval} onChange={this.handleChange} />
                                            {errors.checkInterval && (<div className="text-danger">{errors.checkInterval}</div>)}
                                        </CCol>
                                    </CRow><br />
                                    <CCardHeader>
                                        <strong>SMS Gateway</strong>
                                    </CCardHeader>
                                    <CCardBody>
                                            <CRow className="mb-3">
                                                <CFormLabel htmlFor="sid" className="col-sm-2 col-form-label">SID</CFormLabel>
                                                <CCol sm={10}>
                                                    <CFormInput type="text" id="sid" name="sid" value={sid} onChange={this.handleChange} />
                                                    {errors.sid && <div className="text-danger">{errors.sid}</div>}
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel htmlFor="authtoken" className="col-sm-2 col-form-label">Auth Token</CFormLabel>
                                                <CCol sm={10}>
                                                    <CFormInput type="password" id="authtoken" name="authToken" value={authToken} onChange={this.handleChange} />
                                                    {errors.authToken && <div className="text-danger">{errors.authToken}</div>}
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel htmlFor="phone" className="col-sm-2 col-form-label">Phone</CFormLabel>
                                                <CCol sm={10}>
                                                    <CFormInput type="text" id="phone" name="phone" value={phone} onChange={this.handleChange} />
                                                    {errors.phone && <div className="text-danger">{errors.phone}</div>}
                                                </CCol>
                                            </CRow>
                                    </CCardBody>
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

export default SettingData;