/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image';
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import { toast } from 'sonner';


const {env: { imagekit: { publicKey, urlEndpoint }}} = config;


const authenticator = async() => {
  try { 
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit` );
    if(!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status} : ${errorText}`);
    }
    const data = await response.json();
    const {signature, expire, token} = data;

    return { token, expire, signature };

  } catch (error: any) {
    throw new Error( `Authentication request failed : ${error.message}`)
  }

}

const ImageUpload = ({onFileChange}: {onFileChange:(filePath: string) => void; }) => {

  const ikUploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<{filePath: string} | null>( null );

  const onError = (error : any) => {
    console.log(error);

    toast.error("Image upload failed. Please try again.");
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

     toast("Image uploaded successfully!");

  };


  return (
  <ImageKitProvider
  publicKey={publicKey}
  urlEndpoint={urlEndpoint}
  authenticator={authenticator}>

    <IKUpload className="hidden" 
    ref={ikUploadRef}
    onError={onError}
    onSuccess={onSuccess}
    fileName="test-upload.png"
    />
    <button className="upload-btn" onClick={(e) => {
      e.preventDefault();
      
      if(ikUploadRef.current) {
        ikUploadRef.current?.click();
      }
    }}>
      <Image
        src="/icons/upload.svg"
        alt="Upload-icon"
        width={20}
        height={20}
        className="object-contain"
      />

      <p className="text-base text-light-100">upload a file</p>

      {file && <p className="upload-filename">{file.filePath}</p>}
    </button>

    {file && (
    <IKImage
      alt={file.filePath}
      path={file.filePath}
      width={500}
      height={300}
    />
  )}

  </ImageKitProvider>
  );
}

export default ImageUpload;
