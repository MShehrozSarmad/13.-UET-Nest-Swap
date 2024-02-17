import React from 'react'
import { useSearchParams } from 'react-router-dom'
import authService from '../appwrite/authservices';

const Verify = () => {
    const [params]= useSearchParams();
    const secret = params.get('secret');
    const id = params.get('userId');
    console.log(secret);

    const verifyAccnt = async () => {
        try {
            const res = await authService.verifyAccount(id, secret);
            console.log('res => ', res);
        } catch (error) {
            console.log('error => ' ,error)
        }
    }

    verifyAccnt();

  return (
    <div>Verify your account</div>
  )
}

export default Verify