import Navbar from "@/app/components/Navbar";
import { createClient } from "@/prismicio";

async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    <header>
      <Navbar settings={settings} />
    </header>
  );
}

export default Header;
