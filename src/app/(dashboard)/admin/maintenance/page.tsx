import Adminlayout from '@/components/layout/AdminLayout'
import React from 'react'
import MaintenanceCard from './maintenance'

export default function page() {
  return (
    <Adminlayout>
        <MaintenanceCard/>
    </Adminlayout>
  )
}
