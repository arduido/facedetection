import React from 'react';
import 'tachyons';
import './form.css'
const ImageLinkForm = ({onInputChange, onSubmit}) => {
  return(
    <div>
      <p className="f4 f2-m f1-l tracked-tight roboto">
        {'Faces detected with clarifai!'}
      </p>
      <div className='flex justify-center'>
        <div className='fl w-two-thirds pa4 br3 shadow-5 txtr-bg'>
          <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
          <button
            className='w-30 grow f4 link ph3 pv2 dib ttu white bg-light-red pointer'
            onClick={onSubmit}>detect</button>
        </div>
      </div>
    </div>
  );
}
export default ImageLinkForm;
