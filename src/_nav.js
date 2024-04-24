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
  // cilUserX,
  cilListRich,
  cilObjectGroup,
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
  ]
},
  {
    component: CNavGroup,
    name: 'Received Data',
    
    icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
    items:[
    {
      component: CNavItem,
      name: 'Active Problem',
      to: '/data/activeproblem',
    },
    {
      component: CNavItem,
      name: 'Problem Data',
      to: '/data/problemdata',
    },
    {
      component: CNavItem,
      name: 'Device Raw',
      to: '/data/devraw',
    },

    ]
    
  },
  {
    component: CNavGroup,
    name: 'Email tracking',
    
    icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
    items:[
    {
      component: CNavItem,
      name: 'Inbox',
      to: '/event/emailtable',
    },
    {
      component: CNavItem,
      name: 'Setting',
      to: '/data/problemdata',
    },
    {
      component: CNavItem,
      name: 'search parameter',
      to: '/data/devraw',
    },

    ]
    
  },
  {
    component: CNavTitle,
    name: 'Details',
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
  // {
  //   component: CNavItem,
  //   name: 'Users',
  //   to: '/details/users',
  //   icon: <CIcon icon={cilUserX} customClassName="nav-icon" />,
  // },
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
