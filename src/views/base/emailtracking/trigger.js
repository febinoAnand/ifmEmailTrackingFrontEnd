import React from 'react';
import axios from 'axios';
import { cilTrash, cilPen } from '@coreui/icons';
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
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalBody,
  CTooltip,
  CFormSwitch,
  CFormTextarea,
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
    notification_message: '',
    trigger_switch: false,
    send_sms: false,
    send_notification: false,
    parameter_filter_list: [],
    parameterFields: [],
    groups: [],
    visibleUpdate: false,
    visibleAdd: false,
    visibleAddBut: false,
  };

  componentDidMount() {
    this.fetchTriggerData();
    this.fetchParameterFields();
    this.fetchGroups();
    this.fetchColorData();
  }

  fetchColorData = () => {
    axios.get(BaseURL + "emailtracking/parameter/")
      .then(response => {
        this.setState({ color: response.data });
      })
      .catch(error => {
        console.error('Error fetching color data:', error);
      });
  }

  fetchParameterFields = () => {
    axios.get(BaseURL + "emailtracking/parameter/")
      .then(response => {
        this.setState({ parameterFields: response.data.map(item => item.field)}); 
      })
      .catch(error => {
        console.error('Error fetching parameter fields:', error);
      });
  };

  fetchGroups = () => {
    axios.get(BaseURL + "app/groups/")
      .then(response => {
        this.setState({ groups: response.data.map(groups => groups.name)});
      })
      .catch(error => {
        console.error('Error fetching groups:', error);
      });
  };

  fetchTriggerData = () => {
    axios.get(BaseURL+'emailtracking/trigger/')
      .then(response => {
        this.setState({ trigger: response.data.reverse() });
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
        this.toggleAddModalBut();
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
    const { id ,trigger_name, trigger_field, group_to_send, notification_message, trigger_switch, send_sms, send_notification, operator, value } = row;
    console.log(row)
    this.setState({
      id: id,
      trigger_name: trigger_name,
      trigger_field: trigger_field,
      group_to_send: group_to_send,
      notification_message: notification_message,
      trigger_switch: trigger_switch,
      send_sms: send_sms,
      send_notification: send_notification,
      parameter_filter_list:{
        operator: operator,
        value: value,
      }
    });
  };

  getRowDatas = (row) => {
    const { operator, value } = row;
    this.setState({
      operator: operator,
      value: value,
    });
  };

  getMultipleSelect = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);

    this.setState({
      notification_message: selectedOptions.join(', ')
    });
  };

  handleAddTriggerButtonClick = () => {
    const {
      trigger_name,
      trigger_field,
      group_to_send,
      notification_message,
      trigger_switch,
      send_sms,
      send_notification,
      operator,
      value,
      parameter_filter_list,
    } = this.state;
  
    if (!trigger_name) {
      alert('Trigger name must be provided.');
      return;
    }
  
    if (!trigger_field) {
      alert('Field must be selected.');
      return;
    }
  
    if (!group_to_send) {
      alert('User group must be selected.');
      return;
    }
  
    if (!notification_message) {
      alert('Notification message must be provided.');
      return;
    }
  
    const filterData = {
      operator,
      value,
    };
  
    const filterPromise = axios.post(BaseURL + "emailtracking/filter/", filterData);
    const triggerPromise = filterPromise.then((filterResponse) => {
      const newFilterData = filterResponse.data;
      const newTriggerData = {
        trigger_name,
        trigger_field,
        group_to_send,
        notification_message,
        trigger_switch,
        send_sms,
        send_notification,
        parameter_filter_list: [...parameter_filter_list, newFilterData],
      };
      return axios.post(BaseURL + "emailtracking/trigger/", newTriggerData);
    });
    console.log("filter data -->", filterData)
  
    Promise.all([filterPromise, triggerPromise])
      .then(([filterResponse, triggerResponse]) => {
        console.log("Filter data added successfully:", filterResponse.data);
        console.log("Data added successfully:", triggerResponse.data);
        this.toggleAddModal();
        this.setState({ parameter_filter_list: filterResponse.data});
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
      console.log("filter responce :",filterPromise)
  };  

  handleUpdateButtonClick = (e) => {
    e.preventDefault();
  
    const { id, trigger_name, notification_message, group_to_send, trigger_field, send_sms, trigger_switch, send_notification, parameter_filter_list } = this.state;
  
    const updatedData = {
      trigger_name: trigger_name,
      trigger_field: trigger_field,
      group_to_send: group_to_send,
      notification_message: notification_message,
      trigger_switch: trigger_switch,
      send_sms: send_sms,
      send_notification: send_notification,
      parameter_filter_list: parameter_filter_list,
    };
  
    console.log(updatedData);
  
    axios.put(`${BaseURL}emailtracking/trigger/${id}/`, updatedData)
      .then(response => {
        console.log('Data updated successfully:', response.data);
        this.fetchTriggerData();
        this.toggleUpdateModal();
      })
      .catch(error => {
        console.error('Error updating data:', error);
        console.log('Response:', error.response);
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

  toggleUpdateModal = () => {
    this.setState(prevState => ({
      visibleUpdate: !prevState.visibleUpdate,
    }));
  };

  toggleAddModal = () => {
    this.setState(prevState => ({
      visibleAdd: !prevState.visibleAdd,
    }));
  };

  toggleAddModalBut = () => {
    this.setState(prevState => ({
      visibleAddBut: !prevState.visibleAddBut,
    }));
  };

  handleStatusToggle = (id) => {
    const triggerToUpdate = this.state.trigger.find(item => item.id === id);
    const updatedStatus = !triggerToUpdate.trigger_switch;
  
    axios.put(`${BaseURL}emailtracking/trigger/${id}/`, { trigger_switch: updatedStatus })
      .then(response => {
        this.setState(prevState => ({
          trigger: prevState.trigger.map(item => 
            item.id === id ? { ...item, trigger_switch: updatedStatus } : item
          )
        }));
      })
      .catch(error => {
        console.error('Error updating trigger status:', error);
      });
  };

  render() {
    const { trigger, operator, value, trigger_name, notification_message, group_to_send, trigger_field, send_sms, trigger_switch, send_notification, visibleUpdate, visibleAdd, parameterFields, groups  } = this.state;

    return (
      <>
         <CRow>
        <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Rules</strong>
          </CCardHeader>
          <CCardBody>
          <CTooltip content="Add new Rule">
          <CButton type="button" color="primary" className="mb-3" onClick={this.toggleAddModal}>
            Create
          </CButton>
          </CTooltip>
            
            
            
              <CTable striped hover>
                <CTableHead>
                  <CTableRow color="dark">
                    <CTableHeaderCell scope="col">Sl.No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Rule Name</CTableHeaderCell>
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
                        <CTableDataCell>
                          <span style={{
                            display: 'inline-block',
                            padding: '5px 10px',
                            borderRadius: '12px',
                            backgroundColor: row.color,
                            color: 'white',
                            fontWeight: 'bold'
                          }}>
                            {row.trigger_field}
                          </span>
                        </CTableDataCell>
                        <CTableDataCell>{row.group_to_send}</CTableDataCell>
                        <CTableDataCell>{row.notification_message}</CTableDataCell>
                        <CTableDataCell><CFormSwitch
                            checked={row.trigger_switch}
                            onChange={() => this.handleStatusToggle(row.id)}
                          /></CTableDataCell>
                        <CTableDataCell>
                        <div className="d-flex gap-2">
                        <CTooltip content="Edit">
                        <CButton  style={{ fontSize: '10px', padding: '6px 10px' }} onClick={this.toggleUpdateModal} >
                            <CIcon icon={cilPen} />
                         </CButton>
                         </CTooltip>
                         <CTooltip content="Delete">
                          <CButton  style={{ fontSize: '10px', padding: '6px 10px' }} onClick={(e) => { e.stopPropagation(); this.handleDelete(row.id)}}>
                            <CIcon icon={cilTrash} />
                          </CButton>
                          </CTooltip>
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
              </CTable>
            
          </CCardBody>
        </CCard>
      </CCol>
      </CRow>
      <CModal
          size="lg"
          visible={visibleUpdate}
          backdrop="static" 
          keyboard={false}
          onClose={this.toggleUpdateModal}
          aria-labelledby="UpdateModalLabel"
        >
          <CModalHeader>
            <strong>Update Rule Engine</strong>
          </CModalHeader>
          <CModalBody>
                <CForm>
                <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="trigger_name" className="col-form-label"><strong>Rule Name</strong></CFormLabel>
                    </CCol>
                    <CCol md={4}>
                      <CFormInput type="text" id="trigger_name" name="trigger_name" value={trigger_name} onChange={this.handleInputChange} />
                    </CCol>
                    <CCol sm={2}>
                      <CFormLabel htmlFor="group_to_send" className="col-form-label"><strong>User Group</strong></CFormLabel>
                    </CCol>
                    <CCol md={4}>
                      <CFormSelect id="group_to_send" name="group_to_send" value={group_to_send} onChange={this.handleInputChange}>
                        <option value=""></option>
                        {groups.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                  <CCol sm={2}>
                    <CFormLabel htmlFor="trigger_field" className="col-form-label"><strong>Field</strong></CFormLabel>
                  </CCol>
                  <CCol md={10}>
                    <CFormSelect id="trigger_field" name="trigger_field" value={trigger_field} onChange={this.handleInputChange}>
                      <option value=""></option>
                      {parameterFields.map((field, index) => (
                        <option key={index} value={field}>
                          {field}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="notification_message" className="col-form-label"><strong>Notification Message</strong></CFormLabel>
                    </CCol>
                      <CCol md={10}>
                        <CFormTextarea type="text" id="notification_message" name="notification_message" value={notification_message} onChange={this.handleInputChange} rows={5} />
                  </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="trigger_switch" className="col-form-label"><strong>Active Status</strong></CFormLabel>
                    </CCol>
                    <CCol md={2}>
                      <CFormSwitch
                        id="trigger_switch"
                        name="trigger_switch"
                        checked={trigger_switch}
                        onChange={(e) => this.setState({ trigger_switch: e.target.checked })}
                      />
                    </CCol>
                    <CCol sm={2}>
                      <CFormLabel htmlFor="send_sms" className="col-form-label"><strong>SMS</strong></CFormLabel>
                    </CCol>
                    <CCol md={2}>
                      <CFormSwitch
                        id="send_sms"
                        name="send_sms"
                        checked={send_sms}
                        onChange={(e) => this.setState({ send_sms: e.target.checked })}
                      />
                    </CCol>
                    <CCol sm={2}>
                      <CFormLabel htmlFor="send_notification" className="col-form-label"><strong>Notify</strong></CFormLabel>
                    </CCol>
                    <CCol md={2}>
                      <CFormSwitch
                        id="send_notification"
                        name="send_notification"
                        checked={send_notification}
                        onChange={(e) => this.setState({ send_notification: e.target.checked })}
                      />
                    </CCol>
                  </CRow>
                </CForm>
                <CForm>
          <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="user_group" className="col-form-label"><strong>Operator</strong></CFormLabel>
                    </CCol>
                      <CCol md={10}>
                      <CFormSelect id="user_group" name="user_group" value={operator} onChange={this.handleOperatorChange} readOnly>
                        <option></option>
                        <option>greater than</option>
                        <option>greater than or equal</option>
                        <option>less than or equal</option>
                        <option>less than</option>
                        <option>equals</option>
                        <option>not equals</option>
                        <option>is exist</option>
                      </CFormSelect>
                  </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label"><strong>Value</strong></CFormLabel>
                    <CCol md={10}>
                      <CFormInput type="text" id="name" name="name" value={value} onChange={this.handleValueChange}  /><br />
                      <CButton color="primary" type="submit"  onClick={this.handleAddTriggerButtonClick} >Save</CButton>
                    </CCol>
                  </CRow>
                </CForm>
          </CModalBody>
          <CRow>
        <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>FILTERS</strong>
          </CCardHeader>
          <CCardBody>
            
            
              <CTable striped hover>
                <CTableHead>
                  <CTableRow color="dark">
                    <CTableHeaderCell scope="col">Sl.No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">And / Or</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Operation</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Value</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                {trigger.map((row, index) => (
                <CTableRow key={index} onClick={() => this.getRowDatas(row)}>
                <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                <CTableHeaderCell></CTableHeaderCell>
                <CTableDataCell>
                  {row.parameter_filter_list.map((filter, idx) => (
                    <div key={idx}>
                      <span>{filter.operator}</span>
                    </div>
                  ))}
                </CTableDataCell>
                <CTableDataCell>
                  {row.parameter_filter_list.map((filter, idx) => (
                    <div key={idx}>
                      <span style={{
                        display: 'inline-block',
                        padding: '5px 10px',
                        borderRadius: '12px',
                        backgroundColor: filter.color,
                        color: 'white',
                        fontWeight: 'bold'
                      }}>
                        {filter.value}
                      </span>
                    </div>
                  ))}
                </CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex gap-2">
                    <CTooltip content="Delete">
                      <CButton style={{ fontSize: '10px', padding: '6px 10px' }}>
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTooltip>
                  </div>
                </CTableDataCell>
              </CTableRow>
              ))}
                  </CTableBody>
              </CTable>
            
          </CCardBody>
        </CCard>
      </CCol>
      </CRow>
      <CRow className="justify-content-center">
                  <CCol xs={1}>
                    <div className='d-grid gap-2'>
                        <CButton color="primary" type="button" onClick={this.handleUpdateButtonClick} >Save</CButton>
                    </div>
                  </CCol>
                  </CRow>
                  <br />
        </CModal>
        <CModal
          size="lg"
          visible={visibleAdd}
          backdrop="static"
          keyboard={false}
          onClose={this.toggleAddModal}
          aria-labelledby="UpdateModalLabel"
        >
          <CModalHeader>
            <strong>Add Rule Engine</strong>
          </CModalHeader>
          <CModalBody>
                <CForm>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="trigger_name" className="col-form-label"><strong>Rule Name</strong></CFormLabel>
                    </CCol>
                    <CCol md={4}>
                      <CFormInput type="text" id="trigger_name" name="trigger_name" value={trigger_name} onChange={this.handleInputChange} />
                    </CCol>
                    <CCol sm={2}>
                      <CFormLabel htmlFor="group_to_send" className="col-form-label"><strong>User Group</strong></CFormLabel>
                    </CCol>
                    <CCol md={4}>
                    <CFormSelect id="group_to_send" name="group_to_send" value={group_to_send} onChange={this.handleInputChange}>
                        <option value=""></option>
                        {groups.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                  <CCol sm={2}>
                    <CFormLabel htmlFor="trigger_field" className="col-form-label"><strong>Field</strong></CFormLabel>
                  </CCol>
                  <CCol md={10}>
                  <CFormSelect id="trigger_field" name="trigger_field" value={trigger_field} onChange={this.handleInputChange}>
                      <option value=""></option>
                      {parameterFields.map((field, index) => (
                        <option key={index} value={field}>
                          {field}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="notification_message" className="col-form-label"><strong>Notification Message</strong></CFormLabel>
                    </CCol>
                    <CCol md={10}>
                      <CFormTextarea type="text" id="notification_message" name="notification_message" value={notification_message} onChange={this.handleInputChange} rows={5}/>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="trigger_switch" className="col-form-label"><strong>Active Status</strong></CFormLabel>
                    </CCol>
                    <CCol md={2}>
                      <CFormSwitch
                        id="trigger_switch"
                        name="trigger_switch"
                        checked={trigger_switch}
                        onChange={(e) => this.setState({ trigger_switch: e.target.checked })}
                      />
                    </CCol>
                    <CCol sm={2}>
                      <CFormLabel htmlFor="send_sms" className="col-form-label"><strong>SMS</strong></CFormLabel>
                    </CCol>
                    <CCol md={2}>
                      <CFormSwitch
                        id="send_sms"
                        name="send_sms"
                        checked={send_sms}
                        onChange={(e) => this.setState({ send_sms: e.target.checked })}
                      />
                    </CCol>
                    <CCol sm={2}>
                      <CFormLabel htmlFor="send_notification" className="col-form-label"><strong>Notify</strong></CFormLabel>
                    </CCol>
                    <CCol md={2}>
                      <CFormSwitch
                        id="send_notification"
                        name="send_notification"
                        checked={send_notification}
                        onChange={(e) => this.setState({ send_notification: e.target.checked })}
                      />
                    </CCol>
                  </CRow>
                </CForm>
                <CForm>
          <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="user_group" className="col-form-label"><strong>Operator</strong></CFormLabel>
                    </CCol>
                      <CCol md={10}>
                      <CFormSelect id="user_group" name="user_group" value={operator} onChange={this.handleOperatorChange} readOnly>
                        <option></option>
                        <option>greater than</option>
                        <option>greater than or equal</option>
                        <option>less than or equal</option>
                        <option>less than</option>
                        <option>equals</option>
                        <option>not equals</option>
                        <option>is exist</option>
                      </CFormSelect>
                  </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label"><strong>Value</strong></CFormLabel>
                    <CCol md={10}>
                      <CFormInput type="text" id="name" name="name" value={value} onChange={this.handleValueChange}  /><br />
                      <CButton color="primary" type="submit"  onClick={this.handleAddTriggerButtonClick} >Save</CButton>
                    </CCol>
                  </CRow>
                </CForm>
          </CModalBody>
          <CRow>
        <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>FILTERS</strong>
          </CCardHeader>
          <CCardBody>
            
              <CTable striped hover>
                <CTableHead>
                  <CTableRow color="dark">
                    <CTableHeaderCell scope="col">Sl.No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">And / Or</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Operation</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Value</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                {trigger.map((row, index) => (
                <CTableRow key={index} onClick={() => this.getRowDatas(row)}>
                <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                <CTableHeaderCell></CTableHeaderCell>
                <CTableDataCell>
                  {row.parameter_filter_list.map((filter, idx) => (
                    <div key={idx}>
                      <span>{filter.operator}</span>
                    </div>
                  ))}
                </CTableDataCell>
                <CTableDataCell>
                  {row.parameter_filter_list.map((filter, idx) => (
                    <div key={idx}>
                      <span style={{
                        display: 'inline-block',
                        padding: '5px 10px',
                        borderRadius: '12px',
                        backgroundColor: filter.color,
                        color: 'white',
                        fontWeight: 'bold'
                      }}>
                        {filter.value}
                      </span>
                    </div>
                  ))}
                </CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex gap-2">
                    <CTooltip content="Delete">
                      <CButton style={{ fontSize: '10px', padding: '6px 10px' }}>
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTooltip>
                  </div>
                </CTableDataCell>
              </CTableRow>
              ))}
                  </CTableBody>
              </CTable>
            
          </CCardBody>
        </CCard>
      </CCol>
      </CRow>
      <CRow className="justify-content-center">
                  <CCol xs={1}>
                    <div className='d-grid gap-2'>
                      <CButton color="primary" type="submit" onClick={this.handleAddTriggerButtonClick}>Save</CButton>
                    </div>
                  </CCol>
                </CRow>
                <br />
        </CModal>
      </>
    );
  }
}

export default Trigger;