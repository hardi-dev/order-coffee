import { forwardRef } from "react";
import {
  Flex,
  Heading,
  Image,
  Text,
  Grid,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import { ProductData } from "@/utils/constant";
import { formatPrice } from "@/utils/helper";
import Link from "next/link";

interface ProductCardProps {
  thumbnail: string;
  title: string;
  price: string;
}

// eslint-disable-next-line react/display-name
const ProductCard = forwardRef(
  ({ thumbnail, title, price, ...rest }: ProductCardProps) => (
    <Flex
      width="full"
      p="6"
      flexDir="column"
      bgColor="white"
      borderRadius={16}
      shadow="card"
      cursor="pointer"
      as="a"
      {...rest}
    >
      <Image src={thumbnail} alt={title} w={185} h={185}/>
      <Grid gridTemplateColumns="4fr 1fr" mt="3">
        <Text fontWeight="semibold">{title}</Text>
        <Text>{price}</Text>
      </Grid>
    </Flex>
  )
);

export const ProductListContainer = () => {
  return (
    <Flex
      w="full"
      h="full"
      bg="brand.100"
      alignItems="center"
      justify="center"
      columnGap="84"
    >
      <Heading fontSize="24">Select a Coffee :</Heading>
      <SimpleGrid columns={3} width={762} columnGap="6">
        {ProductData.map(({ slug, sizes, ...rest }) => (
          <GridItem key={slug}>
            <Link href={`/product/${slug}`} passHref>
              <ProductCard {...rest} price={ formatPrice(sizes[1].price)} />
            </Link>
          </GridItem>
        ))}
      </SimpleGrid>
    </Flex>
  );
};
