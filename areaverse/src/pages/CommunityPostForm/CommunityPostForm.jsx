import React, { useMemo, useState } from 'react'
import './CommunityPostForm.css';
import PostType from './Components/PostType';
import Photos from './Components/Photos';
import Severity from './Components/Severity'
import Category from './Components/Category';
import Description from './Components/Description';
import Review from './Components/Review';
import { useDispatch, useSelector } from 'react-redux';
import { createNewPost, getSignedImageURL } from '../../features/post/postSlice';
import axios from 'axios';
import ReportSubmissionAnimation from '../../components/PostSubmissionLoader/ReportSubmissionAnimation';
import SuccessWindow from './Components/SuccessWindow';

const stepTitles = {
    issue: ["Post Type", "Upload Photos", "Severity", "Category", "Description", "Review"],
    other: ["Post Type", "Upload Photos", "Category", "Description", "Review"]
};
function CommunityPostForm() {
    const [ currentStep, setCurrentStep ] = useState(1);
    const [ isSubmitted, setIsSubmitted ] = useState(false);
    const [ formData   , setFormData    ] = useState({
        postType   : null,
        images     : [],
        severity   : null,
        category   : null,
        description: '',
        title      : ''
    });
    const [apiResult , setApiResult ] = useState({});
    const [processing, setProcessing] = useState(false);
    const dispatch = useDispatch();
    const {uploading, loading, error} = useSelector((state) => { return state.post});
    // function to handle form data
    const updateFormData = (field, value) => {
        setFormData( prev => ({
            ...prev,
            [field]: value
        }))
    }

    // function to move to the next step.
    const nextStep = () => {
        if(currentStep === 2 && formData.postType !== 'Issue'){
            setCurrentStep(4);
        }else{
            setCurrentStep( prev => prev + 1)
        }
    }

    // function to move to the previous step.
    const previousStep = () => {
        if(currentStep === 4 && formData.postType !== 'Issue'){
            setCurrentStep(2);
        }else{
            setCurrentStep(prev => prev - 1);
        }
    }

    // function to handle form submission.
    const handleSubmit = async () => {
        setProcessing(true)
        if (navigator.vibrate) navigator.vibrate(50);
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
        try{
            const { images } = formData;
            const uploadPromise = images.map( async (image) => {
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
            });
            const uploadPaths = await Promise.all(uploadPromise);
            const report      = await dispatch(createNewPost({
                postType   : formData.postType,
                images     : uploadPaths,
                severity   : formData.severity,
                category   : formData.category,
                description: formData.description,
                title      : formData.title
            })).unwrap();
            setApiResult({
                status: "success",
                type  : formData.postType,
                id    : report.id
            });
            
            setTimeout(() => {
                setIsSubmitted(true);
            }, 2000)
        } catch (err) {
            console.error('Image upload failed:', err);
        }
        setTimeout(() => {
            resetForm();
        }, 5000);
    }
    const resetForm = () => {
        // setCurrentStep(1);
        setProcessing(false);
        // setIsSubmitted(false);
        setFormData({
            postType: null, images: [], severity: null,
            category: null, description: ''
        });
    };

    const reset = () => {
        setCurrentStep(1);
        setIsSubmitted(false);
        setApiResult(null);
    }

    // Memoize progress bar calculations.
    const progressBarConfig = useMemo(() => {
        const isIssue    = formData.postType === 'Issue';
        const titles     = isIssue ? stepTitles.issue : stepTitles.other;
        const totalSteps = titles.length;

        let effectiveCurrentStep = currentStep;
        if(!isIssue && currentStep > 2){
            effectiveCurrentStep = currentStep - 1;
        }

        const progress = ( effectiveCurrentStep - 1 ) / ( totalSteps - 1 ) * 100;
        const title    = `Step ${effectiveCurrentStep} of ${totalSteps}: ${titles[effectiveCurrentStep - 1]}`;
        return { progress, title};
    }, [currentStep, formData.postType]);

    if(isSubmitted){
        return (
            <SuccessWindow setStep={reset} postId={apiResult.id}/>
        )
    }
    
    const renderCurrentStep = () => {
        switch(currentStep){
            case 1: return <PostType    data={formData} update={updateFormData} next={nextStep}/>;
            case 2: return <Photos      data={formData} update={updateFormData} next={nextStep} prev={previousStep}/>;
            case 3: return <Severity    data={formData} update={updateFormData} next={nextStep} prev={previousStep}/>;
            case 4: return <Category    data={formData} update={updateFormData} next={nextStep} prev={previousStep}/>;
            case 5: return <Description data={formData} update={updateFormData} next={nextStep} prev={previousStep}/>;
            case 6: return <Review      data={formData} submit={handleSubmit}   prev={previousStep}/>;
        }
    }
  return (
    <div className="community-form-wizard">
        {
            ( processing ) ? 
            <ReportSubmissionAnimation apiResult={apiResult}/> :
            (
                <div className="progress-bar-container">
                    <div className="progress-text">
                        {progressBarConfig.title}
                    </div>
                    <div className="progress-bar">
                        <div className="progress-indicator"style={{ width: `${progressBarConfig.progress}%` }} />
                    </div>
                    {
                        renderCurrentStep()
                    }
                </div>
            )
        }
    </div>
  )
}

export default CommunityPostForm