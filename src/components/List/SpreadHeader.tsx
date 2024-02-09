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
      timeRangeText = "1-month";
      break;
    case "medium_term":
      timeRangeText = "6-month";
      break;
    case "long_term":
      timeRangeText = "all-time";
      break;
  }
  
  return (
    <Container minH={'3rem'}>
      <Heading
        as="h2"
        color={"gray.100"}
        fontSize={"1.7em"}
        letterSpacing={"-0.03em"}
        fontWeight={"bold"}
        whiteSpace={"normal"}
        textShadow={"0px 0px 13px rgb(0,0,0)"}
      >
        {username}&apos;s{" "}
        <Text fontWeight={"bold"} display={"inline"} fontStyle={"italic"}>
          {timeRangeText}
        </Text>{" "}
        SongSpread
      </Heading>
    </Container>
  );
};

export default SpreadHeader;
