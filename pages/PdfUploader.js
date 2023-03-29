
import { useState, useRef, useEffect } from 'react'
import axios from 'axios';

function PdfUploader() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);


    const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleFileDrop = (event) => {
      event.preventDefault();
      setSelectedFile(event.dataTransfer.files[0]);
    };
  
    const handleFileUpload = async () => {
        if (!selectedFile) {
          return;
        }
    
        setUploading(true);
    
        const formData = new FormData();
        formData.append('file', selectedFile);
    
        try {
          const response = await axios.post('/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'name': 'pdfFile'
            },
            onUploadProgress: (progressEvent) => {
              setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            }
          });
    
          console.log(`File "${selectedFile.name}" uploaded successfully!`);
          console.log(response.data);
    
          setSelectedFile(null);
          setUploading(false);
          setUploadProgress(0);
        } catch (error) {
          console.error(`Error uploading file "${selectedFile.name}"`, error);
          setUploading(false);
          setUploadProgress(0);
        }
      };
    
  
    return (
      <div
        className="pdf-uploader"
        onDrop={handleFileDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <label htmlFor="pdf-upload" className="pdf-uploader__label"> 
            <span className="pdf-uploader__icon">+</span> Upload PDF
        </label>
        <input
          type="file"
          id="pdf-upload"
          accept='application/pdf'
          className="pdf-uploader__input"
          onChange={handleFileSelect}
        />

        {selectedFile && <p className="pdf-uploader__file">Selected file: {selectedFile.name}</p> } 
          <div>
         
            <button className="pdf-uploader__button" disabled={!selectedFile} onClick={handleFileUpload}>Upload</button>
          </div>
        
      </div>
    );
  }
  
  export default PdfUploader;