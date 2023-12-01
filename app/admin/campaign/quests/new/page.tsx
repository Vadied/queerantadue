import CreateForm from '@/ui/admin/campaign/quests/createForm';

const Page = async () => {
  return (
    <>
      <div className="bg-background-light p-5 rounded font-bold test-test-light w-full">
        Crea la domanda
      </div>
      <div className="flex-grow bg-background-light p-5 rounded">
        <CreateForm />
      </div>
    </>
  );
};

export default Page;