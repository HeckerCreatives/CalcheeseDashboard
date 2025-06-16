import Adminlayout from '@/components/layout/AdminLayout'
import React from 'react'
import MiniGames from './Minigames'
import Welcome from './Welcome'
import Whatsnew from './Whatsnew'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Socials from './Socials'
import Rewards from './Rewards'


export default function page() {
  return (
    <Adminlayout>
      <Tabs defaultValue="rewards" className=" w-full">
      {/* <TabsList>
        <TabsTrigger value="welcome">CalCheese</TabsTrigger>
        <TabsTrigger value="news">News</TabsTrigger>
        <TabsTrigger value="minigame">Mini Games</TabsTrigger>
        <TabsTrigger value="socials">Socials</TabsTrigger>
        <TabsTrigger value="rewards">Promo Codes</TabsTrigger>
      </TabsList> */}

      <TabsContent value="welcome">
        <Welcome/>
      </TabsContent>
     
      <TabsContent value="news">
        <Whatsnew/>
      </TabsContent>
      <TabsContent value="minigame">
        <MiniGames/>
      </TabsContent>
      <TabsContent value="socials">
        <Socials/>
      </TabsContent>
      <TabsContent value="rewards">
        <Rewards/>
      </TabsContent>
    </Tabs>

     
    </Adminlayout>
  )
}
