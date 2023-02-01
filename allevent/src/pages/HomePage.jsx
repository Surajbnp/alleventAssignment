import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import EventCard from "../components/EventCard";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [event, setEvent] = useState([]);
  const [serachParams, setSearchParams] = useSearchParams();
  const [city, setCity] = useState('');
  const [cat, setCat] = useState('');
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");




  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleCategory = (e) => {
    setCat(e.target.value);
  };

  const handlestartDate = (e) => {
    setstartDate(e.target.value);
  };

  const handleendDate = (e) => {
    setendDate(e.target.value);
  };

  const handleReset = () => {
    return axios.get(`http://localhost:8080/event`).then((response) => {
      setEvent(response.data);
    });
  };

  useEffect(() => {
    if (cat) {
      setSearchParams({ category: cat });
    }
  }, [cat, serachParams, setSearchParams]);

  useEffect(() => {
    if (city) {
      const param = {
        category: serachParams.getAll("category"),
        city: city,
      };
      setSearchParams(param);
    }
  }, [city, serachParams, setSearchParams]);

  useEffect(() => {
    if (startDate) {
      const param = {
        category: serachParams.getAll("category"),
        city: serachParams.getAll("city"),
        startDate: startDate,
      };
      setSearchParams(param);
    }
  }, [startDate, serachParams, setSearchParams]);

  useEffect(() => {
    if (endDate) {
      const param = {
        category: serachParams.getAll("category"),
        city: serachParams.getAll("city"),
        startDate: serachParams.getAll("startDate"),
        endDate: endDate,
      };
      setSearchParams(param);
    }
  }, [endDate, serachParams, setSearchParams]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/event${window.location.search}`)
      .then((response) => {
        setEvent(response.data);
      });
  }, [startDate, endDate, city, cat, setSearchParams]);
  return (
    <Box className="container">
      <Box>
        <Text fontSize={"30px"} fontWeight={600}>
          Popular Events
        </Text>
        <Flex
          justifyContent={"center"}
          gap={3}
          alignItems="center"
          p="5px"
          fontWeight={500}
        >
          <Text>Filter by </Text>
          <Box>
            <Select
              value={city}
              onChange={handleCity}
              size="sm"
              placeholder="Select city"
            >
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Gujrat">Gujrat</option>
              <option value="Vadodra">Vadodra</option>
            </Select>
          </Box>
          <Box>
            <Select
              onChange={handleCategory}
              size="sm"
              placeholder="Select category"
            >
              <option value="music">Music</option>
              <option value="bussiness">Bussiness</option>
              <option value="exhibition">Exhibition</option>
            </Select>
          </Box>
          <Flex alignItems={"center"}>
            <Text w="100%">start date</Text>
            <Input
              onChange={handlestartDate}
              outline={"none"}
              type="date"
              placeholder="select date"
            />
            <Text w="100%">end date</Text>
            <Input
              onChange={handleendDate}
              outline={"none"}
              type="date"
              placeholder="select date"
            />
          </Flex>
          <Box>
            <Button colorScheme={"red"} onClick={handleReset}>
              Reset Filter
            </Button>
          </Box>
        </Flex>
      </Box>

      <Box className="mainDiv">
        {event.length === 0 ? (
          <Text fontSize={"30px"} fontWeight={500}>
            Sorry, No Data Found !
          </Text>
        ) : (
          event.map((e) => {
            return (
              <Box key={e.id}>
                <EventCard {...e} />
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
