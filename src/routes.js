import React from 'react'

//test
const Test = React.lazy(() => import('./views/test/Test'))

//EmailTracking
const dashboard = React.lazy(() => import('./views/base/emailtracking/dashboard'))
const EmailTable = React.lazy(() => import('./views/base/emailtracking/EmailTable'))
const SettingData = React.lazy(() => import('./views/base/emailtracking/SettingData'))
const department = React.lazy(() => import('./views/base/emailtracking/department'))
const TicketReport = React.lazy(() => import('./views/base/emailtracking/ticketreport'))
const Ticket = React.lazy(() => import('./views/base/emailtracking/ticket'))

//PushNotification
const SendReport = React.lazy(() => import('./views/base/pushnotification/sendreport'))
const Setting = React.lazy(() => import('./views/base/pushnotification/setting'))

//SMSGateway
const SendReports = React.lazy(() => import('./views/base/smsgateway/sendreport'))
const Settings = React.lazy(() => import('./views/base/smsgateway/settings'))

//users
const Users = React.lazy(() => import('./views/base/users/Users'))



// Base
const Navs = React.lazy(() => import('./views/base/navs/Navs'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  
  { path: '/temp/test', name: 'Test', element: Test }, //test

  { path: '/emailtracking/dashboard', name: 'EmailTracking / Dashboard', element: dashboard}, //EmailTracking
  { path: '/emailtracking/emailtable', name: 'EmailTracking / Inbox', element: EmailTable}, //EmailTracking
  { path: '/emailtracking/setting', name: 'EmailTracking / Setting', element: SettingData}, //EmailTracking
  { path: '/emailtracking/department', name: 'EmailTracking / Create Departments', element: department}, //EmailTracking
  { path: '/emailtracking/ticketreport', name: 'EmailTracking / Report', element: TicketReport}, //EmailTracking
  { path: '/emailtracking/ticket', name: 'EmailTracking / Ticket', element: Ticket}, //EmailTracking

  { path: '/pushnotification/sendreport', name: 'Actions / Notifications / Send Report', element: SendReport}, //PushNotification
  { path: '/pushnotification/setting', name: 'Actions / Notifications / Setting', element: Setting}, //PushNotification

  { path: '/smsgateway/sendreport', name: 'Actions / SMS Gateway / Send Report', element: SendReports}, //SMSGateway
  { path: '/smsgateway/settings', name: 'Actions / SMS Gateway / Settings', element: Settings}, //SMSGateway

  { path: '/users/users', name: 'User Management / Users', element: Users}, //users

  { path: '/base/navs', name: 'Navs', element: Navs },
]

export default routes
