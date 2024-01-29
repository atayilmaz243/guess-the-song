import { useEffect, useState } from "react";
import { Loading, shuffle } from './common';
import "../animations.css";


let source, gainNode;

function SelectButton({name,setUserChoice,UserChoice})
{
  return <>
    <div className="w-80 text-gray-300 bg-neutral-800 font-semibold flex relative items-center justify-center pb-2 pt-2 rounded-lg cursor-pointer" style = {(UserChoice === name ? {} : {} )} onClick = {() => {setUserChoice(name)}}>
      <div className = "font-medium">
        {name}
      </div>
      {UserChoice === name && 
      <img className = 'w-6 h-6 absolute -left-8' src = "https://storage.googleapis.com/musics_for_guess_the_song/logo.gif" alt = ""/>
      }
    </div>
  </>;
}

async function LoadAudio(link,audioContext)
{
  // Initialize audio context
  gainNode = audioContext.createGain();

  // Load audio file
  fetch(link)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 2);  // 2 seconds

      source.start();
    })
    .catch(e => console.error(e));
}

const nextRound = (setScore,score,UserChoice,info,setRound,round,audioContext) => {
  if (UserChoice === info.answer)
  {
    setScore(score+1);
  }
  if (source && audioContext && gainNode) {
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);  // Current volume
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 3);  // Fade to 0 in 2 seconds
    
    // Stop the audio after 2 seconds
    setTimeout(() => {
      source.stop();
    }, 3000);
  }

  setTimeout(() => {
    setRound(round+1);
  },3000);

};


export function PlayRound({info,setScore,score,setRound,round,audioContext})
{
  const [count,setCount] = useState(12);
  const [UserChoice,setUserChoice] = useState(null);
  const [choices,setChoices] = useState(null);


  useEffect(() => {

    LoadAudio(info.link,audioContext);
    // console.log(info);
    const list = [info.answer,info.wchoice1,info.wchoice2,info.wchoice3];
    shuffle(list);
    setChoices(list);
    // eslint-disable-next-line 
  },[]);

  useEffect(() => {

    if (count === 0)
    {
      nextRound(setScore,score,UserChoice,info,setRound,round,audioContext);
    }
    else {
      setTimeout(() => {
        setCount(count-1);
      },1000);
    }
  // eslint-disable-next-line 
  },[count])

  

  return (<>
    <div className = 'flex flex-col items-center justify-center gap-2'>
      <div className = ' text-white text-2xl' style={(count >= 4 ? {color : 'rgb(74 222 128)'} : {color : 'rgb(239 68 68)'})}>
        {count}
      </div>
      <div className = "h-40 flex relative flex items-center justify-center">
            <div className = "w-80 flex justify-center text-gray-300 text-xl font-medium blur-effect" style={(count === 0 ? { filter: 'blur(0px)' } : {})}>
              {count === 0 ? info.answer : '...Dont try to cheat :)...'}
            </div>
      </div>
      { !choices ? <Loading /> :
        <>
        <div className = 'flex flex-col justify-start items-start gap-2'>
          <SelectButton name = {choices[0]} setUserChoice = {setUserChoice} UserChoice={UserChoice}/>
          <SelectButton name = {choices[1]} setUserChoice = {setUserChoice} UserChoice={UserChoice}/>
          <SelectButton name = {choices[2]} setUserChoice = {setUserChoice} UserChoice={UserChoice}/>
          <SelectButton name = {choices[3]} setUserChoice = {setUserChoice} UserChoice={UserChoice}/>
        </div>
        </>
      }

    </div>
  </>);
}