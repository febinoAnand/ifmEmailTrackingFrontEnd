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
            id: '',
            host: '',
            port: '',
            username: '',
            password: '',
            checkinterval: '',
            checkstatus: false,
            errors: {},
            successMessage: ''
        };
    }

    componentDidMount() {
        this.fetchSettings();
    }

    fetchSettings() {
        axios.get(BaseURL + 'emailtracking/setting/')
            .then(response => {
                const data = response.data[0];
                if (data) {
                    const { id, host, port, username, password, checkinterval, checkstatus } = data;
                    const validCheckInterval = typeof checkinterval !== 'undefined' ? String(checkinterval) : '';

                    this.setState({ 
                        id,
                        host, 
                        port, 
                        username, 
                        password, 
                        checkinterval: validCheckInterval, 
                        checkstatus,
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching settings:', error);
                toast.error('Failed to fetch settings');
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
    
            const { id, host, port, username, password, checkinterval, checkstatus } = this.state;
            const data = {
                id,
                host,
                port: parseInt(port),
                username,
                password,
                checkinterval: checkinterval !== '' ? parseInt(checkinterval) : null,
                checkstatus,
            };
    
            axios.put(`${BaseURL}emailtracking/setting/${id}/`, data)
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

    validate = () => {
        const { host, port, username, password, checkinterval } = this.state;
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
        if (checkinterval !== '' && (isNaN(checkinterval) || checkinterval < 0 || checkinterval > 3600)) {
            errors.checkinterval = 'Check Interval must be a number between 0 to 3600';
        }
    
        return errors;
    };    

    render() {
        const { host, port, username, password, checkinterval, checkstatus, errors, successMessage } = this.state;

        return (
            <>
                {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
                )}
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
                                            checked={checkstatus === true}
                                            onChange={this.handleRadioChange}
                                        />
                                        <CFormCheck
                                            type="radio"
                                            name="checkStatus"
                                            id="gridRadios2"
                                            value="false"
                                            label="Disable"
                                            checked={checkstatus === false}
                                            onChange={this.handleRadioChange}
                                        />
                                        </CCol>
                                    </fieldset>
                                    <CRow className="mb-3">
                                        <CFormLabel htmlFor="checkInterval" className="col-sm-2 col-form-label">Check Interval</CFormLabel>
                                        <CCol sm={10}>
                                            <CFormInput type="text" id="checkInterval" name="checkInterval" value={checkinterval} onChange={this.handleChange} />
                                            {errors.checkinterval && (<div className="text-danger">{errors.checkinterval}</div>)}
                                        </CCol>
                                    </CRow><br />
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