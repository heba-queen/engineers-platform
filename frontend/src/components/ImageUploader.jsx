import defaultImg from '../assets/img/flat-color-icons_add-image.png';
import { imageUrl } from "../static/urls";
const ImageUploader = ({images, setImages , imagesPreview ,setImagesPreview}) => {

  console.log(images)

  const handleImageChange = (index, file) => {
    const updatedImages = [...images];
    const updateImagesPreview = [...imagesPreview]
    updatedImages[index] = file;
    updateImagesPreview[index] = URL.createObjectURL(file)
    setImages(updatedImages);
    setImagesPreview(updateImagesPreview)
  };

  return (
    <div className="formgroup">
      <label>Add Image: <span style={{ color: "#F81212" }}>*</span></label>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {images.map((src, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "5px", background: "rgba(251, 245, 213, 0.25)", width: "150px" }}>
            <label htmlFor={`image${index + 1}`}>
              <img
                src={ (typeof src == "string") ?  imageUrl + 'media/' + src : imagesPreview[index] || defaultImg}
                alt={`Preview ${index + 1}`}
                style={{ width: "120px", height: "100px", cursor: "pointer" }}
              />
            </label>
            <input
              type="file"
              id={`image${index + 1}`}
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files[0])}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
