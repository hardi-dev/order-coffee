import { forwardRef } from "react";
import {
  Flex,
  Heading,
  Image,
  Text,
  Grid,
  SimpleGrid,
  GridItem,
  SimpleGridProps,
  GridItemProps,
  HeadingProps,
  ImageProps
} from "@chakra-ui/react";
import { ProductData } from "@/utils/constant";
import { formatPrice } from "@/utils/helper";
import Link from "next/link";
import { motion, Variants, HTMLMotionProps } from "framer-motion";

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionHeadingProps = Merge<HeadingProps, HTMLMotionProps<"h2">>;
type MotionGridItemProps = Merge<GridItemProps, HTMLMotionProps<"div">>;
type MotionSimpleGridProps = Merge<
  SimpleGridProps,
  HTMLMotionProps<"div">
>;
type MotionImageProps = Merge<ImageProps, HTMLMotionProps<"img">>;

const MotionHeading: React.FC<MotionHeadingProps> = motion(Heading);
const MotionSimpleGrid: React.FC<MotionSimpleGridProps> = motion(SimpleGrid);
const MotionGridItem: React.FC<MotionGridItemProps> = motion(GridItem);
const MotionImage: React.FC<MotionImageProps> = motion(Image);

interface ProductCardProps {
  thumbnail: string;
  title: string;
  price: string;
}

const easing = [0.16, 1, 0.3, 1];

const SimpleGridVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2
    },
  },
};

const GridItemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { ease: easing } },
};

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
      <MotionImage src={thumbnail} alt={title} w={185} h={185} initial={{ x: 60, opacity: 0 }}  animate={{ x: 0, opacity: 1, transition: { delay: .6 } }} />
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
      <MotionHeading
        fontSize="24"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easing }}
      >
        Select a Coffee
      </MotionHeading>
      <MotionSimpleGrid
        columns={3}
        width={762}
        columnGap="6"
        variants={SimpleGridVariants}
        initial="hidden"
        animate="show"
      >
        {ProductData.map(({ slug, sizes, ...rest }) => (
          <MotionGridItem variants={GridItemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }} key={slug}>
            <Link href={`/product/${slug}`} passHref>
              <ProductCard price={formatPrice(sizes[1].price)} {...rest} />
            </Link>
          </MotionGridItem>
        ))}
      </MotionSimpleGrid>
    </Flex>
  );
};
