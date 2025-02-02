import getCurrentUser from '../_actions/getCurrentUser';
import UpdateName from './_components/UpdateName';
import UserInfo from './_components/UserInfo';

async function Page() {
  const user = await getCurrentUser();

  return (
    <div className="w-full overflow-y-scroll scrollbar-none h-full">
      <UserInfo user={user} />
      <UpdateName user={user} />
    </div>
  );
}

export default Page;
