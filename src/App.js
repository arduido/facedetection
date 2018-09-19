import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import Particles from 'react-particles-js';
import ParticleData from './particles';
import Clarifai from 'clarifai';

const particlesOptions = ParticleData
const app = new Clarifai.App({
  apiKey: 'd61c160552ef45dcb354e3f3e0b17963'
});

class App extends Component{
constructor() {
  super();
  this.state = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false
  }
}

calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputImage');
  const width = Number(image.width);
  const height = Number(image.height);
  return{
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

displayFaceBox = (box) => {
  this.setState({box});
  console.log('box',this.state.box);
}
onInputChange = (e) => {
  this.setState({input: e.target.value});
}
onSubmit = () => {
  this.setState({imageUrl: this.state.input});
  //console.log('the set state', this.setState);
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err))
}
onRouteChange = (route) => {
  if (route === 'signout') {
    this.setState({isSignedIn: false})
  }else if (route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route})
}
  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home'
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.input}
            />
            </div>
          : (
            this.state.route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
