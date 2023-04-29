import {useState} from "react";
import Resource from "./Resource";
import ResourceSearch from './ResourceSearch';
import instance from './api/axios';

function ResourceRecommendation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get(`/recommend?query=${searchTerm}`);
      const data = response.data;
      setRecommendations(data.recommendations);
      if (recommendations.length === 0) {
        setMessage("Nothing found");
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <ResourceSearch />
      <div>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch}>Recommend</button>
        {isLoading ? (
          <p>Please wait a bit...</p>
        ) : (
          <ul>
            <div>{message && <p>{message}</p>}</div>
            {recommendations.map((resource) => (
              <Resource key={resource.id} resource={resource} />
            ))}
          </ul>
        )}
      </div>
  </div>
  );
};

export default ResourceRecommendation;