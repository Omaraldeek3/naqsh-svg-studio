"use client";
import { memo,useEffect,useState } from "react";
import { renderAsset, assetOptions, type SvgOptions } from "../lib/svg";
import type { Asset } from "../lib/catalog";
import {loadSource,sourceSvg} from "../lib/icon-sources";
import {hasTiktokData,loadTiktokData} from "../lib/tiktok-designs";
export const Art = memo(function Art({asset,options,className=""}:{asset:Asset;options?:SvgOptions;className?:string}) {
  const isTiktok=asset.category==="tiktok";
  const isReadyNow=()=>asset.source?!!sourceSvg(asset.id):isTiktok?hasTiktokData(asset.id):true;
  const [ready,setReady]=useState(isReadyNow),[failed,setFailed]=useState(false);
  useEffect(()=>{let active=true;if(asset.source){setReady(!!sourceSvg(asset.id));setFailed(false);loadSource(asset.id).then(()=>{if(active)setReady(true);}).catch(()=>{if(active)setFailed(true);});}else if(isTiktok){setReady(hasTiktokData(asset.id));setFailed(false);loadTiktokData(asset.id).then(()=>{if(active)setReady(true);}).catch(()=>{if(active)setFailed(true);});}else setReady(true);return()=>{active=false;};},[asset.id,asset.source,isTiktok]);
  if(!ready)return <div className={`svg-art art-loading ${className}`} aria-label={asset.name}><span>{failed?"تعذّر تحميل الرسم":"جارٍ تحميل الرسم…"}</span></div>;
  return <div className={`svg-art ${className}`} data-ornament={asset.ornament?"true":undefined} aria-label={asset.name} dangerouslySetInnerHTML={{__html:renderAsset(asset,options||{...assetOptions(asset),animate:false})}}/>;
});
