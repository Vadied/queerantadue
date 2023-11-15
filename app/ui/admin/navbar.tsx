'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

import profileImg from '@/assets/images/logo512.png';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleSignOut = () => {
    setToggleDropdown(false);
    signOut();
  };

  return (
    <nav className="flex justify-between w-full mb-16 pt-3 pl-4 pr-4">
      <Link href="/admin" className="flex gap-2 items-center">
        <Image
          alt="Logo Queerantadues"
          src={profileImg}
          width={32}
          height={32}
          className="object-contain"
        />
        <p className="logo_text">Queerantadue</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        <div className="flex gap-3 items-center md:gap-5">
          <Link href="/admin/users">Users</Link>

          {session?.user && (
            <>
              <Link href="/admin/quarantatre">Quarantatre</Link>
              <button type="button" onClick={handleSignOut}>
                Sign Out
              </button>
              <Link href="/admin/profile">
                <Image
                  src={profileImg}
                  width={37}
                  height={37}
                  alt="profile image"
                  className="rounded-full"
                />
              </Link>
            </>
          )}
          {!session?.user && (
            <button type="button" onClick={() => signIn('google')}>
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user && (
          <div className="flex">
            <Image
              src={profileImg}
              width={37}
              height={37}
              alt="profile image"
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown absolute top-10 right-0 bg-white rounded-md shadow-lg">
                <Link
                  href="/admin/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
        {!session?.user && (
          <button type="button" onClick={() => signIn('google')}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
