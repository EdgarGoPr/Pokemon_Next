import { useRouter } from "next/router"
import search from "@/pages/api/get/get_name_poke";

export default function Nav({ handleSearch, query }) {
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
        <input
          type='text'
          value={query}
          onChange={handleSearch}
        />
      </div>
      <div>
        <h1>filter 1</h1>
      </div>
      <div>
        <h1>filter 2</h1>
      </div>
    </>
  )
}