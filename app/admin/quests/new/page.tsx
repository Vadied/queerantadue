import CreateForm from '@/ui/admin/quests/createForm';

const Page = async () => {
  return (
    <div className="">
      <div className="bg-background-light p-5 rounded font-bold test-test-light w-full">
        Crea avventuriero
      </div>
      <div className="flex-grow bg-background-light p-5 rounded">
        <CreateForm />
      </div>
    </div>
  );
};

export default Page;
