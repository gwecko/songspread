import { Text, Link, List, Box } from "@chakra-ui/react";

type SongItemProps = {
  songDuration?: string | undefined;
  artistNames?: string | undefined;
  songName?: string | undefined;
  songLink?: string | undefined;
  albumName?: string | undefined;
  listNumber?: number | undefined;
};

const SongItem: React.FC<SongItemProps> = ({
  artistNames,
  songName,
  songLink,
  listNumber,
}) => {
  return (
    <List.Item color="white" lineHeight="1.1em" mx={2} textAlign="left">
      <Link
        href={songLink}
        target="_blank"
        rel="noopener noreferrer"
        _hover={{ textDecoration: "none" }}
        textShadow="0px 0px 16px rgb(0,0,0)"
        display="flex"
        gap={2}
      >
        <Text as="i" display="inline" textShadow="0px 0px 8px rgb(0,0,0)">
          {listNumber}.
        </Text>
        <Box display="inline">
          <Text fontWeight="bold" display="inline">
            {songName} &nbsp;•{" "}
          </Text>
          <Text display="inline">{artistNames}</Text>
        </Box>
      </Link>
    </List.Item>
  );
};

export default SongItem;
