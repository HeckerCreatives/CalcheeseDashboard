'use client'
import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Input } from '@/components/ui/input'
import {  Pen} from 'lucide-react'
import Loader from '@/components/common/Loader'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { useEditSocails, useGetSocials } from '@/apis/socials'
import { socialsIcon } from '@/utils/reusables'

  
export default function Socials() {
    const [open3, setOpen3] = useState(false)
    const [id, setId] = useState('')
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const {data, isLoading} = useGetSocials()
    const {mutate: editSocials, isPending} = useEditSocails()


    const editSocialsData = () => {
        editSocials({title: title, link: url},{
            onSuccess: () => {
              toast.success(`Social media url updated successfully.`);
              setOpen3(false)
            },
        })
      
    }
       
  


  return (
    <div className=' w-full flex flex-col text-sm bg-yellow-50 border-[1px] border-zinc-100 rounded-md p-8'>
        <h2 className=' text-lg font-bold'>Social Medias</h2>
       
        <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg::grid-cols-3 gap-4 mt-8'>
            {data?.data.map((item, index) => (
                <div key={item._id} className=' w-full aspect-video flex flex-col gap-6 items-center justify-center bg-amber-100 relative p-6'>
                    <div className=' absolute top-2 right-2 flex items-center gap-2'>
                  

                    {/* <Dialog open={open3} onOpenChange={setOpen3}>
                    <DialogTrigger onClick={() =>{ setCurrentPreview(item.image), setId(item.id)}} className=' flex items-center justify-center gap-1 text-white w-fit bg-orange-500 p-1 rounded-sm'>
                        <Pen size={15}/>
                    </DialogTrigger>
                    <DialogContent className="p-6 bg-yellow-50">
                        <DialogHeader>
                        <DialogTitle>Edit Mini Game Thumbnail</DialogTitle>
                        <DialogDescription>Are you sure you want to edit this image?</DialogDescription>
                        </DialogHeader>

                        <div
                        {...getRootProps()}
                        className={`mt-4 border-2 border-dashed p-6 text-center rounded-md cursor-pointer transition text-xs ${
                            isDragActive ? 'border-orange-500 bg-orange-100' : 'border-gray-300'
                        }`}
                        >
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                            <p>Drop the image here...</p> :
                            <p>Drag 'n' drop an image file here, or click to select one</p>
                        }
                        </div>

                       
                        <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-1">Preview:</p>
                            <img
                                src={
                                preview
                                    ? preview
                                    : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${currentPreview}`
                                }
                                alt="Thumbnail Preview"
                                className="w-full max-h-60 object-contain border rounded-md"
                            />
                        </div>
                    

                        <div className=' flex items-end justify-end'>
                            <Button disabled={isPending} onClick={() => editMinigameImage()}>
                                {isPending && (
                                    <Loader type={'loader'}/>
                                )}
                            Save</Button>

                        </div>
                    </DialogContent>
                    </Dialog> */}

                    </div>
                    <img src={socialsIcon(item.title)}  alt="icon" width={100}/>
                   
                    <div className=' w-full flex flex-col gap-1'>
                            <label htmlFor="" className=' text-xs'>Social Media Url</label>
                            <div className=' flex items-center gap-2'>
                                <Input disabled value={item.link} placeholder='Url'/>
                                <Dialog open={open3} onOpenChange={setOpen3}>
                                <DialogTrigger onClick={() =>{setId(item._id), setUrl(item.link), setTitle(item.title)}} className=' flex items-center justify-center gap-1 text-white w-fit bg-orange-500 p-2 rounded-sm'>
                                    <Pen size={15}/>
                                </DialogTrigger>
                                <DialogContent className="p-6 bg-yellow-50">
                                    <DialogHeader>
                                    <DialogTitle>Edit Social Media Url</DialogTitle>
                                    <DialogDescription>Are you sure you want to edit this url?</DialogDescription>
                                    </DialogHeader>

                                    <div className=' flex flex-col gap-1'>
                                        <label htmlFor="" className=' text-xs'>Social Media Url</label>
                                        <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Url'/>
                                    </div>
                                   

                                    <div className=' flex items-end justify-end'>
                                        <Button disabled={isPending} onClick={() => editSocialsData()}>
                                            {isPending && (
                                                <Loader type={'loader'}/>
                                            )}
                                        Save</Button>

                                    </div>
                                </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    
                </div>
            ))}
            

           
        </div>
    </div>
    
  
  )
}
