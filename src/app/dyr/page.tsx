import { Animal } from "@/app/types";
import Link from "next/link";

async function getDyr() {
  const res = await fetch("https://vef2-einstaklings.vercel.app/api/pets", {
    cache: "no-store",
    method: "GET",
  });

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
  const data: Animal[] = await getDyr();
  console.log(data);
  return (
    <div>
      <h1>Halló dýr</h1>
      <div>
        <ul>
          <li>
            <Link href="/dyr/Fish">Sjávardýr</Link>
          </li>
          <li>
            <Link href="/dyr/Bug">Pöddur</Link>
          </li>
          <li>
            <Link href="/dyr/Farm">Sveita dýr</Link>
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
            <p>Verð: {animal.price}kr</p>
          </div>
        ))}
      </div>
    </div>
  );
}
