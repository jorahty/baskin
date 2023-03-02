import  Router  from 'next/router';
import { useEffect } from 'react';
import { useAppContext } from '../context';

interface Props{
  children: React.ReactNode;
}
export default function AuthGuard({ children }: Props){
  const { signedInUser } = useAppContext();

  useEffect(() => {
    if (!signedInUser) {
      Router.push('/');
    }
  }, [signedInUser]);
  return(

    <> {children} </>
  );
}

