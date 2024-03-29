import { Animal } from "@/app/types";
import Link from "next/link";

async function getDyr() {
  const params = {
    method: "GET",
  };
  const res = await fetch(
    "https://vef2-einstaklings-git-main-bragi-projects.vercel.app/api/pets",
    params
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const result = await res.json();
  return result;
}

interface DyrPackage {
  rows: Animal[];
}

export default async function Dyr() {
  const dataPack: DyrPackage = await getDyr();
  const data = dataPack.rows;
  console.log(data);
  return (
    <div>
      <h1>Halló dýr</h1>
      <div>
        <ul>
          <li>
            <Link href="/dyr/fish">Sjávardýr</Link>
          </li>
          <li>
            <Link href="/dyr/bug">Pöddur</Link>
          </li>
          <li>
            <Link href="/dyr/farm-animal">Sveita dýr</Link>
          </li>
        </ul>
      </div>
      <div className="cards">
        {data.map((animal) => (
          <div key={animal.species}>
            <h3>{animal.species}</h3>
            <p>{animal.type}</p>
            <p>
              Stærð:{" "}
              {animal.size_hi === animal.size_lo
                ? animal.size_hi
                : `${animal.size_lo}-${animal.size_hi}cm`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
