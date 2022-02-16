import './App.css';
import styled from 'styled-components';
import NavBar from './components/UI/NavBar';
import EventsView from './components/Events/EventsView';
import LightBackground from './assets/light.svg';
import DarkBackground from './assets/dark.svg';
import { useState } from 'react';

const App = (props) => {
  const [verified, setVerified] = useState(false);
  const [lightmode, setLightmode] = useState(null);

  const toggleVerified = async (val) => {
    await setVerified(val);
    console.log(verified);
  }

  const toggleMode = () => {
    setLightmode(!lightmode);
  }

  return(
    <MainContent lightmode={lightmode}>
      <NavBar toggleVerify={toggleVerified} toggleMode={toggleMode} mode={lightmode}/>
      <EventsView verified={verified} mode={lightmode} toggleVerify={toggleVerified}/>
    </MainContent>
  );
}

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100vh;

  transition: all 1s ease;
  background-image: url(${props => props.lightmode ? LightBackground : DarkBackground});
  
  overflow-x: hidden;
`

export default App;
