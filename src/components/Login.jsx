import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import logo from "../assets/logowhite.png";
import { client } from '../client';
import jwt_decode from "jwt-decode";
const Login = () => {
  const navigate =useNavigate();
  const responseGoogle = (response)=>{
    var decodedHeader = jwt_decode(response.credential); //=>this way works fine
    localStorage.setItem('user',JSON.stringify(decodedHeader));
      const { name, sub, picture } = decodedHeader;
      const doc = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture,
      } 
      
    //   const { clientId, name, imageUrl } = response; //=>this doesn't work but seems to be work this does not save the data in localStorage save as untitled and no image
    // const doc = {
    //   _id: clientId,
    //   _type: 'user',
    //   userName: name,
    //   image: imageUrl,
    // };
      // const { googleId,name, imageUrl} = response.profileObj; //=> tutorial way undefined google id,name.
      // const doc = {
      //   _id: googleId,
      //   _type: 'user',
      //   userName: name,
      //   image: imageUrl
      // }
      client.createIfNotExists(doc)
      .then(()=>{
        navigate('/', { replace:true })
      });
  }
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
    <div className='relative w-full h-full'>
    <video 
      src={shareVideo}
      type='video/mp4'
      loop
      controls={false}
      muted
      autoPlay
      className='w-full h-full object-cover'
    />
    <div className='absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay'>
      <div className='p-5'>
      <img src={logo}  width="130px" alt='logo'/>
      </div>
      <GoogleLogin onSuccess={responseGoogle} onError={responseGoogle} cookiePolicy="single_host_origin" />

      </div>

    </div>
    </div>
  )
}
export default Login;

