import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSignedImageURL, retrievePost, updatePost } from '../../../features/post/postSlice';
import axios from 'axios';
import UpdateLoader from './UpdateLoader';

function ReportUpdateCard({ adminMessage }) {
    const { post } = useSelector(state => state.post);
    const dispatch = useDispatch();
    const [updating , setUpdating ] = useState(false);
    const [postTitle, setPostTitle] = useState(post?.title);
    const [postDescr, setPostDescr] = useState(post?.description);
    const [postImage, setPostImage] = useState([
        ...post?.images?.map((image) => ({
            url: image.url,
            type: "existing"
        }))
    ]);
    const fileInputRef              = useRef(null);

    async function handleSubmit() {
        setUpdating(true);
        const uploadPromise = postImage.map( async (image) => {
            if(image.type === "new"){
                const { file }     = image
                const {name, type} = file;
                const uploadResult = await dispatch(getSignedImageURL({fileName: name, fileType: type})).unwrap();
                const { signedUrl, path } = uploadResult;
                const result = await axios.put(signedUrl, file , {
                    headers: {'Content-Type': type}
                })
                
                if (!result) {
                    throw new Error(`Failed to upload ${file.name}`);
                }
                return path;
            } else {
                const imgUrl = image.url
                const url = new URL(imgUrl);
                // path looks like: /storage/v1/object/sign/post-images/123/file.png
                const parts = url.pathname.split("/");

                // Find bucket index
                const bucketIndex = parts.indexOf("post-images");
                if (bucketIndex === -1) return null;

                // File path = everything after bucket name
                const filePath = parts.slice(bucketIndex + 1).join("/");
                return decodeURIComponent(filePath); // handle spaces, special chars
            }
        });
        const uploadPaths = await Promise.all(uploadPromise);
        dispatch(updatePost({
            postId     : post.id,
            title      : postTitle,
            description: postDescr,
            images     : uploadPaths
        }))
        setUpdating(false);
        dispatch(retrievePost(post.id))
    }

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            files.forEach(file => {
                if(file.type != "existing"){
                    if(file.type.startsWith("image/")){
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            setPostImage(prevImages => [...prevImages, { url: event.target.result, file, type: "new" }]);
                        };
                        reader.readAsDataURL(file);
                    }
                }
            });
        }
    };
    
    const handleRemoveImage = (indexToRemove) => {
        setPostImage(postImage.filter((_, index) => index !== indexToRemove));
    };
    return (
        <React.Fragment>
            <div className="report-update-card">
                <h3 className="report-update-card-header">
                    Action Required
                </h3>
                <div className="admin-request-box">
                    {
                        adminMessage
                    }
                </div>
                <div className="update-form-group">
                    <label htmlFor="" className='update-form-label'>Title</label>
                    <input type="text" value={postTitle} className='update-form-input' onChange={(e) => setPostTitle(e.target.value)} />
                </div>
                <div className="update-form-group">
                    <label htmlFor="" className='update-form-label'>Description</label>
                    <textarea name="" id="" value={postDescr} className='update-form-input update-form-textarea' onChange={(e) => setPostDescr(e.target.value)}></textarea>
                </div>
                <div className="update-form-group">
                    <label className="update-form-label">Images</label>
                    <div className="image-uploader-grid">
                        {postImage?.map((img, index) => (
                            <div key={index} className="image-thumbnail-wrapper">
                                <img src={img.url} alt={img.alt} className="image-thumbnail" />
                                <button onClick={() => handleRemoveImage(index)} className="remove-img-btn">&times;</button>
                            </div>
                        ))}
                        <button className="add-img-btn" onClick={() => fileInputRef.current.click()}>+</button>
                    </div>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleImageUpload} multiple />
                </div>
                <button onClick={handleSubmit} className="btn-resubmit">Update & Resubmit for review</button>
            </div>
            {
                updating && <UpdateLoader />
            }
        </React.Fragment>
    )
}

export default ReportUpdateCard