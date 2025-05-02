import { Box, Boxes, ChartPie, List, Scan, Settings, Ticket, TicketCheck, TicketCheckIcon, Users, Wallet } from "lucide-react";

export const admin = [
    {name: 'Dashboard', icon: <ChartPie size={15}/>, 
    path:'/admin/dashboard', subpath:[

    ]},
    {name: 'Codes', icon: <TicketCheckIcon size={15}/>, 
    path:'/admin/codes', subpath:[
        {name: 'Generate', icon: <Scan size={15}/>, 
        path:'/admin/codes/generate'},
        {name: 'List', icon: <List size={15}/>, 
        path:'/admin/codes/list'},
        {name: 'Reward Type', icon: <Ticket size={15}/>, 
        path:'/admin/codes/rewardtype'}
    ]},

    {name: 'ROBUX', icon: <Box size={15}/>, 
    path:'/admin/robux', subpath:[
        {name: 'Claiming', icon: <List size={15}/>, 
        path:'/admin/robux/claiming'},
        {name: 'Reward Type', icon: <Ticket size={15}/>, 
        path:'/admin/robux/rewardtype'}
    ]},
    {name: 'Tickets', icon: <Ticket size={15}/>, 
    path:'/admin/tickets',  subpath:[
        {name: 'Claiming', icon: <List size={15}/>, 
        path:'/admin/tickets/claiming'},
        {name: 'Reward Type', icon: <Ticket size={15}/>, 
        path:'/admin/tickets/rewardtype'}
    ]},
    {name: 'Settings', icon: <Settings size={15}/>, 
    path:'/admin/settings', subpath:[]},
]