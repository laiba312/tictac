"use client"
import React from "react";
interface Blockprop {
    value: 'X' | 'O' | null;
    onClick:()=>void
  }
function Block(props:Blockprop){
   
    
    return(
        <div onClick={props.onClick} className="   text-center py-6  h-20 w-20 cursor-pointer border-2 border-black  font-black  ">{props.value}</div>
    )
    
}
export default Block