

import { useState } from "react";

const useUploadImagee = () => {
    const [image, setImage] = useState('/img/placeholder.jpg');

    
    const handleFile = (e) => {
    const uploaderFile = e.target.files[0];
       
       const reader = new FileReader();
       reader.readAsDataURL(uploaderFile);
       reader.onload = function(){
        setImage(reader.result)
       }
    }

    return {
        image, handleFile
    }
}

export default useUploadImagee;