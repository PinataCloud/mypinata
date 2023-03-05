import Navbar from "../Navigation/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="justify-between p-7 m-7">
      <Navbar />
      {children}
    </div>
  );
}
