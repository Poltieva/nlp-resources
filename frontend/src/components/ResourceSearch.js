import {useEffect, useState} from "react";
import Resource from "./Resource";
import instance from './api/axios';

function ResourceSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await instance.get(`/recommend?query=${searchTerm}`);
      const data = response.data;
      console.log(data)
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {recommendations.map((resource) => (
          <Resource key={resource.id} resource={resource} />
        ))}
      </ul>
    </div>
  );
};

export default ResourceSearch;