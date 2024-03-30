import { Animal } from "@/app/types";

type Params = {
  type: string;
};

async function getDyraFlokk(type: string) {
  const result = await fetch(
    `https://vef2-einstaklings.vercel.app/api/pets-type/${type}`,
    {
      cache: "no-store",
      method: "GET",
    }
  );

  if (result.status === 404) {
    return null;
  }

  return result.json();
}

export default async function DyraFlokkur({ params }: { params: Params }) {
  const data: Animal[] | null = await getDyraFlokk(params.type);
  console.log(data);

  return (
    <div>
      <h1>Halló Dýraflokkur {params.type}</h1>
      {data ? (
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
      ) : (
        <div className="not-found">
          <h2>No animal with type {params.type}</h2>
        </div>
      )}
    </div>
  );
}
