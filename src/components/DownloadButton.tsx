import { Button } from "@chakra-ui/react"
import html2canvas from "html2canvas";


const DownloadButton: React.FC = (Props) => {
  
  const handleDownload = async () => {
    const element = document.getElementById('imageDownloadDiv')!
    console.log(element)
    const canvas = await html2canvas(element),
      data = canvas.toDataURL("image/jpg", 1),
      link = document.createElement("a");
    
    link.href = data
    link.download = 'downloaded-image.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  };
  
  return (
    <Button mt={5} colorScheme={'purple'} onClick={handleDownload}>Download List</Button>
  )
}

export default DownloadButton
