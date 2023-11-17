'use client';

import { useEffect, useState } from 'react';
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';

const LoginForm = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null>(null);

  const handleProviders = async () => {
    const providers = await getProviders();
    setProviders(providers);
  };

  useEffect(() => {
    handleProviders();
  }, []);

  return (
    <div className="bg-background-lighter rounded p-10 flex flex-col gap-4">
      <div className='text-center'>Entra nella dashboard</div>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              type="button"
              onClick={() => signIn(provider.id)}
              className="px-2 py-1 rounded text-text border-none bg-button-primary"
            >
              Log in con {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
};

export default LoginForm;
