import { Text, Link, ListItem, Box } from "@chakra-ui/react";

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
    <ListItem color={"white"} lineHeight={"1.1em"} mx={2} textAlign={"left"}>
      <Link
        href={songLink}
        isExternal
        _hover={{ textDecoration: "none" }}
        textShadow={"0px 0px 16px rgb(0,0,0)"}
        display={'flex'}
        gap={2}
      >
        <Text as={"i"} display={"inline"} textShadow={'0px 0px 8px rgb(0,0,0)'}>
          {listNumber}.
        </Text>
        <Box display={'inline'}>
          {/* SONG NAME */}
          <Text fontWeight={"bold"} display={"inline"}>
            {songName} &nbsp;•{" "}
          </Text>
          {/* ARTIST NAMES */}
          <Text display={"inline"}>{artistNames}</Text>
        </Box>
      </Link>
    </ListItem>
  );
};

export default SongItem;
