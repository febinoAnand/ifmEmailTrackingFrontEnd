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
    visibleUpdate: false,
    visibleAdd: false,
    visibleAddBut: false,
    triggers: [],
    parameterFields: [],
    selectedTrigger: null,
    operator: '',
    value: '',
    logicalOperator: '',
    newlyAddedFilters: [],
  };

  handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const { selectedTrigger } = this.state;

    if (!selectedTrigger) return;

    if (type === 'checkbox') {
      this.setState((prevState) => ({
        selectedTrigger: {
          ...prevState.selectedTrigger,
          [name]: checked,
        },
      }));
    } else {
      const updatedTrigger = { ...selectedTrigger };
      if (name.startsWith('selectedTrigger.parameter_filter_list[0]')) {
        const nestedProperty = name.split('.').slice(2);
        let currentProperty = updatedTrigger.parameter_filter_list[0];
        for (let i = 0; i < nestedProperty.length - 1; i++) {
          currentProperty = currentProperty[nestedProperty[i]];
        }
        currentProperty[nestedProperty[nestedProperty.length - 1]] = value;
      } else {
        const nestedProperties = name.split('.');
        let currentProperty = updatedTrigger;

        for (let i = 0; i < nestedProperties.length - 1; i++) {
          currentProperty = currentProperty[nestedProperties[i]];
        }

        currentProperty[nestedProperties[nestedProperties.length - 1]] = value;
      }

      this.setState({ selectedTrigger: updatedTrigger });
    }
  };

  handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    this.setState((prevState) => ({
      selectedTrigger: {
        ...prevState.selectedTrigger,
        [name]: selectedValues,
      },
    }));
  };

  componentDidMount() {
    this.fetchData();
    this.fetchParameterFields();
  }

  fetchData = async () => {
    try {
      const response = await axios.get(BaseURL + 'emailtracking/trigger/');
      this.setState({ triggers: response.data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchParameterFields = async () => {
    try {
      const response = await axios.get(BaseURL + 'emailtracking/parameter/');
      const parameterFields = response.data.map((field) => field.field);
      this.setState({ parameterFields });
    } catch (error) {
      console.error('Error fetching parameter fields:', error);
    }
  };

  fetchFilters = async (triggerId) => {
    try {
      const response = await axios.get(`${BaseURL}emailtracking/trigger/${triggerId}/`);
      this.setState({ selectedTrigger: response.data });
    } catch (error) {
      console.error('Error fetching trigger data:', error);
    }
  };

  toggleUpdateModal = async (trigger = null) => {
    if (trigger) {
      await this.fetchFilters(trigger.id);
      this.setState({ visibleUpdate: true });
    } else {
      this.setState((prevState) => ({
        visibleUpdate: !prevState.visibleUpdate,
        selectedTrigger: null,
      }));
    }
  };

  toggleAddModal = () => {
    this.setState((prevState) => ({
      visibleAdd: !prevState.visibleAdd,
    }));
  };

  handleUpdateSave = async () => {
    const { selectedTrigger } = this.state;

    if (!selectedTrigger) return;

    const { operator, value, logical_operator } = selectedTrigger.parameter_filter_list[0];

    const newFilter = {
      operator,
      value,
      logical_operator,
      trigger_fields: selectedTrigger.id
    };

    try {
      const response = await fetch(BaseURL + 'emailtracking/filter/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFilter),
      });

      if (!response.ok) {
        throw new Error('Failed to add new filter');
      }

      console.log("New filter added to different server API:", response);
      await this.fetchFilters(selectedTrigger.id);

      console.log("Filters updated successfully.");
    } catch (error) {
      console.error("Error adding new filter to different server API:", error);
    }
  };

  handleUpdateDelete = async (id) => {
    const { selectedTrigger } = this.state;
    
    try {
      const response = await fetch(`${BaseURL}emailtracking/filter/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete the filter: ${errorText}`);
      }
  
      console.log('Filter deleted from different server API:', response);
      await this.fetchFilters(selectedTrigger.id);
  
      console.log('Filters updated successfully.');
    } catch (error) {
      console.error('Error deleting filter from different server API:', error);
    }
  };  

  handleSave = async () => {
    const { selectedTrigger } = this.state;
  
    if (!selectedTrigger) return;
  
    try {
      const response = await axios.put(`${BaseURL}emailtracking/trigger/${selectedTrigger.id}/`, selectedTrigger);
  
      if (response.status === 200) {
        this.setState({ visibleUpdate: false });
        this.fetchData();
      } else {
        console.error('Failed to update trigger:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating trigger:', error);
    }
  };

  render() {
    const { triggers, visibleUpdate, visibleAdd, selectedTrigger, parameterFields } = this.state;

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
                    {triggers.map((trigger, index) => (
                      <CTableRow key={trigger.id} onClick={() => this.toggleUpdateModal(trigger)}>
                        <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{trigger.trigger_name}</CTableDataCell>
                        <CTableDataCell>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '5px 10px',
                              borderRadius: '12px',
                              backgroundColor: trigger.trigger_field.color,
                              color: 'white',
                              fontWeight: 'bold',
                            }}
                          >
                            {trigger.trigger_field.field}
                          </span>
                        </CTableDataCell>
                        <CTableDataCell>{trigger.group_to_send}</CTableDataCell>
                        <CTableDataCell>{trigger.notification_message}</CTableDataCell>
                        <CTableDataCell>
                          <CFormSwitch checked={trigger.trigger_switch} readOnly />
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="d-flex gap-2">
                            <CTooltip content="Edit">
                              <CButton style={{ fontSize: '10px', padding: '6px 10px' }} onClick={() => this.toggleUpdateModal(trigger)}>
                                <CIcon icon={cilPen} />
                              </CButton>
                            </CTooltip>
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
        <CModal
          size="lg"
          visible={visibleUpdate}
          backdrop="static"
          keyboard={false}
          onClose={() => this.toggleUpdateModal()}
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
                <CFormInput
                  type="text"
                  id="trigger_name"
                  name="trigger_name"
                  value={selectedTrigger ? selectedTrigger.trigger_name : ''}
                  onChange={this.handleInputChange}
                />
                </CCol>
                <CCol sm={2}>
                  <CFormLabel htmlFor="user_name" className="col-form-label"><strong>Group User</strong></CFormLabel>
                </CCol>
                <CCol md={4}>
                  <CFormSelect 
                    id="user_to_send" 
                    name="user_to_send" 
                    multiple 
                    value={selectedTrigger ? selectedTrigger.user_to_send : []} 
                    onChange={this.handleMultiSelectChange}
                  >
                    {selectedTrigger?.trigger_field?.group_details?.map(group => (
                      group?.user_list?.map(user => {
                        const isSelected = (selectedTrigger?.user_to_send || []).includes(user.id);
                        if (!isSelected) {
                          return (
                            <option key={user.id} value={user.id}>{user.username}</option>
                          );
                        }
                        return null;
                      })
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol sm={2}>
                  <CFormLabel htmlFor="trigger_field" className="col-form-label"><strong>Field</strong></CFormLabel>
                </CCol>
                <CCol md={10}>
                  <CFormSelect id="trigger_field" name="trigger_field" value={selectedTrigger ? selectedTrigger.trigger_field.field : ''} onChange={this.handleInputChange}>
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
                  <CFormTextarea
                    type="text"
                    id="notification_message"
                    name="notification_message"
                    rows={5}
                    value={selectedTrigger ? selectedTrigger.notification_message : ''}
                    onChange={this.handleInputChange}
                  />
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
                    checked={selectedTrigger ? selectedTrigger.trigger_switch : false}
                    onChange={this.handleInputChange}
                  />
                </CCol>
                <CCol sm={2}>
                  <CFormLabel htmlFor="send_sms" className="col-form-label"><strong>SMS</strong></CFormLabel>
                </CCol>
                <CCol md={2}>
                  <CFormSwitch
                    id="send_sms"
                    name="send_sms"
                    checked={selectedTrigger ? selectedTrigger.send_sms : false}
                    onChange={this.handleInputChange}
                  />
                </CCol>
                <CCol sm={2}>
                  <CFormLabel htmlFor="send_notification" className="col-form-label"><strong>Notify</strong></CFormLabel>
                </CCol>
                <CCol md={2}>
                  <CFormSwitch
                    id="send_notification"
                    name="send_notification"
                    checked={selectedTrigger ? selectedTrigger.send_notification : false}
                    onChange={this.handleInputChange}
                  />
                </CCol>
              </CRow>
            </CForm>
            <CForm>
              <CRow className="mb-3">
                <CCol sm={2}>
                  <CFormLabel htmlFor="operator" className="col-form-label"><strong>Operator</strong></CFormLabel>
                </CCol>
                <CCol md={4}>
                  <CFormSelect
                    id="operator"
                    name="selectedTrigger.parameter_filter_list[0].operator"
                    value={selectedTrigger ? selectedTrigger.parameter_filter_list[0].operator : ''}
                    onChange={this.handleInputChange}
                  >
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
                <CCol sm={2}>
                  <CFormLabel htmlFor="value" className="col-sm-2 col-form-label"><strong>Value</strong></CFormLabel>
                </CCol>
                <CCol md={4}>
                  <CFormInput
                    type="text"
                    id="value"
                    name="selectedTrigger.parameter_filter_list[0].value"
                    value={selectedTrigger ? selectedTrigger.parameter_filter_list[0].value : ''}
                    onChange={this.handleInputChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol sm={2}>
                  <CFormLabel htmlFor="logicalOperator" className="col-form-label"><strong>Logical Operator</strong></CFormLabel>
                </CCol>
                <CCol md={10}>
                  <CFormSelect
                    id="logicalOperator"
                    name="selectedTrigger.parameter_filter_list[0].logical_operator"
                    value={selectedTrigger ? selectedTrigger.parameter_filter_list[0].logical_operator : ''}
                    onChange={this.handleInputChange}
                  >
                    <option></option>
                    <option>AND</option>
                    <option>OR</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="justify-content-center">
                  <CCol xs={1}>
                  <div className='d-grid gap-2'>
                  <CButton className="mt-2" color="primary" onClick={this.handleUpdateSave}>
                    Save
                  </CButton>
                  </div>
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
            {selectedTrigger && selectedTrigger.parameter_filter_list.map((filter, index) => (
                <CTableRow key={index}>
                  <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{filter.logical_operator}</CTableDataCell>
                  <CTableDataCell>{filter.operator}</CTableDataCell>
                  <CTableDataCell>{filter.value}</CTableDataCell>
                  <CTableDataCell>
                    <div className="d-flex gap-2">
                      <CTooltip content="Delete">
                        <CButton style={{ fontSize: '10px', padding: '6px 10px' }} onClick={() => this.handleUpdateDelete(filter.id)}>
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
               <CButton color="primary" type="submit" onClick={this.handleSave}>Save</CButton>
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
                      <CFormInput type="text" id="trigger_name" name="trigger_name"/>
                    </CCol>
                    <CCol sm={2}>
                      <CFormLabel htmlFor="user_to_send" className="col-form-label"><strong>User Group</strong></CFormLabel>
                    </CCol>
                    <CCol md={4}>
                    <CFormSelect id="user_to_send" name="user_to_send" multiple value>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                  <CCol sm={2}>
                    <CFormLabel htmlFor="trigger_field" className="col-form-label"><strong>Field</strong></CFormLabel>
                  </CCol>
                  <CCol md={10}>
                  <CFormSelect id="trigger_field" name="trigger_field">
                      {/* <option value=""></option>
                      {parameterFields.map((field, index) => (
                        <option key={index} value={field}>
                          {field}
                        </option>
                      ))} */}
                    </CFormSelect>
                  </CCol>
                </CRow>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormLabel htmlFor="notification_message" className="col-form-label"><strong>Notification Message</strong></CFormLabel>
                    </CCol>
                    <CCol md={10}>
                      <CFormTextarea type="text" id="notification_message" name="notification_message" rows={5}/>
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
                      />
                    </CCol>
                    <CCol sm={2}>
                      <CFormLabel htmlFor="send_sms" className="col-form-label"><strong>SMS</strong></CFormLabel>
                    </CCol>
                    <CCol md={2}>
                      <CFormSwitch
                        id="send_sms"
                        name="send_sms"
                      />
                    </CCol>
                    <CCol sm={2}>
                      <CFormLabel htmlFor="send_notification" className="col-form-label"><strong>Notify</strong></CFormLabel>
                    </CCol>
                    <CCol md={2}>
                      <CFormSwitch
                        id="send_notification"
                        name="send_notification"
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
                      <CFormSelect id="user_group" name="user_group"  readOnly>
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
                      <CFormInput type="text" id="name" name="name" /><br />
                      {/* <CButton color="primary" type="submit"  onClick={this.handleAddTriggerButtonClick} >Save</CButton> */}
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label"><strong>Logical Operator</strong></CFormLabel>
                    <CCol md={10}>
                      <CFormInput type="text" id="name" name="name" /><br />
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
            {selectedTrigger && selectedTrigger.parameter_filter_list.map((filter, index) => (
                <CTableRow key={index}>
                  <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{filter.logical_operator}</CTableDataCell>
                  <CTableDataCell>{filter.operator}</CTableDataCell>
                  <CTableDataCell>{filter.value}</CTableDataCell>
                  <CTableDataCell>
                    <div className="d-flex gap-2">
                      <CTooltip content="Delete">
                        <CButton style={{ fontSize: '10px', padding: '6px 10px' }} onClick={() => this.handleUpdateDelete(filter.id)}>
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
                      <CButton color="primary" type="submit">Save</CButton>
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