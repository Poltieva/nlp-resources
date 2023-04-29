import {useEffect, useState} from "react";
import Resource from "./Resource";
import instance from './api/axios';

function ResourceRecommendation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get(`/recommend?query=${searchTerm}`);
      const data = response.data;
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {isLoading ? (
        <p>Please wait a bit...</p>
      ) : (
        <ul>
          {recommendations.map((resource) => (
            <Resource key={resource.id} resource={resource} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResourceRecommendation;