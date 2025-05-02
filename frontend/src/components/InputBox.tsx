import React from 'react'
import { Input } from './ui/input'


interface proso{
    Ref?:React.RefObject<HTMLInputElement | null> , 
    value?:string , 
    disable:boolean , 
    id:string  ,
    size:number , 
    set?:(e:React.ChangeEvent<HTMLInputElement>)=>void
    Name:string

}
export default function InputBox({ Name ,value , set , size , id  , disable = false , Ref = undefined }:proso) {
  return (
    <div className={`flex flex-col gap-1 w-[${size}px]  `}>
    <label htmlFor={id} className=' text-[17px] font-bold'>{Name}</label>
    <Input  ref={Ref} disabled={disable} name={Name} id={id} value={value} onChange={(e)=>{
      if (set){
        set(e)
      }
    }}/>
  </div>
  )
}
