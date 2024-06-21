import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CRow,
} from '@coreui/react';
import BaseURL from 'src/assets/contants/BaseURL';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            sid: '',
            auth_token: ''
        };
    }

    componentDidMount() {
        axios.get(BaseURL+'smsgateway/setting/')
            .then(response => {
                const settings = response.data[0];
                if (settings) {
                    const { id, sid, auth_token } = settings;
                    console.log(settings);
                    this.setState({ id, sid, auth_token });
                } else {
                    console.error('Empty response data.');
                    toast.error('Failed to fetch settings: Empty response data.');
                }
            })
            .catch(error => {
                console.error('Error fetching settings:', error);
                toast.error('Failed to fetch settings.');
            });
    }     

    handleSubmit = (event) => {
        event.preventDefault();
        
        const { id, sid, auth_token } = this.state;
    
        axios.put(`${BaseURL}smsgateway/setting/${id}/`, { sid, auth_token })
            .then(response => {
                console.log(response);
                toast.success('Settings updated successfully!');
            })
            .catch(error => {
                console.error('Error updating settings:', error);
                toast.error('Failed to update settings.');
            });
    }    

    render() {
        const { sid, auth_token } = this.state;

        return (
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Settings</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CForm onSubmit={this.handleSubmit}>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="sid" className="col-sm-2 col-form-label">SID</CFormLabel>
                                    <CCol sm={10}>
                                        <CFormInput type="text" id="sid" name="sid" value={sid} onChange={(e) => this.setState({ sid: e.target.value })} />
                                        <div className="form-text" style={{ fontSize: 12 }}>* Note : SID is required</div>
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="authToken" className="col-sm-2 col-form-label">Auth-Token</CFormLabel>
                                    <CCol sm={10}>
                                        <CFormInput type="text" id="authToken" name="authToken" value={auth_token} onChange={(e) => this.setState({ authToken: e.target.value })} />
                                        <div className="form-text" style={{ fontSize: 12 }}>* Note : Auth Token is required</div>
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
        );
    }
}

export default Settings;