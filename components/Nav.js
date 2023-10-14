import { useRouter } from "next/router"
import Search from "./Search";

export default function Nav() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/')
  };

  return (
    <>
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
    <div>
      <Search/>
    </div>
    <div>
      <h1>filter 1</h1>
    </div>
    <div>
      <h1>filter 2</h1>
    </div>
    <div>
      <h1>filter 3</h1>
    </div>
    </>
  )
}