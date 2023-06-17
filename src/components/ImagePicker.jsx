import React, { useState } from "react";
import '../css/ImagePicker.css';
import firstImage from '../image/image_2023-06-17_005359888.png';
// Aici presupunem că aveți un array cu URL-urile imaginilor
import secondImage from '../image/image_2023-06-17_011506203.png';
import thirdImage from '../image/image_2023-06-17_011722955.png';
import Image4 from '../image/image_2023-06-17_011919428.png';
import Image5 from '../image/638dfe68d3dcc56e359db13d_1-phoenixes-nft-min.png';
import Image6 from '../image/Mutant-Demon-Ape-Credit-0xb1-copy-H-2021.jpg';
import Image7 from '../image/17f8d1d1d35c088f82726a2efc6f0edf.jpg';
import Image8 from '../image/nft-header-1.jpg';
import Image9 from '../image/monkey-g412399084_1280.webp';
import Image10 from '../image/0x0.webp';
import Image11 from '../image/4e2ad96337433ce177bfb2ef126c1242.jpg';
import Image12 from '../image/M2fRj5XjTXEH51QfSjEkCdFoWU6PT8U5EwfNzzW6PUc.png';
import Image13 from '../image/623dc283093c4d001804f7d0.webp';
import Image14 from '../image/images.jpg';
import Image15 from '../image/1.png';
import Image16 from '../image/unnamed.png';
import Image17 from '../image/crazy-rich-apes_O5HjIgu63m738J63.webp';
import Image18 from '../image/images (1).jpg';
import Image19 from '../image/crypto-chicks-NFT-pfp-project-960x960.jpg';
import Image20 from '../image/1676683220971_duv331oyy4m5h9l167d47a3hpp00trep_600x600.jpeg';
import Image21 from '../image/carnft_102.jpg';
import Image22 from '../image/FHw981B5adJwberjEEH5xgyHPge3_jx7UivupQM5y70.png';
import Image23 from '../image/unnamed (1).png';
import Image24 from '../image/6186caad8ea18c5a181b9fd0_1-girl.jpg';
const images = [firstImage, secondImage, thirdImage, Image4, Image5, Image6, Image7, Image8, Image9, Image10, Image11, Image12, Image13, Image14, Image15, Image16, Image17, Image18, Image19, Image20, Image21, Image22, Image23, Image24];

function ImagePicker({ onSelect, onClose }) {
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image) => {
    setSelectedImage(image);
    onSelect(image);
  };

  return (
    <div className="image-picker">
      <button className="close-button" onClick={onClose}>X</button>
      <div className="images-grid">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            className={`image-item ${image === selectedImage ? "selected" : ""}`}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImagePicker;
