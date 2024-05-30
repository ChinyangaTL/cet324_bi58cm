import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";

const HomePage = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <LogoutButton />
    </div>
  );
};

export default HomePage;
