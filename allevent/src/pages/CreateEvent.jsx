import React, { useState } from "react";
import {
  Box,
  Text,
  Input,
  Flex,
  Textarea,
  Button,
  Select,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEvent = ({ user }) => {
  const [userData, setUserData] = useState({});
  const [loader, setLoader] = useState(false);
  const [picture, setPicture] = useState();
  const [imgUrl, setimgUrl] = useState();
  const navigate = useNavigate();
  const [loader2, setloader2] = useState(false);

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", picture);
    data.append("upload_preset", "assignment");
    data.append("cloud_name", "dddnxiqpq");
    setloader2(true);

    fetch("https://api.cloudinary.com/v1_1/dddnxiqpq/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setimgUrl(data.url);
        setloader2(false);
        toast("🦄 Image uploaded !", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    setLoader(true);
    e.preventDefault();
    const payload = {
      ...userData,
      banner: imgUrl,
    };
    axios.post("http://localhost:8080/event/create", payload).then((res) => {
      if (res.data.status === 200) {
        toast("🦄 Image uploaded !", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
      } else {
        alert("something went wrong !");
      }
      setLoader(false);
    });
  };

  return (
    <Box className="eventContainer">
      <form onSubmit={handleSubmit} className="eventForm">
        <Text className="heading2">Create New Event</Text>
        <Flex className="flex">
          <Box>
            <label>Event Name</label>
            <Input required name="name" onChange={handleChange} />
          </Box>
          <Box>
            <label>Select Category</label>
            <Select
              name="category"
              onChange={handleChange}
              placeholder="Select category"
              required
            >
              <option value="music">Music</option>
              <option value="bussiness">Bussiness</option>
              <option value="exhibition">Exhibition</option>
            </Select>
          </Box>
        </Flex>
        <Flex className="flex">
          <Box>
            <label>Start Time</label>
            <Input required type="time" name="startTime" onChange={handleChange} />
          </Box>
          <Box>
            <label>End Time</label>
            <Input required type="time" name="endTime" onChange={handleChange} />
          </Box>
        </Flex>
        <Flex className="flex">
          <Box>
            <label>Start date</label>
            <Input required type="date" name="startDate" onChange={handleChange} />
          </Box>
          <Box>
            <label>End date</label>
            <Input required type="date" name="endDate" onChange={handleChange} />
          </Box>
        </Flex>
        <Flex className="flex">
          <Box>
            <label>location(City)</label>

            <Select
              name="city"
              required
              onChange={handleChange}
              placeholder="Select city"
              textTransform={"capitalize"}
            >
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Gujrat">Gujrat</option>
              <option value="Vadodra">Vadodra</option>
            </Select>
          </Box>
          <Box>
            <label>Banner</label>
            <Input
              type="file"
              name="banner"
              required
              onChange={(e) => setPicture(e.target.files[0])}
            />
            <Button onClick={uploadImage} colorScheme={"green"} mt="10px">
              {loader2 ? <Spinner /> : "Upload"}
            </Button>
          </Box>
        </Flex>
        <Box>
          <label>Description</label>
          <Textarea required name="description" onChange={handleChange}></Textarea>
        </Box>
        <Box>
          <Button background={"#2FF3E0"} className="submit" type="submit">
            {loader ? <Spinner /> : "Create"}
          </Button>
          <ToastContainer />
        </Box>
      </form>
    </Box>
  );
};

export default CreateEvent;
