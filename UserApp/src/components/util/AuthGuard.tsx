import  Router  from 'next/router';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: Props){
  useEffect(() => {
    const item = localStorage.getItem('user');
    if (!item) Router.push('/');
  }, []);
  return (<>{children}</>);
}
