import { original } from '@reduxjs/toolkit';
import React,{useEffect,useState} from 'react'

export default function useSearch() {
const [inputdata,setinputdata]=useState('');
const [originalist,setoriginallist]=useState([])
const [itemlist,setitemslist]=useState([]);

function seacrhfunction(){
     const searchlist=originalist.filter((e)=>{
      const {productname}=e;
       const actualname=productname.match(new RegExp(inputdata, 'i')); 
       return actualname; 
  });  
      return(setitemslist(searchlist));
  }
useEffect(()=>{
seacrhfunction();
},[inputdata])

return [setoriginallist,originalist,setinputdata,seacrhfunction];
}
