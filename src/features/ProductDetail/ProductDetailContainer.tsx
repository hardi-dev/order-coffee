import { useState, useEffect } from "react";
import {
  Flex,
  Image,
  Text,
  Heading,
  Box,
  UnorderedList,
  ListItem,
  Button,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ProductData } from "@/utils/constant";
import { formatPrice } from "@/utils/helper";

type ProductType = typeof ProductData[0];
type ProductSizeType = ProductType["sizes"][0];

const getProductBySlug = (slug: string) =>
  ProductData.find((product) => product.slug === slug);

interface SizeSelectorProps {
  sizes: ProductType["sizes"];
  onSelect?: (size: ProductSizeType) => void;
  selected?: ProductSizeType;
}

interface CounterProps {
  count: number;
  onPlus: () => void;
  onMin: () => void;
}

const SizeSelector = ({ sizes, selected, onSelect }: SizeSelectorProps) => (
  <Flex w="full" direction="column" mt="6">
    <Text fontWeight="semibold">Choose Size : </Text>
    <UnorderedList w="full" ml="0px" mt="4">
      {sizes.map(({ name, price }, idx) => (
        <ListItem
          key={name}
          display="flex"
          px="6"
          py="4"
          bg="brand.100"
          alignItems="center"
          mb="2"
          borderRadius="8px"
          border="1px"
          borderColor={selected?.name === name ? "brand.500" : "transparent"}
          cursor="pointer"
          onClick={() => onSelect?.(sizes[idx])}
        >
          <Box
            w="16px"
            h="16px"
            border={selected?.name === name ? "3px" : "1px"}
            borderColor="brand.500"
            borderRadius={16}
            borderStyle="solid"
            mr="2"
          />
          <Flex flex={1}>
            <Text>{name}</Text>
            <Text ml="auto" fontWeight="semibold">{formatPrice(price)}</Text>
          </Flex>
        </ListItem>
      ))}
    </UnorderedList>
  </Flex>
);

const Counter = ({ count, onMin, onPlus }: CounterProps) => {
  return (
    <Flex>
      <Button variant="outline" size="sm" onClick={onMin}>
        -
      </Button>
      <Input
        value={count}
        size="sm"
        outline="none"
        border="0"
        w="32px"
        mx="1"
      />
      <Button variant="outline" size="sm" onClick={onPlus}>
        +
      </Button>
    </Flex>
  );
};

export const ProductDetailContainer = () => {
  const [itemCount, setItemCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState<ProductType["sizes"][0]>();
  const [product, setProduct] = useState<ProductType>();
  const { query } = useRouter();

  const handleOnClickCounter = (operation: "plus" | "minus") => {
    if (operation === "minus" && itemCount > 1) {
      setItemCount(itemCount - 1);
    } else if (operation === "plus") {
      setItemCount(itemCount + 1);
    }
  };

  useEffect(() => {
    if (!!query) {
      const dataProduct = getProductBySlug(query["slug"] as string);
      setProduct(dataProduct);
      setSelectedSize(dataProduct?.sizes[1]);
    }
  }, [query]);

  if (!product || !selectedSize) {
    return null;
  }

  const { thumbnail, title, description, sizes } = product;

  return (
    <Flex w="full" h="full" bg="white" alignItems="center" justify="flex-start">
      <Flex h="full" width="50%" bg="brand.100" justify="center" align="center">
        <Image src={`/${thumbnail}`} alt={title} w={485} h={485} />
      </Flex>
      <Flex h="full" width="50%" justify="center" pt={100}>
        <Flex align="flex-start" w={480} direction="column">
          <Link href="/" passHref>
            <Text as="a" opacity={0.5}>
              Back to Product List
            </Text>
          </Link>
          <Heading as="h1" fontSize={48} mt="6">
            {title}
          </Heading>
          <Text mt="2">{description}</Text>
          <SizeSelector sizes={sizes} selected={selectedSize} onSelect={(selected) => setSelectedSize(selected)}/>
          <Flex w="full" align="center" mt="9">
            <Counter
              onMin={() => handleOnClickCounter("minus")}
              onPlus={() => handleOnClickCounter("plus")}
              count={itemCount}
            />
            <Text ml="auto" fontSize="24px" fontWeight="bold">
              {formatPrice(selectedSize.price * itemCount)}
            </Text>
          </Flex>
          <Flex w="full" mt="6">
            <Button
              size="lg"
              flex={1}
              mr="2"
              bg="linear-gradient(90.81deg, #F56565 0%, #ED64A6 100%)"
              color="white"
            >
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" px="3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.27977 2.50055C8.90977 2.51971 9.51977 2.62971 10.1108 2.83071H10.1698C10.2098 2.84971 10.2398 2.87071 10.2598 2.88971C10.4808 2.96071 10.6898 3.04071 10.8898 3.15071L11.2698 3.32071C11.4198 3.40071 11.5998 3.54971 11.6998 3.61071C11.7998 3.66971 11.9098 3.73071 11.9998 3.79971C13.1108 2.95071 14.4598 2.49071 15.8498 2.50055C16.4808 2.50055 17.1108 2.58971 17.7098 2.79071C21.4008 3.99071 22.7308 8.04071 21.6198 11.5807C20.9898 13.3897 19.9598 15.0407 18.6108 16.3897C16.6798 18.2597 14.5608 19.9197 12.2798 21.3497L12.0298 21.5007L11.7698 21.3397C9.48077 19.9197 7.34977 18.2597 5.40077 16.3797C4.06077 15.0307 3.02977 13.3897 2.38977 11.5807C1.25977 8.04071 2.58977 3.99071 6.32077 2.76971C6.61077 2.66971 6.90977 2.59971 7.20977 2.56071H7.32977C7.61077 2.51971 7.88977 2.50055 8.16977 2.50055H8.27977Z"
                  fill="#A76336"
                />
              </svg>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
