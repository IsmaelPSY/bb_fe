import { Tag, TagLabel } from "@chakra-ui/react";

export default function CProductTag(
  {
    value, 
    type
  }: 
  {
    value: string | number | undefined, 
    type: "size" | "gender" | "category"}) {
  return(
    <>
      {
        type === "size"
        ? <Tag size="lg" colorScheme="purple"><TagLabel>Talla: {value}</TagLabel></Tag>
        : type === "gender"
        ? <Tag size="lg" colorScheme={value == "b" ? "twitter" : value == "g" ? "pink" : ""}>
            <TagLabel>{value == "b" ? "Niño" : value == "g" ? "Niña" : ""}</TagLabel>
          </Tag>
        : type === "category"
        ? <Tag size="lg" colorScheme="teal">
            <TagLabel>
              {
                value == "c" 
                ? "ROPA" 
                : value == "s" 
                ? "ZAPATOS" 
                : value == "a"
                ? "ACCESORIOS"
                : ""
              }
              </TagLabel>
          </Tag>
        : null
      }
    </>
  )
}