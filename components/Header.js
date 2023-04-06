import Link from "next/link";
import styles from "../styles/header.module.css";
import { useRouter } from "next/router";

//component for header section
const Header = () => {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("UserDetails");
    router.push("/");
  };

  return (
    <nav className="bg-info  d-flex flex-row justify-content-between align-items-center px-5 py-3">
      <h1 className="text-light">IMT Blogs</h1>
      <div
        className={`d-flex flex-row justify-content-between ${styles.links}`}
      >
        <Link href="/blogfeed" className={styles.link}>
          Blogs Feed
        </Link>

        <Link href="/createBlog" className={styles.link}>
          Create Blog
        </Link>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
