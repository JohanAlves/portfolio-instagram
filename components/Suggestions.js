import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestionsTemp = [...Array(5)].map((_, i) => ({
      avatar: faker.image.avatar(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      company: faker.company.companyName(),
      id: i,
    }));
    suggestionsTemp.forEach((sug) => {
      sug.username = `${sug.firstName}.${sug.lastName}`.toLowerCase();
    });
    setSuggestions(suggestionsTemp);
  }, []);

  return (
    <div className="mt-5">
      <div className="flex font-semibold items-center justify-between  mb-3">
        <span className="text-gray-400">Suggestions For You</span>
        <span>See All</span>
      </div>
      <div>
        {suggestions.map((suggestion, i) => {
          return (
            <div className="flex items-center py-2" key={i}>
              <div className="p-0.5 rounded-full ">
                <img
                  src={suggestion.avatar}
                  alt=""
                  className="border-[2px] border-white w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex-1 ml-2">
                <h2 className="text-sm font-semibold ">
                  {suggestion.username}
                </h2>
                <h4 className="text-sm text-gray-400 pr-2 ">
                  Works at {suggestion.company}
                </h4>
              </div>
              <span className="text-violet-500 text-xs font-semibold cursor-pointer">
                Follow
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Suggestions;
