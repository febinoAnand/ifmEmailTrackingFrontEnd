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

class Settings extends React.Component {

    render() {

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
                                            <CFormInput type="text" id="host" name="host"/>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel htmlFor="port" className="col-sm-2 col-form-label">Auth-Token</CFormLabel>
                                        <CCol sm={10}>
                                            <CFormInput type="text" id="port" name="port"/>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel htmlFor="username" className="col-sm-2 col-form-label">Number</CFormLabel>
                                        <CCol sm={10}>
                                            <CFormInput type="text" id="username" name="username"/>
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