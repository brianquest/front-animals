'use client'

import { useRouter } from "next/navigation";
import AnimalsComponent from "../components/animals";

export default function Home() {

  const router = useRouter();

  return (
    <div>
      <AnimalsComponent></AnimalsComponent>
    </div>
  );
}
