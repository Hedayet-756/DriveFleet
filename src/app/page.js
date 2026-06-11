import Banner from "@/components/Banner";
import Featured from "@/components/featured";
import ReviewSection from "@/components/ReviewSection";

export default function Home() {
  return (
    <div className="w-11/12 mx-auto">
      <Banner />
      <Featured />
      <ReviewSection />
    </div>
  );
}
