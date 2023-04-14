import { Button } from "@chakra-ui/react"
import saveAs from 'file-saver'
import domtoimage from 'dom-to-image'


const DownloadButton: React.FC = (Props) => {
  
  const handleDownload = async () => {
    const element = document.getElementById('imageDownloadDiv')!
    domtoimage.toBlob(element).then((blob) => {
      saveAs(blob, 'my-songs.png')
    })
  };
  
  return (
    <Button mt={5} colorScheme={'purple'} onClick={handleDownload}>Download List</Button>
  )
}

export default DownloadButton
