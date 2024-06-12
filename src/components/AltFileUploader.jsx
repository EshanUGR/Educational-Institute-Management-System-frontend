/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const AltFileUploader = ({ onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const onDrop = (acceptedFiles) => {
        setSelectedFile(acceptedFiles[0]);
        onFileUpload(acceptedFiles[0]); // Pass the file to parent component
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: ['image/*', 'application/pdf'],
        onDrop,
    });

    return (
        <div {...getRootProps()} style={dropzoneStyles}>
            <input {...getInputProps()} />
            <p>Drag drop some files here, or click to select files</p>
            {selectedFile && (
                <p>
                    Selected file: {selectedFile.name} ({selectedFile.size} bytes)
                </p>
            )}
        </div>
    );
};

const dropzoneStyles = {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
};

export default AltFileUploader;