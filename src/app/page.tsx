import { isLoggedIn } from "@/actions/session";
import Logout from "@/ui/Logout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {

  const cookieStore = cookies()
  const session = cookieStore.get('session')
  const isLoggedin = await isLoggedIn(session?.value)

  if (!isLoggedin) {
    return redirect('/login')
  }
  return (
    <main>
      <Logout />
      Dashboard
    </main>
  );
}
