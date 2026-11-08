import {Show,SignInButton, SignOutButton} from '@clerk/astro/react'
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

const Login = () => {
    const [currentUrl,setCurrentUrl]  = useState('')
    useEffect(()=>{
        setCurrentUrl(window.location.href);
    },[])
  return (
    <>
      <Show when="signed-out">
        <SignInButton mode="modal" signUpForceRedirectUrl={currentUrl}>
          <Button className=" translate-y-1 cursor-pointer md:translate-y-0">
            Login
          </Button>
        </SignInButton>
      </Show>
      
    </>
  );
}
export default Login