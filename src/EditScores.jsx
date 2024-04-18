import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const EditScores = ({ team, onUpdateScores, onClose }) => {
  const [scores, setScores] = useState({
    map1: team.map1,
    map2: team.map2,
    map3: team.map3,
  });

  const handleScoreChange = (e) => {
    const { name, value } = e.target;
    setScores((prevScores) => ({
      ...prevScores,
      [name]: parseInt(value, 10),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateScores(team.id, scores);
    onClose();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Map 1 Score</FormLabel>
          <Input
            type="number"
            name="map1"
            value={scores.map1}
            onChange={handleScoreChange}
          />
        </FormControl>
        {/* Add similar FormControl components for map2 and map3 */}
        <Button type="submit" colorScheme="blue" mt={4}>
          Update Scores
        </Button>
      </form>
    </Box>
  );
};

export default EditScores;
