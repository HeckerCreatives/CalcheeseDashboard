'use client'
import React, { useCallback, useEffect, useState } from 'react'
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
import { CircleHelp, ListFilter, Pen, Plus, Scan, Search, Trash } from 'lucide-react'
import CreateRobuxCodeForm from '@/components/forms/CreateRobuxCode'
import { useGetRobuxList } from '@/apis/robux'
import PaginitionComponent from '@/components/common/Pagination'
import Loader from '@/components/common/Loader'
import EditRobuxCodeForm from '@/components/forms/EditRobuxCode'
import DeleteRobuxCodeForm from '@/components/forms/DeleteRobuxCode'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useGetTicketList } from '@/apis/tickets'
import CreateTicketCodeForm from '@/components/forms/CreateTicketCode'
import EditTicketCodeForm from '@/components/forms/EditTicketCode'
import DeleteTicketCodeForm from '@/components/forms/DeleteTicketCode'
import statusColor from '@/lib/reusable'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button'
import { useCreateMinigame, useDeleteMinigame, useEditMinigame, useGetMinigameList } from '@/apis/minigames'
import toast from 'react-hot-toast'
import { Textarea } from '@/components/ui/textarea'
import { useCreateNewTab, useDeleteNews, useEditNews, usegetNewtab } from '@/apis/whatsnew'
  


const status =[
    {value: '', name: 'All'},
    {value: 'pending', name: 'Pending'},
    {value: 'claimed', name: 'Claimed'},
]
  
  
export default function Whatsnew() {
    const {mutate: createNewTab, isPending} = useCreateNewTab()
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
    const [id, setId] = useState('')

    const [preview, setPreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [currentPreview, setCurrentPreview] = useState('');
    const {data, isLoading} = usegetNewtab()
    const {mutate: deleteNews} = useDeleteNews()
    const {mutate: editNews} = useEditNews()
    const [tab, setTab] = useState('')
    const [description, setDescription] = useState('')

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        setImageFile(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
        'image/*': []
        },
        multiple: false
    })


  const addNewTab = () => {
    if(imageFile === null || tab === '' || description === ''){
        toast.error(`Please fill out the form below`);
    }else {
        createNewTab({image: imageFile, tab: tab, description: description},{
            onSuccess: () => {
              toast.success(`New tab is added successfully.`);
              setOpen(false)
              setTab('')
              setDescription('')
            },
        })
    }
      
    }

    const deletenewsdata = (data: string) => {
        deleteNews({id: data},{
                onSuccess: () => {
                  toast.success(`News data deleted successfully.`);
                  setOpen2(false)
                },
            })
          
    }

    const editNewsData = () => {
        if( tab === '' || description === ''){
            toast.error(`Please fill out the form below`);
        }else {
            editNews({image: imageFile ,id: id, tab: tab, description: description},{
                onSuccess: () => {
                  toast.success(`News data updated successfully.`);
                  setOpen3(false)
                },
            })
        }
        
      
    }
    
    useEffect(() => (
        setPreview('')
        // setTab(''),
        // setDescription('')
    ), [open, open2, open3])

    useEffect(() => (
        setPreview(''),
        setTab(''),
        setDescription('')
    ),  [open])


        

  


  return (
    <div className=' w-full flex flex-col text-sm bg-yellow-50 border-[1px] border-zinc-100 rounded-md p-8'>
        <h2 className=' text-lg font-bold'>Whats new?</h2>

        <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='mt-4 flex items-center justify-center gap-1 text-white w-fit bg-orange-500 px-3 py-1 rounded-sm'>
        <Plus size={15}/> Add News
      </DialogTrigger>
      <DialogContent className="p-6 bg-yellow-50 flex flex-col gap-1">
        <DialogHeader>
          <DialogTitle>Add News</DialogTitle>
          <DialogDescription>Fill out the form below.</DialogDescription>
        </DialogHeader>

        <label htmlFor="" className=' text-xs mt-4'>Tab</label>
        <Input placeholder='Tab' type='text' value={tab} onChange={(e) => setTab(e.target.value)}/>

        <label htmlFor="" className=' text-xs mt-2'>Description</label>
        <Textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>

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

        {preview && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Preview:</p>
            <img src={preview} alt="Preview" className="w-full max-h-60 object-contain border rounded-md" />
          </div>
        )}

        <div className=' flex items-end justify-end mt-4'>
            <Button disabled={isPending} onClick={addNewTab}>
                {isPending && (
                    <Loader type={'loader'}/>
                )}
                Save</Button>

        </div>
      </DialogContent>
    </Dialog>



        {/* <h2 className=' text-sm mt-4'>Minigames List</h2> */}
       
       
        <div className=' w-full grid grid-cols-3 gap-4 mt-8'>
            {data?.data.map((item, index) => (
                <div key={item.id} className=' w-full aspect-video flex flex-col items-center justify-center bg-gray-100 relative p-1'>
                    <div className=' absolute top-2 right-2 flex items-center gap-2'>
                    <Dialog open={open2} onOpenChange={setOpen2}>
                    <DialogTrigger className=' flex items-center justify-center gap-1 text-white w-fit bg-red-500 p-1 rounded-sm'>
                        <Trash size={15}/>
                    </DialogTrigger>
                    <DialogContent className="p-6 bg-yellow-50">
                        <DialogHeader>
                        <DialogTitle>Delete News</DialogTitle>
                        <DialogDescription>Are you sure you want to delete this news?</DialogDescription>
                        </DialogHeader>

                        <div className=' flex items-end justify-end'>
                            <Button disabled={isPending} onClick={() => deletenewsdata(item.id)}>
                                {isPending && (
                                    <Loader type={'loader'}/>
                                )}
                                Continue</Button>

                        </div>
                    </DialogContent>
                    </Dialog>

                    <Dialog open={open3} onOpenChange={setOpen3}>
                    <DialogTrigger onClick={() =>{ setCurrentPreview(item.image), setId(item.id), setTab(item.tab),setDescription(item.description)}} className=' flex items-center justify-center gap-1 text-white w-fit bg-orange-500 p-1 rounded-sm'>
                        <Pen size={15}/>
                    </DialogTrigger>
                    <DialogContent className="p-6 bg-yellow-50 flex flex-col gap-1">
                        <DialogHeader>
                        <DialogTitle>Edit News</DialogTitle>
                        <DialogDescription>Fill out the form below.</DialogDescription>
                        </DialogHeader>

                        <label htmlFor="" className=' text-xs mt-4'>Tab</label>
                        <Input placeholder='Tab' type='text' value={tab} onChange={(e) => setTab(e.target.value)}/>

                        <label htmlFor="" className=' text-xs mt-2'>Description</label>
                        <Textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>


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
                            <Button disabled={isPending} onClick={() => editNewsData()}>
                                {isPending && (
                                    <Loader type={'loader'}/>
                                )}
                            Save</Button>

                        </div>
                    </DialogContent>
                    </Dialog>

                    </div>
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.image}`} alt="" className=' aspect-video ' />

                    <div className=' w-full flex flex-col gap-2 p-4'>
                        <p className=' text-orange-400 font-semibold'>{item.tab}</p>
                        <p className=' text-xs'>{item.description}</p>
                    </div>

                </div>
            ))}
            

           
        </div>
    </div>
    
  
  )
}
