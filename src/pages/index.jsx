import MainLayout from "../components/Layout/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="relative flex items-center p-8">
        <img className="h-300 min-h-full min-w-full hero-img" src="/hero-img.png"/>
        <h2 className="ff hero-text">Your digital personality. your way.</h2>
      </div>
    </MainLayout>
  );
}
