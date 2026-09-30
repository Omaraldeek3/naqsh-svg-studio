"use client";
import {useEffect,useState} from "react";
export function useLocalState<T>(key:string,initial:T,validate?:(value:unknown)=>T) {
  const [value,setValue]=useState(initial),[ready,setReady]=useState(false),[error,setError]=useState(false);
  useEffect(()=>{try{const raw=localStorage.getItem(key);if(raw!==null){const parsed:unknown=JSON.parse(raw);setValue(validate?validate(parsed):parsed as T);}}catch{setError(true);}setReady(true);},[key]); // initial validator is deliberately stable per storage key
  useEffect(()=>{if(!ready)return;try{localStorage.setItem(key,JSON.stringify(value));}catch{setError(true);}},[key,value,ready]);
  return [value,setValue,ready,error] as const;
}
