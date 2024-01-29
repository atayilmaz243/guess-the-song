
import React from "react";
import { useNavigate } from "react-router-dom";



export function Home({initAudio})
{
  const navigate = useNavigate();
  return (
    <>
      <div className = 'w-screen h-screen bg-neutral-900 flex flex-row justify-center items-center gap-12'>
          <div className = "flex flex-col">
            <div className = 'font-bold text-xl text-sky-400 font-mono'>
              Guess
            </div>
            <div className = 'font-bold text-3xl text-sky-400 font-mono'>
              the Song
            </div>
          </div>
          <div className = 'flex flex-col gap-4 items-start justify-start'>
            <button className = 'text-lg text-gray-300 text-2xl pt-2 pb-2 hover:underline' onClick = {() => {initAudio();navigate('/play/Mixed')}}>
              Play Mixed
            </button>

            <button className = 'text-lg text-gray-300 text-2xl pt-2 pb-2 hover:underline' onClick = {() => {initAudio();navigate('/categories')}}>
              Choose musician
            </button>

            <button className = 'text-lg text-gray-300 text-2xl pt-2 pb-2 hover:underline' onClick = {() => {window.location.href = 'https://github.com/atayilmaz243';}}>
              Github
            </button>

          </div>
      </div>
    </>
  );
}