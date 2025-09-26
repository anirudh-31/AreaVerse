import { ImagePlus } from 'lucide-react';
import React from 'react'

function Photos({data, update, next, prev}) {
  const handleFileChange = (e) => {
    const files     = Array.from(e.target.files);
    const newImages = [...data.images];

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
              newImages.push({ file, dataUrl: event.target.result });
              // Update state after the last file is read
              if (newImages.length === data.images.length + files.length) {
                  update('images', newImages);
              }
          };
          reader.readAsDataURL(file);
      }
    });
  }

  const removeImage = (idxToRemove) => {
    const filteredImages = data.images.filter((_, index) => index !== idxToRemove);
    update('images', filteredImages);
  }

  return (
    <div className="form-step active">
      <div className="step-header">
        <h2>Upload Photos</h2>
        <p>A picture is worth thousand words!. (Optional)</p>
      </div>
      <label htmlFor="file-input" className="upload-area">
          <div className="upload-icon">
            <ImagePlus />
          </div>
          <p>
            <strong>Click to upload</strong>
          </p>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            PNG, JPG</span>
      </label>
      <input type="file" id="file-input" multiple accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
      <div className="image-previews">
          {data.images.map((img, index) => (
              <div key={index} className="preview-item">
                  <img src={img.dataUrl} alt="Preview" />
                  <button className="remove-img-btn" onClick={() => removeImage(index)}>&times;</button>
              </div>
          ))}
      </div>
      <div className="form-navigation-buttons">
          <button className="btn btn-prev" onClick={prev}>Previous</button>
          <button className="btn btn-next" onClick={next}>Next</button>
      </div>

    </div>
  )
}

export default Photos