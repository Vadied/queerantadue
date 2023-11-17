import Image from 'next/image';

import noProfile from '@/assets/images/no_profile.png';

import { getUser } from '@/lib/users/data';
import UpdateForm from '@/ui/admin/users/updateForm';

type Props = {
  params: {
    slug: string;
  };
};
const Page = async ({ params }: Props) => {
  const { slug } = params;
  const user = await getUser(slug);

  if(!user) return <div className='w-full text-center'>Nessun utente trovato</div>

  return (
    <div className="flex gap-8">
      <div className="bg-background-light p-5 rounded font-bold test-test-light">
        <div className="w-full h-20 relative rounded overflow-hidden mb-5">
          <Image src={user.image || noProfile} alt="User image" fill />
        </div>
        {user.name} {user.surname}
      </div>
      <div className="flex-grow bg-background-light p-5 rounded">
        <UpdateForm user={user} />
      </div>
    </div>
  );
};

export default Page;
