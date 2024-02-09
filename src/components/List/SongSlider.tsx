import {
  Container,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useState } from "react";

type SongSliderProps = {
  numTracks: number;
  updateParentState: (val: number) => void;
};

const SongSlider: React.FC<SongSliderProps> = ({ numTracks, updateParentState }) => {
  return (
    <Container w={"fit-content"} h={"35vh"} pl={0}>
      <Slider
        pos={"relative"} //might not need this
        value={numTracks}
        min={5}
        max={12}
        onChange={(val) => {
          updateParentState(val);
        }}
        orientation={"vertical"}
        isReversed
        minH={"250px"}
        top={"20%"}
      >
        <SliderTrack bgColor={"purple.50"}>
          <SliderFilledTrack bgColor={"purple.100"} />
        </SliderTrack>
        <SliderThumb boxSize={"6"} bgColor={"purple.500"} h={"40px"} />
      </Slider>
    </Container>
  );
};

export default SongSlider;
