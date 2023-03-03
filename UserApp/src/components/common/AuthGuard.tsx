import  Router  from 'next/router';
import { useEffect } from 'react';
import { useAppContext } from '../../context';

interface Props {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: Props){
  const { signedInUser } = useAppContext();

  useEffect(() => {
    const item = localStorage.getItem('user');
    if (item) return;
    if (!signedInUser) Router.push('/');
  }, [signedInUser]);

  return (<>{children}</>);
}
