import React from 'react'
import { Box , Text} from '@chakra-ui/react';

const EventCard = ({name, city, startTime, endTime , startDate, endDate, id, banner}) => {
  return (
    <Box className='card' key={id}>
     <Box>
      <img  src={banner} alt="banner" className='cardImg'/>
     </Box>
     <Box>
        <Text className='heading'>{name}</Text>
        <Text className='greyTxt'>{city}</Text>
        <Text className='greyTxt'>{`start at ${startTime} - ${endTime}`}</Text>
        <Text className='date'>{`${startDate} - ${endDate}`}</Text>
     </Box>
    </Box>
  )
}

export default EventCard