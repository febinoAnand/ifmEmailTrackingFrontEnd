import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilUserX,
  cilLaptop,
  cilArrowCircleBottom,
  cilSearch,
  cilSwapHorizontal,
  cilShieldAlt,
  cilPrint,
  cilLan,
  cilBoltCircle,
  cilBellExclamation,
  cilRunning,
  cilShortText,
  cilColumns,
  cibKeycdn,
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';

const username = localStorage.getItem('username');
const password = localStorage.getItem('password');

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/emailtracking/dashboard',
    icon: <CIcon icon={cilLaptop} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Email tracking',
  },
  {
    component: CNavItem,
    name: 'Inbox',
    to: '/emailtracking/emailtable',
    icon: <CIcon icon={cilArrowCircleBottom} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Create Department',
    to: '/emailtracking/department',
    icon: <CIcon icon={cilSearch} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Ticket',
    to: '/emailtracking/ticket',
    icon: <CIcon icon={cilColumns} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Report',
    to: '/emailtracking/ticketreport',
    icon: <CIcon icon={cilShortText} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Setting',
    to: '/emailtracking/setting',
    icon: <CIcon icon={cibKeycdn} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Actions',
    icon: <CIcon icon={cilRunning} customClassName="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: 'Notifications',
        icon: <CIcon icon={cilBellExclamation} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Notify Report',
            to: '/pushnotification/sendreport',
            icon: <CIcon icon={cilSwapHorizontal} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Setting',
            to: '/pushnotification/setting',
            icon: <CIcon icon={cilShieldAlt} customClassName="nav-icon" />,
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'SMS Gateway',
        icon: <CIcon icon={cilBoltCircle} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'SMS Report',
            to: '/smsgateway/sendreport',
            icon: <CIcon icon={cilPrint} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Settings',
            to: '/smsgateway/settings',
            icon: <CIcon icon={cilLan} customClassName="nav-icon" />,
          },
        ],
      },
    ],
  },
  ...(username === 'admin' && password === 'admin'
    ? [
        {
          component: CNavTitle,
          name: 'User Management',
        },
        {
          component: CNavItem,
          name: 'Users',
          to: '/users/users',
          icon: <CIcon icon={cilUserX} customClassName="nav-icon" />,
        },
      ]
    : []),
];

export default _nav;