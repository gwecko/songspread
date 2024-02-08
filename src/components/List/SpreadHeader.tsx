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
    <Container>
      <Heading
        as="h2"
        color={"gray.100"}
        fontSize={"1.7em"}
        pt={2}
        letterSpacing={"-0.03em"}
        fontWeight={"bold"}
        mr={"7%"}
        whiteSpace={"normal"}
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
