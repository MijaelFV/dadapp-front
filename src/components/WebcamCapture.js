import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: { exact: "environment" }
};

export const WebcamCapture = () => {

    const [image,setImage]= useState('');
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
    }, [webcamRef]);

    return (
        <>
            <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
            />
            <img src={image} />
            <button onClick={capture}>Capture photo</button>
        </>
    )
}
