import {useState} from "react";
import Resource from "./Resource";
import ResourceSearch from './ResourceSearch';
import instance from './api/axios';
import { Button, Container, TextField } from "@mui/material";

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
      if (data.recommendations.length === 0) {
        setMessage("Nothing found");
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <ResourceSearch />
      <div>
        <TextField label="Recommend me a book/course video about..."
        variant="outlined" fullWidth margin="dense"
        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Button disabled={isLoading} onClick={handleSearch}>Recommend</Button>
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
  </Container>
  );
};

export default ResourceRecommendation;