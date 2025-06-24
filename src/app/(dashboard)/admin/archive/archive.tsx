'use client'
import React, { use, useEffect, useState } from 'react'
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
import { Download, Eye, Pen, RefreshCcw, RefreshCw, Scan, Search, Trash } from 'lucide-react'
import GenerateCodesForm from '@/components/forms/GenerateCodesForm'
import { getCodesList, useDeleteCodes, useExportCodeslist, useGetCodesList, useUpdateCodes } from '@/apis/codes'
import Loader from '@/components/common/Loader'
import PaginitionComponent from '@/components/common/Pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetItemsList } from '@/apis/items'
import { useGetChestList } from '@/apis/chests'
import { Button } from '@/components/ui/button'
import DashboardCard from '@/components/common/Card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import toast from 'react-hot-toast'
import { useGetDashboardCount } from '@/apis/dashboard'
import EditCodeForm from '@/components/forms/EditCode'
import EditSingleCodeForm from '@/components/forms/EditSingleCode'
import { io } from 'socket.io-client'
import useIsDownloadedStore from '@/hooks/downloadfile'
import CodeDetailsDialog from '@/components/common/Code-Details'
import { useResetCode } from '@/apis/redeemcode'


  
  
  
export default function Archived() {
    const [currentPage, setCurrentpage] = useState(0)
    const [pagination, setPagination] = useState('10')
    const [totalpage, setTotalpage] = useState(0)
    const [search, setSearch] = useState('')
    const [type, setType]= useState('')
    const [itemfilter, setItemFilter]= useState('')
    const [status, setStatus]= useState('')
    const [rarity, setRarity] = useState('')
    const [open, setOpen] = useState(false)
    const [editFormOpen, setEditFormOpen] = useState(false);


    const {data, isLoading} = useGetCodesList(currentPage, Number(pagination), type,rarity, itemfilter, status,search, true)
    const {data: codes} = useGetDashboardCount()
    const {mutate: deleteCodes, isPending: deletePending} = useDeleteCodes()
    const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
    const [editselectedCodes, setEditSelectedCodes] = useState<string[]>([]);
    const [selectedCodeData, setSelectedCodeData] = useState<any[]>([]);
    const {data: items} = useGetItemsList(currentPage,100,type, rarity)

    const [codeGenProgress, setCodeGenProgress] = useState<number | null>(null)
    const [codeGenStatus, setCodeGenStatus] = useState<string | null>(null)
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [socket, setSocket] = useState<any>(null)
    const [progress, setProgress] = useState<number | null>(null)
    const [exportstatus, setExportStatus] = useState('')
    const [exportfile, setExportFile] = useState('')
    const [exportOpen, setExportOpen] = useState(false)
    const {isDownload, setIsDownload, clearIsDownload} = useIsDownloadedStore()
    const {mutate: resetCode, isPending: resetPending} = useResetCode()
    const {mutate: updateCodes, isPending} = useUpdateCodes()
    


    const handleStartInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/,/g, '')
        let numberValue = parseInt(rawValue, 10)
    
        if (!isNaN(numberValue)) {
          setStart(numberValue.toLocaleString())
        } else {
          setStart('')
        }
    }

     const handleEndInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/,/g, '')
        let numberValue = parseInt(rawValue, 10)
    
        if (!isNaN(numberValue)) {
          setEnd(numberValue.toLocaleString())
        } else {
          setEnd('')
        }
    }

    function parseFormattedNumber(input: string): number {
      const cleaned = input.replace(/,/g, '');
      return Number(cleaned);
    }


     useEffect(() => {
        const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}`)
        setSocket(newSocket)
  

         newSocket.on('export-progress', (data) => {
          console.log(data)
          if (data.percentage !== undefined) setProgress(data.percentage)
          if (data.status) setExportStatus(data.status)
          if (data.file !== undefined) setExportFile(data.file)
          setIsDownload(data.file)

        })

    
        return () => {
          newSocket.disconnect()
        }
      }, [])

          
         //paginition
         const handlePageChange = (page: number) => {
          setCurrentpage(page)
        }
      
        useEffect(() => {
          setTotalpage(data?.totalPages || 0)
        },[data])


        const reset = () => {
          setType('')
          setItemFilter('')
          setStatus('')
          setSearch('')
          setRarity('')
        }

       
          const deleteCodeData = () => {
             deleteCodes(
                    { ids: selectedCodes },
                    {
                      onSuccess: () => {
                        toast.success('Codes deleted successfully!');
                        setOpen(false);
                        setOpen(false)
                        setSelectedCodes([]);
                      },
                    }
              );
           }


        const restoreCodes = () => {
            updateCodes({ids: selectedCodes, type: '', chest: '', items: [], expiration: '', status: '', archive: false },{
                onSuccess: () => {
                    toast.success(`Code restore successfully`);
                    setOpen(false)
                    reset()
                    setEditFormOpen(false)
                },
                })
        }


         

           useEffect(() =>{
            setCurrentpage(0)
           },[search])

        

           useEffect(() => {
            setSelectedCodes([])
            setSelectedCodeData([])
           },[data])


         

        

  return (
    <div className=' w-full flex flex-col text-sm bg-yellow-50 border-[1px] border-zinc-100 rounded-md p-4'>
   
          <div className=' flex items-end flex-wrap gap-4'>

           
            <div className=' relative w-fit flex items-center justify-center mt-4'>
              <Search size={15} className=' absolute left-2'/>
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className=' w-fit pl-7'/>
            </div>

            <div className=" flex flex-col gap-1">
                <label className="text-xs text-zinc-400">No. of data</label>
                <Select value={pagination} onValueChange={setPagination} >
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Select" className="text-xs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={'10'} className="text-xs">10</SelectItem>
                  <SelectItem value={'20'} className="text-xs">20</SelectItem>
                  <SelectItem value={'30'} className="text-xs">30</SelectItem>
                  <SelectItem value={'40'} className="text-xs">40</SelectItem>
                  <SelectItem value={'50'} className="text-xs">50</SelectItem>
                  <SelectItem value={'60'} className="text-xs">60</SelectItem>
                  <SelectItem value={'70'} className="text-xs">70</SelectItem>
                  <SelectItem value={'80'} className="text-xs">80</SelectItem>
                  <SelectItem value={'90'} className="text-xs">90</SelectItem>
                  <SelectItem value={'100'} className="text-xs">100</SelectItem>
                  <SelectItem value={'1000'} className="text-xs">1000</SelectItem>
                  <SelectItem value={'10000'} className="text-xs">10,000</SelectItem>
                  <SelectItem value={'20000'} className="text-xs">20,000</SelectItem>
                  <SelectItem value={'50000'} className="text-xs">50,000</SelectItem>
                  <SelectItem value={'100000'} className="text-xs">100,000</SelectItem>
                 
                  
                
                </SelectContent>
              </Select> 
            </div>

             <div className="w-fit flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Reward Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Select" className="text-xs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem  value='chest' className="text-xs">Chest</SelectItem>
                  <SelectItem  value='ingame' className="text-xs">Ingame</SelectItem>
                  <SelectItem  value='exclusive' className="text-xs">Exclusive Items</SelectItem>
                  <SelectItem  value='robux' className="text-xs">Robux</SelectItem>
                  <SelectItem  value='ticket' className="text-xs">Tickets</SelectItem>
                 
                </SelectContent>
              </Select>
           
            </div>
  
            <div className="w-fit flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Rarity</label>
              <Select disabled={type === ''} value={rarity} onValueChange={setRarity}>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Select" className="text-xs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem  value='common' className="text-xs">Common</SelectItem>
                  <SelectItem  value='uncommon' className="text-xs">Uncommon</SelectItem>
                  <SelectItem  value='rare' className="text-xs">Rare</SelectItem>
                  <SelectItem  value='epic' className="text-xs">Epic</SelectItem>
                  <SelectItem  value='legendary' className="text-xs">Legendary</SelectItem>
                 
                </SelectContent>
              </Select>
           
            </div>

            <div className="w-fit flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Items</label>
              <Select disabled={rarity === ''} value={itemfilter} onValueChange={setItemFilter}>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Select" className="text-xs" />
                </SelectTrigger>
                <SelectContent>
                  {items?.data.map((item, index) => (
                    <SelectItem key={item.id}  value={item.id} className="text-xs">{item.itemname}</SelectItem>
                  ))}
                  
                </SelectContent>
              </Select>
           
            </div>

           <div className=" flex flex-col gap-1">
            <label className="text-xs text-zinc-400">Status</label>
            <Select value={status} onValueChange={setStatus} >
            <SelectTrigger className="w-fit">
              <SelectValue placeholder=" Status" className="text-xs" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem  value='claimed' className="text-xs">
                  Claimed
                </SelectItem>
                 <SelectItem  value='to-claim' className="text-xs">
                  Unclaimed
                </SelectItem>
                  {/* <SelectItem  value='approved' className="text-xs">
                  Approved
                </SelectItem>
                 <SelectItem  value='rejected' className="text-xs">
                  Rejected
                </SelectItem>
                <SelectItem  value='expired' className="text-xs">
                  Expired
                </SelectItem> */}
            </SelectContent>
          </Select> 
          </div>

          <Button onClick={reset} className=' p-2'><RefreshCcw size={15}/></Button>

         <Dialog open={editFormOpen} onOpenChange={setEditFormOpen}>
          <DialogTrigger className='p-[.6rem] bg-orange-500 rounded-sm text-yellow-100 flex items-center gap-2'>
            <RefreshCw size={15} /> Restore
          </DialogTrigger>
          <DialogContent className='bg-yellow-50 p-6 min-w-sm'>
            <DialogHeader>
              <DialogTitle>Restore Codes</DialogTitle>
              <DialogDescription>Are you sure you want to restore the selected codes?</DialogDescription>
            </DialogHeader>
            { /* 
            <div className='flex flex-col gap-2 text-amber-950 text-sm mt-4 max-h-64 overflow-y-auto'>
              

              {selectedCodes.map((id) => {
                const selectedItem = data?.data.find((item) => item.id === id);
                return (
                  <label key={id} className='flex items-center gap-2'>
                    {selectedItem?.code || 'Unknown'}
                  </label>
                );
              })}
            </div> */}

            <div className='w-full flex items-end justify-end mt-4'>
              <Button
                disabled={isPending}
                onClick={() => {
                 restoreCodes()
                }}
                className='bg-orange-500'
              >
                Continue
              </Button>
            </div>
          </DialogContent>
        </Dialog>

          <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger className='p-[.6rem] bg-red-600 rounded-sm text-yellow-100'>
                    <Trash size={15} />
                  </DialogTrigger>
                  <DialogContent className='bg-yellow-50 p-6 min-w-sm'>
                    <DialogHeader>
                      <DialogTitle>Delete Codes</DialogTitle>
                      <DialogDescription>Are you sure you want to delete the selected codes?</DialogDescription>
                    </DialogHeader>
        
                    <div className='flex flex-col gap-2 text-amber-950 text-sm mt-4 max-h-64 overflow-y-auto'>
                      
        
                      {selectedCodes.map((id) => {
                        const selectedItem = data?.data.find((item) => item.id === id);
                        return (
                          <label key={id} className='flex items-center gap-2'>
                            {selectedItem?.code || 'Unknown'}
                          </label>
                        );
                      })}
                    </div>
        
                    <div className='w-full flex items-end justify-end mt-4 gap-4'>
                      <Button
                        disabled={deletePending}
                        onClick={() => {
                         deleteCodeData()
                        }}
                        className='bg-red-600'
                      >
                        Yes
                      </Button>

                       <Button
                        // disabled={deletePending}
                        onClick={() => {
                         setOpen(false)
                        }}
                        className='bg-orange-50 text-black'
                      >
                        No
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>


         

        </div>

        <div className=' flex items-center gap-4 mt-6 text-xs'>
          <p>Total Number of Codes: {data?.totalDocs.toLocaleString()}</p>
          {/* <p>Expired Codes: {data?.expiredCodesCount.toLocaleString()}</p> */}

          {codeGenProgress !== null && (
            <div className="mb-4 max-w-md">
              <div className="text-xs mb-1 text-amber-950">{codeGenStatus}</div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-orange-500 h-full transition-all"
                  style={{ width: `${codeGenProgress}%` }}
                />
              </div>
            </div>
          )}


          {(progress !== null && exportfile === '' ) && (
          <div className="mb-4 max-w-md">
            {/* <Loader type={'loader'}/> */}
            <div className=' flex flex-col'>
                <div className="text-xs mb-1 text-amber-950">{exportstatus}</div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-orange-500 h-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
            </div>
          

          </div>
        )}


          {isDownload && (
              <div className="mt-2 flex items-center gap-2">
                <a
                onClick={() => clearIsDownload()}
                href={`${process.env.NEXT_PUBLIC_API_URL}${isDownload}`}
                  download
                  className=" px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-400 transition flex items-center gap-2"
                >
                  <Download size={15}/>
                   Download
                </a>

                <p className=' text-xs'>{isDownload}</p>
              </div>
            )}


        </div>
        
       
        <Table className=' text-sm mt-8'>
            {data?.data.length === 0 && (
                <TableCaption>No data</TableCaption>
            )}

            {isLoading && (
                <TableCaption><Loader type={'loader-secondary'}/></TableCaption>
            ) }
        <TableHeader>
        <TableRow>
           <TableHead>
            <input
              type='checkbox'
              checked={selectedCodes.length === data?.data.length && data?.data.length > 0}
              onChange={(e) => {
                if (e.target.checked) {
                  const allIds = data?.data.map((item) => item.id) || [];
                  const allItems = data?.data || [];
                  setSelectedCodes(allIds);
                  setSelectedCodeData(allItems);
                } else {
                  setSelectedCodes([]);
                  setSelectedCodeData([]);
                }
              }}
            />
          </TableHead>
            <TableHead className="">Code</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Rarity</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Expiration</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
            {data?.data.map((item, index) => (
                <TableRow key={item.id} className=' text-xs'>
                  <TableCell>
                    <input
                      type='checkbox'
                      checked={selectedCodes.includes(item.id)}
                       onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCodes((prev) => [...prev, item.id]);
                          setSelectedCodeData((prev) => [...prev, item]);
                        } else {
                          setSelectedCodes((prev) => prev.filter((id) => id !== item.id));
                          setSelectedCodeData((prev) => prev.filter((code) => code.id !== item.id));
                        }
                      }}
                    />
                  </TableCell>
                    <TableCell>{item.code}</TableCell>
                    <TableCell className=' uppercase'>{item.type}</TableCell>
                    <TableCell className=' uppercase'>{item.items[0]?.rarity}</TableCell>
                    <TableCell>
                      {item.items.length > 0
                        ? item.items.map((item) => item.itemname).join(', ')
                        : 'No items'}
                    </TableCell>
                    <TableCell>{item.expiration}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell className={` ${item.status === 'claimed' ? 'text-green-500' : 'text-orange-500'}`}>{item.status}</TableCell>
                    <TableCell className=' flex gap-2'>

                    <CodeDetailsDialog code={item.code} type={item.type} items={item.items} expiration={item.expiration} isUsed={item.isUsed} status={item.status}/>

                     <Dialog>
                      <DialogTrigger onClick={() => selectedCodes.push(item.id)} className=' p-2 bg-red-600 rounded-sm text-yellow-100'><Trash size={15}/></DialogTrigger>
                      <DialogContent className=' bg-yellow-50 p-8'>
                        <DialogHeader>
                          <DialogTitle>Are you sure you want to delete this code?</DialogTitle>
                          <DialogDescription>
                            
                          </DialogDescription>
                        </DialogHeader>

                        <div className=' flex flex-col gap-2 text-amber-950 mt-2'>
                          <p>Code: {item.code}</p>
                          <p>Chest Name: {item.chest?.chestname}</p>
                          <p>Items: {item.items.map((item) => item.itemname).join(',')}</p>
                          <p>Expiration: {item.expiration}</p>
                          <p>Type: {item.type}</p>
                          <p>Status: {item.isUsed ? 'Claimed' : 'UnClaimed'}</p>

                        </div>

                        <div className=' w-full flex items-end justify-end mt-4'>
                          <Button disabled={deletePending} onClick={deleteCodeData} className=' bg-red-600 flex items-center justify-center gap-2 '>
                            
                          {deletePending &&  <Loader type={'loader-secondary'}/>}Continue</Button>
                        </div>

                      </DialogContent>
                    </Dialog>

                    </TableCell>
                  
                </TableRow>
            ))}
       
        </TableBody>
    </Table>

      {data?.data.length !== 0 && (
              <PaginitionComponent currentPage={currentPage} total={totalpage} onPageChange={handlePageChange }/>
            )}
    </div>
    
  
  )
}
