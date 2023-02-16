import * as React from 'react';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { Product } from '@/graphql/product/schema';

interface SorterProps {
  setSortedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
}

export default function Sorter({
  setSortedProducts,
  products,
}: SorterProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (sort: (a: Product, b: Product) => number) => {
    setSortedProducts([...products].sort(sort));
    handleClose();
  };

  const sortNewest = (a: Product, b: Product) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  };

  const sortOldest = (a: Product, b: Product) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  };

  const sortHighestPrice = (a: Product, b: Product) => {
    return b.price - a.price;
  };

  const sortLowestPrice = (a: Product, b: Product) => {
    return a.price - b.price;
  };


  return (
    <>
      <Button
        id="basic-demo-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        color="neutral"
        onClick={handleClick}
        sx={{ ml: 4, mt: 2 }}
      >
        sort products
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-labelledby="basic-demo-button"
      >
        <MenuItem onClick={() => handleSort(sortNewest)}>Newest</MenuItem>
        <MenuItem onClick={() => handleSort(sortOldest)}>Oldest</MenuItem>
        <MenuItem onClick={() => handleSort(sortHighestPrice)}>Price High</MenuItem>
        <MenuItem onClick={() => handleSort(sortLowestPrice)}>Price Low</MenuItem>
      </Menu>
    </>
  );
}