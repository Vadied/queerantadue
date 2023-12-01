import CreateForm from '@/ui/admin/campaign/knights/createForm';

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
