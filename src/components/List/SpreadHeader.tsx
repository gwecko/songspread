import { Container, Heading, Text } from "@chakra-ui/react";

import React from "react";

type SpreadHeader = {
  timeRange: 'short_term' | 'medium_term' | 'long_term' | string;
  username?: string;
};

const SpreadHeader: React.FC<SpreadHeader> = ({ username, timeRange }) => {
  
  let timeRangeText = ''
  
  switch (timeRange) {
    case "short_term":
      timeRangeText = "current";
      break;
    case "medium_term":
      timeRangeText = "recent";
      break;
    case "long_term":
      timeRangeText = "all-time";
      break;
  }
  
  return (
    <Container minH={'3rem'} mx={2}>
      <Text
        as="h2"
        color={"white"}
        fontSize={"1.7em"}
        // letterSpacing={"-0.02em"}
        fontWeight={"bold"}
        whiteSpace={"normal"}
        textShadow={"0px 0px 16px rgb(0,0,0,0.9)"}
        lineHeight={"1.1em"}
      >
        {username}&apos;s {timeRangeText} SongSpread
      </Text>
    </Container>
  );
};



export default SpreadHeader;
