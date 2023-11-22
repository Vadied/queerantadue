import { QueerantatreProvider } from '@/contexts/queerantatre';
import { getAllData } from '@/lib/queerantatre/categories/data';
import CreateForm from '@/ui/admin/queerantatre/questions/createForm';

const Page = async () => {
  return (
    <QueerantatreProvider >
      <div className="bg-background-light p-5 rounded font-bold test-test-light w-full">
        Crea la domanda
      </div>
      <div className="flex-grow bg-background-light p-5 rounded">
        <CreateForm />
      </div>
    </QueerantatreProvider>
  );
};

export default Page;
