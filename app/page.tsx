import Image from "next/image";
import styles from "./page.module.css";
import '@sakun/system.css'
import { DonsolController } from "@/Components/DonsolController/DonsolController";
export default function Home() {
  return (
        <DonsolController/>
  );
}
