'use client';

import { useEffect, useState } from 'react';
import {
  signIn,
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
    <div className="flex flex-col gap-4 items-center mb-8">
      {providers &&
        Object.values(providers)
          .filter((provider) => provider.name !== 'Email')
          .map((provider) => (
            <div key={provider.name}>
              <button
                type="button"
                onClick={() => signIn(provider.id, { callbackUrl: '/admin' })}
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
