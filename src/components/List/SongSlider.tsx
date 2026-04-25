import { Container, Slider } from "@chakra-ui/react";
import { maxNumTracks } from "@/globals";

type SongSliderProps = {
  numTracks: number;
  updateParentState: (val: number) => void;
};

const SongSlider: React.FC<SongSliderProps> = ({ numTracks, updateParentState }) => {
  return (
    <Container w="fit-content" pt="3em" pl={0}>
      <Slider.Root
        value={[numTracks]}
        min={5}
        max={maxNumTracks}
        onValueChange={(details) => updateParentState(details.value[0])}
        orientation="vertical"
        h="35vh"
        maxH="280px"
        colorPalette="purple"
        origin="end"
      >
        <Slider.Control>
          <Slider.Track bg="purple.50">
            <Slider.Range bg="purple.100" />
          </Slider.Track>
          <Slider.Thumb index={0} boxSize={7} bg="purple.500" h="45px" />
        </Slider.Control>
      </Slider.Root>
    </Container>
  );
};

export default SongSlider;
