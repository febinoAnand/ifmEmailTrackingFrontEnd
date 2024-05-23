import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCursor,
  cilMonitor,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilLightbulb,
  cilUsb,
  cilEqualizer,
  cilSitemap,
  cilTouchApp,
  cilBug,
  cilCenterFocus,
  cilUserX,
  cilGroup,
  cilListRich,
  cilObjectGroup,
  cilBraille,
  cilCheckCircle,
  cilDiamond,
  cilEnvelopeLetter,
  cilArrowCircleBottom,
  cilSettings,
  cilSearch,
  cilSwapHorizontal,
  cilVoiceOverRecord,
  cilShieldAlt,
  cilPrint,
  cilLan,
  cilBoltCircle,
  cilBellExclamation,
  cilRunning,
  cilSignLanguage,
  cilShortText,
  cilColumns,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Live Dashboard',
    to: '/live',
    icon: <CIcon icon={cilMonitor} customClassName="nav-icon" />
   
  },
  {
    component: CNavItem,
    name: 'Data Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    
  },
  {
    component: CNavTitle,
    name: 'Application',
  },
  {
  component: CNavGroup,
  name: 'Andon System',
  
  icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
  items:[
    {
      component: CNavItem,
      name: 'Process',
      to: '/event/eventgroup',
      icon: <CIcon icon={cilObjectGroup} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Event Map',
      to: '/event/eventmap',
      icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Indicator',
      to: '/event/indicator',
      icon: <CIcon icon={cilLightbulb} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Button',
      to: '/event/button',
      icon: <CIcon icon={cilTouchApp} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Problem Code',
      to: '/event/problemcode',
      icon: <CIcon icon={cilBug} customClassName="nav-icon" />,
    },
    {
      component: CNavGroup,
      name: 'Received Data',
      
      icon: <CIcon icon={cilCenterFocus} customClassName="nav-icon" />,
      items:[
      {
        component: CNavItem,
        name: 'Active Problem',
        to: '/data/activeproblem',
        icon: <CIcon icon={cilBraille} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Problem Data',
        to: '/data/problemdata',
        icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Device Raw',
        to: '/data/devraw',
        icon: <CIcon icon={cilDiamond} customClassName="nav-icon" />,
      },
  
      ]
      
    },
  ]
},
  {
    component: CNavGroup,
    name: 'Email tracking',
    
    icon: <CIcon icon={cilEnvelopeLetter} customClassName="nav-icon" />,
    items:[
    {
      component: CNavItem,
      name: 'Inbox',
      to: '/emailtracking/emailtable',
      icon: <CIcon icon={cilArrowCircleBottom} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Parameter',
      to: '/emailtracking/parameter',
      icon: <CIcon icon={cilSearch} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Trigger',
      to: '/emailtracking/trigger',
      icon: <CIcon icon={cilSignLanguage} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Ticket',
      to: '/emailtracking/ticket',
      icon: <CIcon icon={cilColumns} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Ticket Report',
      to: '/emailtracking/ticketreport',
      icon: <CIcon icon={cilShortText} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Setting',
      to: '/emailtracking/setting',
      icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    },

    ]

  },
  {
    component: CNavGroup,
    name: 'Actions',
    
    icon: <CIcon icon={cilRunning} customClassName="nav-icon" />,
    items:[
      {
        component: CNavGroup,
        name: 'Notifications',
        
        icon: <CIcon icon={cilBellExclamation} customClassName="nav-icon" />,
        items:[
        {
          component: CNavItem,
          name: 'Send Report',
          to: '/pushnotification/sendreport',
          icon: <CIcon icon={cilSwapHorizontal} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'User Identifier',
          to: '/pushnotification/useridentifier',
          icon: <CIcon icon={cilVoiceOverRecord} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Setting',
          to: '/pushnotification/setting',
          icon: <CIcon icon={cilShieldAlt} customClassName="nav-icon" />,
        },
    
        ]
        
      },
      {
        component: CNavGroup,
        name: 'SMS Gateway',
        
        icon: <CIcon icon={cilBoltCircle} customClassName="nav-icon" />,
        items:[
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
        ]
        
      },

    ]
    
  },
  {
    component: CNavTitle,
    name: 'Device Management',
  },
  {
    component: CNavItem,
    name: 'Machine Details',
    to: '/details/machinedetails',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    
  },
  {
    component: CNavItem,
    name: 'Device',
    to: '/details/devdetails',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Unregister Device',
    to:'/details/unregister',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
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
  {
    component: CNavItem,
    name: 'Groups',
    to: '/users/groups',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Configurations',
  },
  {
    component: CNavItem,
    name: 'UART',
    to:'/config/uart',
    icon: <CIcon icon={cilUsb} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'MQTT',
    to: '/config/mqtt',
    icon: <CIcon icon={cilEqualizer} customClassName="nav-icon" />,
  }
  
]

export default _nav
