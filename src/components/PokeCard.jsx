import React from "react";
import typeColors from "../utils";

function PokeCard(props) {
  const { name, image, types, id } = props;
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const formattedId = `#${id.toString().padStart(3, "0")}`;

  return (
    <div className="card bg-base-100 w-80 shadow-xl cursor-pointer hover:scale-[105%]">
      <figure className="px-2 pt-2">
        <img src={image} alt={capitalizedName} className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="text-center text-lg font-bold">
          {formattedId} {capitalizedName}
        </h2>
        <div className="flex justify-center gap-2 mt-2">
          {types.map((type, index) => {
            const typeName = type.type.name;
            const colorClass = typeColors[typeName] || "bg-gray-500"; // Fallback color
            return (
              <span
                key={index}
                className={`px-2 py-1 rounded-md text-white ${colorClass}`}
              >
                {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PokeCard;
