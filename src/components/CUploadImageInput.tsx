import { Image, InputGroup, InputRightAddon, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import { Input } from "./ui/input";
import axios from "axios";
import { useState } from "react";
import { DeleteIcon } from '@chakra-ui/icons'

export default function CUploadImageInput ({ onChange, onRemove, value }: {onChange: (url: string) => void, onRemove: (url: string) => void, value: string[]}) {
  
  const [loading, setLoading] = useState(false)

  const handleChange = async (e: any) => {
    try{
      setLoading(true)
      const fileList = e.target.files || null
      const files = []
      const length = e.target.files?.length || -1
  
      if (fileList){
        for (let i = 0; i < length; i++) {
          files[i] = fileList.item(i);
        }
      }
  
      const formData = new FormData()
      if(files.length > 0){
        files.forEach((file) => formData.append('image', file))
      }
  
      const res =  await axios.post("/api/upload", formData)
      console.log({res})
      onChange(res.data.image_url)
    }catch (error){
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return(
    <>
      <InputGroup>
        <Input className="hover:cursor-pointer" type="file" onChange={handleChange}/>
        <InputRightAddon>
          {
            loading ? 
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='md'
            />
            : <></>
          }
        </InputRightAddon>
      </InputGroup>
      <Wrap>
        {
          value.map( v =>
            <WrapItem key={v}>
              <DeleteIcon 
                color='red.500' onClick={()=> onRemove(v)}
                className="hover:cursor-pointer"  
              />
              <Image
                src={v}
                alt="Product Image"
                boxSize='100px'
              />
            </WrapItem>
          )
        }
      </Wrap>
    </>
  )
}