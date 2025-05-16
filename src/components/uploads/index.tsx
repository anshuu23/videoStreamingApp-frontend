// import { useState } from "react";

// export default function Upload() {
//   const [file, setFile] = useState(null);

//   function handleFileChange(e) {
//     setFile(e.target.files[0]);
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!file) {
//       alert("No file selected");
//       return;
//     }

//     // You would normally fetch the signed URL from your backend here
//     const signedUrl = await fetch("/api/get-upload-url") // placeholder
//       .then((res) => res.text());

//     const uploadRes = await fetch(' https://video-storage-signed-url.s3.eu-north-1.amazonaws.com/hi.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYMNHE2HTJAGSSV7M%2F20250515%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250515T122115Z&X-Amz-Expires=300&X-Amz-Signature=fc6d0fd0f4baea2eb63255007b31b27c1e9ba75f26c80e72ee4b7156961fd94a&X-Amz-SignedHeaders=host', {
//       method: "PUT",
//       headers: {
//         "Content-Type": file.type
//       },
//       body: file
//     });

//     if (uploadRes.ok) {
//       alert("✅ Upload successful!");
//     } else {
//       alert("❌ Upload failed.");
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Upload Video</label>
//       <input type="file" onChange={handleFileChange} />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

import React, { useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;



const Uploads: React.FC = () => {


    const [signedUrl, setSignedUrl] = useState('')
    const [videoName, setVideoName] = useState('')
    const [isFileDroped, setIsFileDroped] = useState(false)

    const props: UploadProps = {

        multiple: false,
        method: 'put',
        action: signedUrl,
        name: videoName + 'mp4',
        accept: '.mp4',
        maxCount: 1,
        onChange(info: { file: { name?: any; status?: any; }; fileList: any; }) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e: { dataTransfer: { files: any; }; }) {
            console.log('Dropped files', e.dataTransfer.files);
            setIsFileDroped(true)
        },
        beforeUpload(file) {
            const renamed = new File([file], videoName + '.mp4', { type: file.type });
            console.log('filerenamed')
            return renamed;
        },

    };
    useEffect(() => {
        fetch('http://localhost:3002/getSignedUrl')
            .then(res => res.json())
            .then(res => {
                console.log(res.data)
                setSignedUrl(res.data[0])
                setVideoName(res.data[1])
            })
    }, [])

    return (
        <>{
            signedUrl &&
            
             <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            }
        </>
    )
};

export default Uploads;
