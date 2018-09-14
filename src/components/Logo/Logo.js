import React from 'react';
import Tilt from 'react-tilt';
import logo from './logo.png'
const Logo = () => {
  return(
    <div className="ma4 mt0">
      <Tilt className="Tilt shadow-2" options={{max:55}} style={{height: 200, width: 200}} >
        <div className="Tilt-inner">
          <img src={logo} alt="logo" />
        </div>
      </Tilt>
    </div>

  );
}
export default Logo;
