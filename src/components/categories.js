
import React from "react";
import { useNavigate } from "react-router-dom";
export function Categories({initAudio})
{
  const navigate = useNavigate();
  return (
    <>

      <div className = "w-screen h-screen flex flex-col items-center justify-center bg-neutral-900">

        <div className = 'text-gray-200 text-2xl font-medium'>
          Please choose one of the musician or a group
        </div>
        <div className = 'grid grid-cols-3 gap-10 mt-20'>

          <div className = "w-40 h-40 flex relative flex-col items-center justify-center cursor-pointer" onClick = {() => {initAudio();navigate('/play/Daft%20Punk');}}>
            <img className = "w-full h-full rounded-lg object-cover" src = "https://storage.googleapis.com/musics_for_guess_the_song/daft-punk%20logo" alt = ""/>

            <div className = "absolute bottom-0 right-2 text-white font-bold backdrop-blur-md">
              Daft Punk
            </div>
          </div>

          <div className = "w-40 h-40 flex relative flex-col items-center justify-center cursor-pointer" onClick = {() => {initAudio();navigate('/play/Eminem');}}>
            <img className = "w-full h-full rounded-lg object-cover" src = "https://storage.googleapis.com/musics_for_guess_the_song/eminem.jpeg" alt = ""/>

            <div className = "absolute bottom-0 right-2 text-white font-bold">
              Eminem
            </div>
          </div>


          <div className = "w-40 h-40 bg-neutral-950 rounded-lg flex relative flex-col items-center justify-center cursor-pointer">
          </div>

          <div className = "w-40 h-40 bg-neutral-950 rounded-lg flex relative flex-col items-center justify-center cursor-pointer">
          </div>


          <div className = "w-40 h-40 bg-neutral-950 rounded-lg flex relative flex-col items-center justify-center cursor-pointer">
          </div>

          <div className = "w-40 h-40 bg-neutral-950 rounded-lg flex relative flex-col items-center justify-center cursor-pointer">
          </div>

          {/* <button className = 'text-lg border-solid rounded border-2 pl-4 pr-4 pt-2 pb-2'>
            Eminem
          </button> */}
        </div>


      </div>
  
  
    </>
  );
}