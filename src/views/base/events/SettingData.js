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
            checkStatus: 'true',
            errors: {}
        };
    }

    componentDidMount() {
        this.fetchSettings();
    }

    fetchSettings() {
        axios.get(BaseURL + 'EmailTracking/settings')
            .then(response => {
                const { host, port, username, password, checkInterval } = response.data;
                const validCheckInterval = typeof checkInterval !== 'undefined' ? checkInterval : 0;
                this.setState({ host, port, username, password, checkInterval: validCheckInterval });
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
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (e) => {
      e.preventDefault();
      const errors = this.validate();
      if (Object.keys(errors).length === 0) {
          console.log('Submitting form with data:', this.state);
          axios.put(BaseURL + 'EmailTracking/settings', this.state)
              .then(response => {
                  console.log('Response:', response.data);
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
        const { host, port, username, password, checkInterval } = this.state;
        const errors = {};
        if (!host.trim()) {
            errors.host = 'Host is required';
        } else if (host.length > 200) {
            errors.host = 'Host must be less than 200 characters';
        }
        const portNum = parseInt(port);
        if (!String(port).trim()) {
            errors.port = 'Port is required';
        } else if (isNaN(portNum) || portNum < 0 || portNum > 65535) {
            errors.port = 'Port must be a number between 0 to 65535';
        }
        if (!username.trim()) {
            errors.username = 'Username is required';
        } else if (username.length > 50) {
            errors.username = 'Username must be less than 50 characters';
        }
        if (!password.trim()) {
            errors.password = 'Password is required';
        } else if (password.length > 50) {
            errors.password = 'Password must be less than 50 characters';
        }
        if (checkInterval && (isNaN(checkInterval) || checkInterval < 0 || checkInterval > 3600)) {
            errors.checkInterval = 'Check Interval must be a number between 0 to 3600';
        }

        return errors;
    };

    render() {
        const { host, port, username, password, checkInterval, checkStatus, errors } = this.state;

        return (
            <>
                <CRow>
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Settings</strong>
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
                                        <CCol sm={10} >
                                            <CFormCheck type="radio" name="checkStatus" id="gridRadios1" value="true" label="Enable" checked={checkStatus === 'true'} onChange={this.handleRadioChange} />
                                            <CFormCheck type="radio" name="checkStatus" id="gridRadios2" value="false" label="Disable" checked={checkStatus === 'false'} onChange={this.handleRadioChange} />
                                        </CCol>
                                    </fieldset>
                                    <CRow className="mb-3">
                                        <CFormLabel htmlFor="checkInterval" className="col-sm-2 col-form-label">Check Interval</CFormLabel>
                                        <CCol sm={10}>
                                            <CFormInput type="text" id="checkInterval" name="checkInterval" value={checkInterval} onChange={this.handleChange} />
                                            {errors.checkInterval && (<div className="text-danger">{errors.checkInterval}</div>)}
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

export default SettingData;
