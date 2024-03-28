import { Animal } from "@/app/types";

async function getDyr() {
  const res = await fetch(
    "https://vef2-einstaklings.vercel.app/api/fetch-pets"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Dyr() {
  const data = await getDyr();
  return (
    <div>
      <h1>Halló dýr</h1>
      <div className="cards">
        {data.map((animal: Animal) => (
          <div key={animal.species}>
            <h3>{animal.species}</h3>
            <p>{animal.type}</p>
            <p>
              Stærð:{" "}
              {animal.size_hi === animal.size_lo
                ? animal.size_hi
                : animal.size_lo + "-" + animal.size_hi}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
