import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  CContainer,
  CHeader,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CBadge,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownHeader
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBell, cilMenu } from '@coreui/icons';

import { AppBreadcrumb } from './index';
import { AppHeaderDropdown } from './header/index';
import BaseURL from 'src/assets/contants/BaseURL';

const AppHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(`${BaseURL}pushnotification/sendreport/?date=${today}`);
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        const okNotifications = data.filter(notification => (
          notification.delivery_status === "200 - OK" &&
          notification.date === today
        ));
        setNotifications(okNotifications);
        setNotificationCount(okNotifications.length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  const truncateMessage = (message, charLimit) => {
    if (message.length > charLimit) {
      return message.substring(0, charLimit) + '...';
    }
    return message;
  };

  const handleNotificationClick = (ticketId) => {
    navigate(`/emailtracking/ticketreport`);
  };

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CDropdown variant="nav-item">
            <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                <div>
                  <CIcon icon={cilBell} style={{ cursor: 'pointer' }} size="lg" />
                  {notificationCount > 0 && (
                    <CBadge color="danger" className="position-absolute top-0 start-100 translate-middle" size="sm">
                      {notificationCount}
                    </CBadge>
                  )}
                </div>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownHeader className="bg-light fw-semibold py-2">Notifications</CDropdownHeader>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <CDropdownItem className="me-2" key={index} onClick={() => handleNotificationClick(notification.ticketId)}>
                    <div>
                      <strong>{notification.title}</strong>
                      <div>{truncateMessage(notification.message, 20)}</div>
                    </div>
                  </CDropdownItem>
                ))
              ) : (
                <CDropdownItem>No notifications</CDropdownItem>
              )}
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;