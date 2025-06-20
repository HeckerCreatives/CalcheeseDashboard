import { Box, Boxes, ChartPie, Gamepad, Gamepad2, Globe, List, Scan, Settings, Star, Stars, Ticket, TicketCheck, TicketCheckIcon, Users, Wallet } from "lucide-react";

export const admin = [
    {name: 'Dashboard', icon: <ChartPie size={15}/>, 
    path:'/admin/dashboard', subpath:[

    ]},
    {name: 'Generate Codes', icon: <Scan size={15}/>, 
    path:'/admin/codes/generate', subpath:[]},
    {name: 'Select Item', icon: <Box size={15}/>, 
    path:'/admin/items', subpath:[]},
    {name: 'Claiming', icon: <Ticket size={15}/>, 
     path:'/admin/claiming',  subpath:[
        {name: 'Chests', icon: <Box size={15}/>, 
        path:'/admin/claiming/chest', subpath:[]},
        {name: 'In-Game', icon: <Gamepad2 size={15}/>, 
        path:'/admin/claiming/ingame', subpath:[]},
        {name: 'Exclusive Items', icon: <Stars size={15}/>, 
        path:'/admin/claiming/exclusiveitem'},
        {name: 'Robux', icon: <Box size={15}/>, 
         path:'/admin/claiming/robux', subpath:[
            {name: 'Redeemed', icon: <Box size={15}/>, 
            path:'/admin/claiming/robux/redeemed'},
            {name: 'Claiming', icon: <Box size={15}/>, 
            path:'/admin/claiming/robux/claiming'},
         ]},
         {name: 'Ticket', icon: <Ticket size={15}/>, 
         path:'/admin/claiming/ticket', subpath:[
            {name: 'Redeemed', icon: <Box size={15}/>, 
            path:'/admin/claiming/ticket/redeemed'},
            {name: 'Claiming', icon: <Box size={15}/>, 
            path:'/admin/claiming/ticket/claiming'},
         ]}
     ]},

    
    {name: 'Website', icon: <Globe size={15}/>, 
    path:'/admin/website', subpath:[]},
    {name: 'Settings', icon: <Settings size={15}/>, 
    path:'/admin/settings', subpath:[]},
]