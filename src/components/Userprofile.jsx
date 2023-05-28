import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import { googleLogout } from '@react-oauth/google';
import { userQuery, userCreatedPinsQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from '../components/MasonryLayout';
import Spinner from '../components/Spinner';

const Userprofile = () => {

  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('created');
  const [activeBtn, setActiveBtn] = useState('created');

  const navigate = useNavigate();
  const { userId } = useParams();
  const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,wildlife,technology'

  const activeBtnStyle='bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none'
  const notActiveBtnStyle='bd-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none'
  
  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
  }, [userId]);

  useEffect(()=>{
    if(text==='created'){
      const CreatedPinsQuery =userCreatedPinsQuery(userId);
      client.fetch(CreatedPinsQuery)
      .then((data)=>{
        setPins(data);
      })
    }
    else{
      const SavedPinsQuery =userSavedPinsQuery(userId);
      client.fetch(SavedPinsQuery)
      .then((data)=>{
        setPins(data);
      })
    }
  },[text,userId])

    const logout =()=>{
      googleLogout();
      localStorage.clear();
      navigate('/login');
    }

  if (!user) {
    return <Spinner />
  }
  return (
    <div className='relative h-full justify-center items-center pb-2'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className=' flex flex-col justify-center items-center'>
            <img src ={randomImage}
                className='w-full h-370 2xl:h-510 shadow-xl object-cover'
                alt='banner-pic'
            />
            <img className='-mt-10 rounded-full w-20 h-20 shadow-xl object-cover'
            src={user.image} alt='user-pic'/>
            <h1 className='font-bold text-3xl text-center mt-3'>
              {user.userName}
            </h1>
            <div className=' absolute top-0 z-1 right-0 p-2'>
            {userId===user._id &&
            <button type='button'
            className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
             onClick={logout}><AiOutlineLogout color="red" fontSize={21} /></button>
            }
            </div>
          </div>
          <div className='text-center mb-7'>
            <button type='button'
             onClick={(e)=>{
              setText(e.target.textContent);
              setActiveBtn('created');
             }}
             className={`${activeBtn==='created' ? activeBtnStyle :notActiveBtnStyle}`}
             >
              created
            </button>
            <button type='button'
             onClick={(e)=>{
              setText(e.target.textContent);
              setActiveBtn('saved');
             }}
             className={`${activeBtn==='saved' ? activeBtnStyle :notActiveBtnStyle}`}
             >
              saved
            </button>
          </div>
             {pins?.length? <div className='px-2'>
              <MasonryLayout pins={pins}/>
             </div> 
             : (<div className='flex justify-center items-center font-bold w-full text-1xl mt-2'>
              No pins found
             </div>)}
        </div>
      </div>
    
    </div>
  )
}

export default Userprofile;