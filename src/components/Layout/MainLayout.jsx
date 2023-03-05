import Navbar from "../Navigation/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col py-7">
      <Navbar />
      <div className="line"></div>
      {children}
    </div>
  );
}
