import React, { useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([
    { id: 1, team: "Team A", map1: 10, map2: 8, map3: 12, total: 30 },
    { id: 2, team: "Team B", map1: 8, map2: 12, map3: 9, total: 29 },
    { id: 3, team: "Team C", map1: 12, map2: 6, map3: 10, total: 28 },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "total",
    direction: "desc",
  });

  const handleEditScores = (team) => {
    setSelectedTeam(team);
    setIsOpen(true);
  };

  const handleUpdateScores = (teamId, updatedScores) => {
    setLeaderboardData((prevData) =>
      prevData.map((team) =>
        team.id === teamId
          ? {
              ...team,
              map1: updatedScores.map1,
              map2: updatedScores.map2,
              map3: updatedScores.map3,
              total:
                updatedScores.map1 + updatedScores.map2 + updatedScores.map3,
            }
          : team,
      ),
    );
    setIsOpen(false);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...leaderboardData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Leaderboard
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Team</Th>
            <Th onClick={() => handleSort("map1")}>
              Map 1{" "}
              {sortConfig.key === "map1"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </Th>
            <Th onClick={() => handleSort("map2")}>
              Map 2{" "}
              {sortConfig.key === "map2"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </Th>
            <Th onClick={() => handleSort("map3")}>
              Map 3{" "}
              {sortConfig.key === "map3"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </Th>
            <Th onClick={() => handleSort("total")}>
              Total{" "}
              {sortConfig.key === "total"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedData.map((team) => (
            <Tr key={team.id}>
              <Td>
                <Badge colorScheme="purple">{team.team}</Badge>
              </Td>
              <Td>{team.map1}</Td>
              <Td>{team.map2}</Td>
              <Td>{team.map3}</Td>
              <Td fontWeight="bold">{team.total}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  onClick={() => handleEditScores(team)}
                >
                  Edit Scores
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Scores</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedTeam && (
              <EditScoresForm
                team={selectedTeam}
                onUpdateScores={handleUpdateScores}
                onClose={() => setIsOpen(false)}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const EditScoresForm = ({ team, onUpdateScores, onClose }) => {
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
        <FormControl>
          <FormLabel>Map 2 Score</FormLabel>
          <Input
            type="number"
            name="map2"
            value={scores.map2}
            onChange={handleScoreChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Map 3 Score</FormLabel>
          <Input
            type="number"
            name="map3"
            value={scores.map3}
            onChange={handleScoreChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4}>
          Update Scores
        </Button>
      </form>
    </Box>
  );
};

export default Leaderboard;
