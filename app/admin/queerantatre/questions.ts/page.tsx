import { getData } from '@/lib/queerantatre/categories/data';
import CreateForm from '@/ui/admin/queerantatre/questions/create';

const Page = async () => {
  const categories = await getData();

  return (
    <div>
      <CreateForm categories={categories} />
    </div>
  );
};

export default Page;
