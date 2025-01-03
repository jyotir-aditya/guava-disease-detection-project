import Input from "@/components/Input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full sm:h-[100vh] font-[family-name:var(--font-geist-sans)]">
      <main className=" sm:h-[90vh]">
        <Input/>
      </main>
      <footer className="mt-12 sm:mt-0 flex justify-center">
        <p>@Mini project</p>
      </footer>
    </div>
  );
}
