import Image from "next/image";
import ViewSubmissions from "./view-submission";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <div><ViewSubmissions/></div>
    </main>
  );
}
