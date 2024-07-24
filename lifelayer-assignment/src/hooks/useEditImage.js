

import { useState } from "react";

const useEditImage = () => {
    const [image, setImage] = useState(false);
    
    const [editImage, setEditImage] = useState(false);

    
    const handleFile = (e) => {
    const uploaderFile = e.target.files[0];
       
       const reader = new FileReader();
       reader.readAsDataURL(uploaderFile);
       reader.onload = function(){
        setImage(reader.result)
        setEditImage(true)
       }
    }

    return {
        image, handleFile, editImage
    }
}

export default useEditImage;