import React from 'react'
import { auth,googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword,signInWithPopup,signOut } from 'firebase/auth';
import {useState} from 'react';
const Auth = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  console.log(auth?.currentUser?.email);
  const signin=async()=>{
    try{
      await createUserWithEmailAndPassword(auth,email,password);
    }
    catch(err){
      console.log(err);
    }
  }

  const signInWithGoogle=async()=>{
    try{
      await signInWithPopup(auth,googleProvider);
    }
    catch(err){
      console.log(err);
    }
  }

  const logout=async()=>{
    try{
      await signOut(auth);
    }
    catch(err)
    {
      console.log(err);
    }
  }

  return (
    <div>
        <input placeholder='Email...' onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <input placeholder='Password...'value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={signin}>Sign in</button>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
        <button onClick={logout}>LogOut</button>
    </div>
  )
}

export default Auth;