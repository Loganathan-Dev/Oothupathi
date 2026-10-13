import React, { useState } from 'react'

const UploadStep = () => {
  const [files, setFiles] = useState([])

  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files])
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-dark-900">Step 6: Upload Files</h2>
          <p className="text-dark-600">Upload designs, specifications, or reference images</p>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <input
            type="file"
            multiple
            className="hidden"
            id="file-upload"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="text-4xl mb-3">📁</div>
            <p className="text-dark-600">Click to upload or drag and drop</p>
            <p className="text-sm text-dark-400">Supported files: PDF, JPG, PNG, DXF, STL</p>
          </label>
        </div>
        {files.length > 0 && (
          <div className="mt-4">
            <p className="font-medium text-dark-800">Uploaded files:</p>
            <ul className="list-disc list-inside text-dark-600">
              {Array.from(files).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default UploadStep;