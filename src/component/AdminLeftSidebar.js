'use client';
import logo from "../../public/jkd-icon.png"
import text from "../../public/logo-text.png"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md"
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { useGlobal } from "@/context/GlobleContext";
import axiosInstance from "@/lib/axios";

const AdminLeftSidebar = ({ className = "" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { dispatch } = useGlobal();
  const menu = [
    { path: "/admin", label: "Dashboard", icon: "/icons/layout-dashboard.svg" },
    { path: "/admin/apply", label: "Courses", icon: "/icons/applyForm.svg" },
    { path: "/admin/booking", label: "Bookings", icon: "/icons/applyForm.svg" },    
    { path: "/admin/job", label: "Jobs", icon: "/icons/applyForm.svg" },
    { path: "/admin/events", label: "Events", icon: "/icons/applyForm.svg" }, 
    { path: "/admin/profile", label: "Profile", icon: "/icons/profile.svg" },
  ];

const logout = async () => {
  try {
    const response = await axiosInstance.post("/api/auth/logout");

    if (response.status != 200) {
      toast.error(response.data.message || "Please Try Again");
      return;
    }
    localStorage.removeItem("globalState");
    dispatch({ type: "LOGOUT" });
    router.push("/");
    toast.success(response.data.message || "Logout Successfully");
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Something went wrong with logout");
  }
};

  return (
    <aside className={`flex min-h-full w-[276px] self-stretch flex-col justify-between border-r border-black/5 bg-[#cfdad7] px-3 py-4 text-[#111827] shadow-[0_0_0_1px_rgba(255,255,255,0.35)_inset] ${className}`}>
      <div className="space-y-6">
        <div className="flex items-center px-1 pt-1">
          <div className="relative h-14 w-20 shrink-0">
            <Image src={logo} alt="JKD Pakistan" fill sizes="48px" className="object-cover" />
          </div>
          <div className="relative h-20 w-[108px] ">
            <Image src={text} alt="JKD Pakistan" fill sizes="108px" className="object-cover" />
          </div>
        </div>

        <nav className="space-y-6">
          {menu.map((item) => (
            <Link
              href={item.path}
              key={`${item.label}-${item.path}`}
              aria-current={pathname === item.path ? "page" : undefined}
              className={`flex items-center gap-3 w-[236px] h-[60px] rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 ${
                pathname === item.path
                  ? " bg-[#DEE6E4] text-[#0f172a] shadow-sm"
                  : " bg-[#DEE6E4] text-[#111827] shadow-[0_1px_2px_rgba(16,24,40,0.04)] hover:-translate-y-0.5 hover:border-[#bdd5cf] hover:bg-white hover:shadow-md"
              }`}
            >
                <span className="relative grid h-7 w-7 place-items-center ml-3">
                  <Image src={item.icon} alt="Admin Page Icon" fill sizes="24px" className="object-cover " />
              </span>
              <span className="leading-none text-[17px]">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="pb-2 pt-6">
        <button
          className="flex items-center cursor-pointer gap-2 rounded-md px-1 py-2 text-[24px] font-medium text-[#FF383C] transition-colors hover:text-[#ff2f2f]"
          onClick={logout}
        >
          <MdLogout  className="text-3xl"/>
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminLeftSidebar;

