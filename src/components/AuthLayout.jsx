import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { clearPosts } from '../store/postSlice';


export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector(state => state.authslc.status);

  useEffect(() => {
    if (authentication && authentication !== authStatus) {
      navigate('/signin');
    //   dispatch(clearPosts()); // clear posts when authStatus changes
    } else if (!authentication && authentication !== authStatus) {
      // navigate('/');
    //   dispatch(clearPosts()); // clear posts when authStatus changes
    }
    setLoader(false);
  }, [navigate, authentication, authStatus, dispatch]); 

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}