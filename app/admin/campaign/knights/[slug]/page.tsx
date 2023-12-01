import Image from 'next/image';

import noProfile from '@/assets/images/no_profile.png';

import { getData } from '@/lib/campaign/quests/data';
import UpdateForm from '@/ui/admin/campaign/knights/updateForm';

type Props = {
  params: {
    slug: string;
  };
};
const Page = async ({ params }: Props) => {
  const { slug } = params;
  const data = await getData(slug);
  if (!data)
    return (
      <div className="w-full text-center">Nessun avventuriero trovato</div>
    );

  return (
    <div className="flex gap-8">
      <div className="bg-background-light p-5 rounded font-bold test-test-light">
        {data.name} {data.surname}
      </div>
      <div className="flex-grow bg-background-light p-5 rounded">
        <UpdateForm data={data} />
      </div>
    </div>
  );
};

export default Page;
