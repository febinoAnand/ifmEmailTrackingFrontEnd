import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
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
  CTooltip
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBell, cilMenu } from '@coreui/icons';

import { AppBreadcrumb } from './index';
import { AppHeaderDropdown } from './header/index';
import BaseURL from 'src/assets/contants/BaseURL';

const AppHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [notificationCount, setNotificationCount] = useState(0);

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
        setNotificationCount(okNotifications.length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

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
        <CNavItem className="position-relative">
          <CTooltip content="Notification Sent">
            <CNavLink>
              <CIcon icon={cilBell} style={{ cursor: 'pointer' }} size="lg" />
              {notificationCount > 0 && (
                <CBadge color="danger" className="position-absolute top-0 start-100 translate-middle" size="sm">
                  {notificationCount}
                </CBadge>
              )}
            </CNavLink>
          </CTooltip>
        </CNavItem>
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