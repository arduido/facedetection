import React from 'react';
import 'tachyons';
import './FaceRecognition.css'
const FaceRecognition = ({ imageUrl, box }) => {
  return(
    <div>

      <div className='flex justify-center ma'>
        <div className='absolute mt2'>
          <img id='inputImage' src={imageUrl} alt='faces to be detection' width='500px' height='auto' />
          <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        </div>
      </div>

    </div>
  );
}
export default FaceRecognition;
