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
    <Container w={"fit-content"} pt={8} pl={0}>
      <Slider
        pos={"relative"} //might not need this
        value={numTracks}
        min={5}
        max={12}
        onChange={(val) => {
          updateParentState(val);
        }}
        orientation={"vertical"}
        h={'35vh'}
        isReversed
      >
        <SliderTrack bgColor={"purple.50"}>
          <SliderFilledTrack bgColor={"purple.100"} />
        </SliderTrack>
        <SliderThumb boxSize={"7"} bgColor={"purple.500"} h={"45px"} />
      </Slider>
    </Container>
  );
};

export default SongSlider;
