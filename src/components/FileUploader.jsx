/* eslint-disable react/prop-types */
import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

const FileUploader = ({ details, setDetails, Icon, uploadText, height, acceptFileType }) => {
    const [fileUrl, setFileUrl] = useState(null);

    useEffect(() => {
        if (details.file)
            setFileUrl(details.file)
    }, [details.file]);

    const handleImagesSubmit = (e) => {
        e.preventDefault()
        setDetails({ ...details, file: e.target.files[0] });
    }

    const removeFile = () => {
        setDetails({ ...details, file: null })
        setFileUrl(null)
    }

    return (
        <div className="relative">
            <label className={`${height ? height : "h-[200px]"} cursor-pointer flex flex-col w-full items-center gap-1 justify-center border-2 border-dashed border-gray-400 rounded-[6px] p-2 text-2xl text-gray-600 bg-white`}>
                <input
                    type="file"
                    multiple
                    className="hidden"
                    id="images"
                    accept={acceptFileType}
                    onChange={handleImagesSubmit}
                />
                {fileUrl ? fileUrl?.type === "application/pdf" ? (
                    <embed src={typeof (fileUrl) === "string" ? fileUrl : URL.createObjectURL(fileUrl)} alt="Uploaded" className="w-full object-cover overflow-hidden" />
                ) : (
                    <img src={typeof (fileUrl) === "string" ? fileUrl : URL.createObjectURL(fileUrl)} alt="Uploaded" className="w-full object-cover overflow-hidden" />
                ) : (
                    <>
                        {Icon}
                        <p className="text-sm">{uploadText}</p>
                    </>
                )}
            </label>

            {details.file && <Grid sx={{ width: "100%", display: "flex", justifyContent: "end", pt: "10px" }}>
                <Button onClick={removeFile} variant='outlined'>Remove File</Button>
            </Grid>}
        </div>
    );
}

export default FileUploader;
