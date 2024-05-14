import React from 'react';
import axios from 'axios';
import { cilTrash } from '@coreui/icons';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CFormCheck,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import BaseURL from 'src/assets/contants/BaseURL';

class Trigger extends React.Component {
  state = {
    filter: [],
    trigger: [],
    id: '',
    operator: '',
    value: '',
    trigger_name: '',
    trigger_field: '',
    group_to_send: '',
    notification_message: [],
    trigger_switch: false,
    send_sms: false,
    send_notification: false,
  };

  componentDidMount() {
    this.fetchFilterData();
    this.fetchTriggerData();
  }

  fetchFilterData = () => {
    axios.get(BaseURL+'emailtracking/filter/')
      .then(response => {
        this.setState({ filter: response.data });
      })
      .catch(error => {
        console.error('Error fetching filter data:', error);
      });
  };

  fetchTriggerData = () => {
    axios.get(BaseURL+'emailtracking/trigger/')
      .then(response => {
        this.setState({ trigger: response.data });
      })
      .catch(error => {
        console.error('Error fetching trigger data:', error);
      });
  };

  handleOperatorChange = (e) => {
    this.setState({ operator: e.target.value });
  };

  handleValueChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleAddButtonClick = () => {
    const { operator, value } = this.state;

    const newData = {
      operator: operator,
      value: value
    };

    axios.post(BaseURL +"emailtracking/filter/", newData)
      .then(response => {
        console.log('Data added successfully:', response.data);
      })
      .catch(error => {
        console.error('Error adding data:', error);
      });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };  

  getRowData = (row) => {
    const { id ,trigger_name, trigger_field, group_to_send, notification_message, trigger_switch, send_sms, send_notification } = row;
    this.setState({
      id: id,
      trigger_name: trigger_name,
      trigger_field: trigger_field,
      group_to_send: group_to_send,
      notification_message: notification_message,
      trigger_switch: trigger_switch,
      send_sms: send_sms,
      send_notification: send_notification,
    });
  };

  getRowDatas = (row) => {
    const { operator , value } = row;
    this.setState({
      operator: operator,
      value: value,
    });
  };

  getMultipleSelect = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);

    this.setState({
      notification_message: selectedOptions
    });
  };

  handleAddTriggerButtonClick = () => {
    const { trigger_name, notification_message, group_to_send, trigger_field, send_sms, trigger_switch, send_notification } = this.state;
  
    const newTriggerData = {
      trigger_name: trigger_name,
      trigger_field: trigger_field,
      group_to_send: group_to_send,
      notification_message: notification_message,
      trigger_switch: trigger_switch,
      send_sms: send_sms,
      send_notification: send_notification,
    };
    
    console.log("Selected data", newTriggerData)

    axios.post(BaseURL +"emailtracking/trigger/", newTriggerData)
      .then(response => {
        console.log(newTriggerData)
        console.log('Data added successfully:', response.data);
      })
      .catch(error => {
        console.error('Error adding data:', error);
      });
  };

  handleUpdateButtonClick = (e) => {
    e.preventDefault();
    
    const { id, trigger_name, notification_message, group_to_send, trigger_field, send_sms, trigger_switch, send_notification } = this.state;
    const { operator, value } = this.state;

    const updatedData = {
      trigger_name: trigger_name,
      trigger_field: trigger_field,
      group_to_send: group_to_send,
      notification_message: notification_message,
      trigger_switch: trigger_switch,
      send_sms: send_sms,
      send_notification: send_notification,
      operator: operator,
      value: value,
    };
  
    axios.put(`${BaseURL}emailtracking/trigger/${id}/`, updatedData)
      .then(response => {
        console.log('Data updated successfully:', response.data);
        this.fetchTriggerData();
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  handleDelete = (id) => {
    axios.delete(`${BaseURL}emailtracking/trigger/${id}/`)
      .then(response => {
        console.log('Trigger deleted successfully');
        this.setState(prevState => ({
          trigger: prevState.trigger.filter(item => item.id !== id)
        }));
      })
      .catch(error => {
        console.error('Error deleting trigger:', error);
      });
  };

  render() {
    const { filter, trigger, operator, value, trigger_name, notification_message, group_to_send, trigger_field, send_sms, trigger_switch, send_notification } = this.state;

    return (
      <>
    
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Trigger</strong>
              </CCardHeader>
              <CCardBody>
                <CForm>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="trigger_name" className="col-sm-2 col-form-label">Trigger Name</CFormLabel>
                  <CCol md={6}>
                    <CFormInput type="text" id="trigger_name" name="trigger_name" value={trigger_name} onChange={this.handleInputChange}/>
                  </CCol>
                </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="user_group" className="col-form-label">Field</CFormLabel>
                    </CCol>
                      <CCol md={6}>
                      <CFormSelect id="trigger_field" name="trigger_field" value={trigger_field} onChange={this.handleInputChange} readOnly>
                        <option value="">Select Field</option>
                        {trigger.map((field, index) => (
                          <option key={index}>
                            {field.trigger_field}
                          </option>
                        ))}
                      </CFormSelect>
                  </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="user_group" className="col-form-label">User Group</CFormLabel>
                    </CCol>
                      <CCol md={6}>
                      <CFormSelect id="group_to_send" name="group_to_send" value={group_to_send} onChange={this.handleInputChange} readOnly>
                        <option value="">Select User Group</option>
                        {trigger.map((group, index) => (
                          <option key={index}>
                            {group.group_to_send}
                          </option>
                        ))}
                      </CFormSelect>
                  </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="user_group" className="col-form-label">Notification Message</CFormLabel>
                    </CCol>
                      <CCol md={6}>
                      <CFormSelect id="notification_message" name="notification_message" multiple value={notification_message} onChange={this.getMultipleSelect} readOnly>
                        {trigger.map((message, index) => (
                          <option key={index}>
                            {message.notification_message}
                          </option>
                        ))}
                      </CFormSelect>
                  </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="user_group" className="col-form-label">Status</CFormLabel>
                    </CCol>
                      <CCol md={6}>
                      <CFormCheck
                        type="checkbox"
                        id="trigger_switch"
                        name="trigger_switch"
                        checked={trigger_switch}
                        onChange={(e) => this.setState({ trigger_switch: e.target.checked })}
                      />
                  </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="user_group" className="col-form-label">SMS</CFormLabel>
                    </CCol>
                      <CCol md={6}>
                      <CFormCheck
                        type="checkbox"
                        id="send_sms"
                        name="send_sms"
                        checked={send_sms}
                        onChange={(e) => this.setState({ send_sms: e.target.checked })}
                      />
                  </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="user_group" className="col-form-label">Notify</CFormLabel>
                    </CCol>
                      <CCol md={6}>
                      <CFormCheck
                        type="checkbox"
                        id="send_notification"
                        name="send_notification"
                        checked={send_notification}
                        onChange={(e) => this.setState({ send_notification: e.target.checked })}
                      />
                  </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="user_group" className="col-form-label">Operator</CFormLabel>
                    </CCol>
                      <CCol md={6}>
                      <CFormSelect id="user_group" name="user_group" value={operator} onChange={this.handleOperatorChange} readOnly>
                        <option></option>
                        <option>greater than</option>
                        <option>less than</option>
                        <option>equals</option>
                        <option>not equals</option>
                      </CFormSelect>
                  </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">Value</CFormLabel>
                    <CCol md={6}>
                      <CFormInput type="text" id="name" name="name" value={value} onChange={this.handleValueChange}  /><br />
                      <CButton color="primary" type="submit"  onClick={this.handleAddButtonClick} >Add</CButton>
                    </CCol>
                  </CRow>
                </CForm>
                <CCard className="mb-4">
          <CCardHeader>
            <strong>FILTER TABLE</strong>
          </CCardHeader>
          <CCardBody>
            
            
            
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Operation</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Value</CTableHeaderCell>
                    
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                    {filter.map((row, index) => (
                      <CTableRow key={index} onClick={() => this.getRowDatas(row)}>
                        <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{row.operator}</CTableDataCell>
                        <CTableDataCell>{row.value}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
              </CTable>
              
              
            
          </CCardBody>
          
        </CCard>
        <CRow className="justify-content-center">
                  <CCol xs={1}>
                    <div className='d-grid gap-2'>
                        <CButton color="primary" type="submit"  onClick={this.handleAddTriggerButtonClick} >Add</CButton>
                    </div>
                  </CCol>
                  <CCol xs={1}>
                    <div className='d-grid gap-2'>
                        <CButton color="primary" type="button" onClick={this.handleUpdateButtonClick} >Update</CButton>
                    </div>
                  </CCol>
                  </CRow>
              </CCardBody>
            </CCard>
            
      </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>TRIGGER TABLE</strong>
          </CCardHeader>
          <CCardBody>
            
            
            
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Trigger Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Field</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Group</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Notification Message</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                    {trigger.map((row, index) => (
                      <CTableRow key={index} onClick={() => this.getRowData(row)}>
                        <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{row.trigger_name}</CTableDataCell>
                        <CTableDataCell>{row.trigger_field}</CTableDataCell>
                        <CTableDataCell>{row.group_to_send}</CTableDataCell>
                        <CTableDataCell>{row.notification_message}</CTableDataCell>
                        <CTableDataCell>{row.trigger_switch}</CTableDataCell>
                        <CTableDataCell>
                          <CButton onClick={(e) => { e.stopPropagation(); this.handleDelete(row.id)}}>
                            <CIcon icon={cilTrash} />
                          </CButton>
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

export default Trigger;