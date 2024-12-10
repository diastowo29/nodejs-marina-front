// components/ImageUpload.tsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface FileWithPreview extends File {
  preview: string;
}

const ImageUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle the dropped files
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null); // Reset error
    const filesWithPreview = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file), // Create preview for each file
      })
    ) as FileWithPreview[];
    setSelectedFiles(filesWithPreview);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
        'image/*': ['.png', '.jpeg', '.jpg']
    },
    maxFiles: 1, // Allow only 1 image at a time
  });

  // Handle the upload process
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select an image first!');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFiles[0]);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      console.log('Upload success:', data);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active' : ''}`}
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here...</p>
        ) : (
          <p>Drag & drop an image here, or click to select one</p>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        {selectedFiles.length > 0 && (
          <div>
            <h3>Image Preview:</h3>
            {selectedFiles.map((file, index) => (
              <Image
                key={index}
                src={file.preview}
                alt="Image preview"
                width={200}
                height={200}
              />
            ))}
          </div>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            cursor: uploading ? 'not-allowed' : 'pointer',
          }}
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
