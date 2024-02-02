export default function seacrhfunction(ordersdata,inputdata,setitemslist){
    const searchlist=ordersdata.filter((e)=>{
     const {productname}=e;
      const actualname=productname.match(new RegExp(inputdata, 'i')); 
      return actualname; 
 });  
     return(setitemslist(searchlist));
 }