import React, { useEffect, useState } from 'react';
import { PlayRound } from './round';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase';
import {getDoc,doc} from 'firebase/firestore/lite';
import { Loading, shuffle } from './common';


// const data = 
// [
//  {link : './musics/zelda.mp3',answer : 'Zelda',s1 : 'B', s2: 'C' , s3: 'D'},
//  {link : './musics/zelda.mp3',answer : 'Zelda2',s1 : 'B', s2: 'C' , s3: 'D'},
//  {link : './musics/zelda.mp3',answer : 'Zelda3',s1 : 'B', s2: 'C' , s3: 'D'},


// ]; 

const roundCount = 3;

async function fetchData(setData,musician) {
  const docRef = doc(db,'musicians',musician);
  const docSnap = await getDoc(docRef);
  // add error check later here
  let IdList = docSnap.data().musicsID;
  shuffle(IdList);
  const latest = Math.min(IdList.length,roundCount);
  IdList = IdList.slice(0,latest);

  const dataPromise = await Promise.all(IdList.map(async id => {
    const ref = doc(db,'musics',String(id));
    const result = await getDoc(ref);
    return result.data();
  }));

  setData(dataPromise);
}

const Play = ({audioContext}) => {
  const [score,setScore] = useState(0);
  const [round,setRound] = useState(0);
  const [data,setData] = useState(null);
  const navigate = useNavigate();

  const { musician } = useParams();


  // fetching the data 
  useEffect(() => {
    if (!audioContext)
    {
      navigate('/')
    }
    fetchData(setData,musician);
    // eslint-disable-next-line
  },[]);


  return (
    <div className = 'w-screen h-screen flex flex-col items-center justify-center bg-neutral-900'>
      {!data ? <Loading /> :
      (data.length !== round ? 
        <>
        <div className = "flex flex-col mb-10">
            <div className = 'font-bold text-xl text-sky-400 font-mono flex'>
              Guess <div className = 'ml-12 text-yellow-300'>{round+1}/{roundCount}</div>
            </div>
            <div className = 'font-bold text-3xl text-sky-400 font-mono'>
              the Song
            </div>
        </div>
        <PlayRound key = {round} audioContext = {audioContext} info = {data[round]} setScore={setScore} setRound = {setRound} score = {score} round = {round}/>
        </> 
      :
        <>
          <div className = "text-white text-3xl">
            Congratulations 👏
          </div>
          <p className = 'mb-3 text-white'>Your final score is {score}</p>
          <button className = 'w-52 bg-neutral-800 pl-4 pr-4 pt-2 pb-2 mb-5 rounded text-gray-300 mt-20' onClick = {() => {setRound(0); setScore(0)}}>Retry</button>
          <button className = 'w-52 bg-neutral-800 pl-4 pr-4 pt-2 pb-2 rounded text-gray-300' onClick = {() => {navigate('/guess-the-song')}}>Return to main menu</button>

        </>
      )}
  </div>
  );
};

export default Play;
