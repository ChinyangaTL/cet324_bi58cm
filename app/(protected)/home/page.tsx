import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";
import Update2FA from "@/components/update-2fa";

// TODO: CIRCLE BACK TO THIS ERROR (ONLY SEEN IN PROD)
// ⨯ [Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error.] {
//   digest: 'DYNAMIC_SERVER_USAGE',
//   page: '/home'
// }

const HomePage = async () => {
  const session = await auth();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {JSON.stringify(session)}

      <Update2FA user={session?.user!} />

      <LogoutButton />
    </div>
  );
};

export default HomePage;
