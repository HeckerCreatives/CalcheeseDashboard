import Adminlayout from '@/components/layout/AdminLayout'
import React from 'react'
import MiniGames from './Minigames'
import Welcome from './Welcome'
import Whatsnew from './Whatsnew'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function page() {
  return (
    <Adminlayout>
      <Tabs defaultValue="welcome" className=" w-full">
      <TabsList>
        <TabsTrigger value="welcome">CalCheese</TabsTrigger>
        <TabsTrigger value="news">News</TabsTrigger>
        <TabsTrigger value="minigame">Mini Games</TabsTrigger>
        {/* <TabsTrigger value="rewards">Rewards</TabsTrigger> */}
        <TabsTrigger value="socials">Socials</TabsTrigger>
      </TabsList>
      <TabsContent value="welcome">
        <Welcome/>
      </TabsContent>
      <TabsContent value="news">
        <Whatsnew/>
      </TabsContent>
      <TabsContent value="minigame">
        <MiniGames/>
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>

     
    </Adminlayout>
  )
}
