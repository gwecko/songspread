import { Text, Link, Box, ListItem } from "@chakra-ui/react";

type SongItemProps = {
  songDuration?: string | undefined;
  artistNames?: string | undefined;
  songName?: string | undefined;
  songLink?: string | undefined;
  albumName?: string | undefined;
  listNumber?: number | undefined;
};

const SongItem: React.FC<SongItemProps> = ({
  songDuration,
  artistNames,
  songName,
  songLink,
  albumName,
  listNumber,
}) => {
  return (
    <ListItem
      textAlign={"left"}
      textShadow={"0px 0px 16px rgb(0,0,0)"}
    >
      <Link href={songLink} isExternal _hover={{ textDecoration: "none" }}>
        {/* LIST NUMBER */}
        <Text
          display={"inline-block"}
          fontWeight={"medium"}
          fontStyle={"italic"}
          color={"gray.100"}
        >
          {listNumber}.&nbsp;
        </Text>
        {/* SONG NAME */}
        <Box display={"inline"}>
          <Text fontWeight={"extrabold"} color={"gray.100"} display={"inline"}>
            {songName}
          </Text>
          {/* ARTIST NAMES */}
          <Text fontWeight={"medium"} display={"inline"} color={"gray.100"}>
            &nbsp;-&nbsp;{artistNames}
          </Text>
        </Box>
      </Link>
    </ListItem>
  );
};

export default SongItem;
