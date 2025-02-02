import Image from 'next/image';

async function UserInfo({ user }) {
  if (!user) {
    return <div className="text-center mt-3">User not found.</div>;
  }

  return (
    <div className="flex flex-col items-center mt-10 md:mt-20">
      <div>
        <Image
          src={user?.image || '/default.jpg'}
          alt="user-photo"
          width={100}
          height={100}
          className="rounded-full h-32 w-32"
        />
      </div>
      <div className="text-center mt-3 text-md md:text-lg">
        <div className="uppercase">{user?.name}</div>
        <div>Email : {user?.email}</div>
      </div>
    </div>
  );
}

export default UserInfo;
