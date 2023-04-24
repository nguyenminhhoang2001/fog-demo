import React, { useEffect } from "react";
import Slice from "../home/Slice";
import ListProduct from "../home/ListProduct";
import { useDispatch, useSelector } from "react-redux";
import { fecthProduct } from "../../featue/redux/productSlice";

const Showproduct = () => {
  const { product, isLoading } = useSelector((state) => state.product);
  const dispath = useDispatch();
  useEffect(() => {
    dispath(fecthProduct());
  }, []);
  return (
    <div>
      <Slice />
      <ListProduct product={product} isLoading={isLoading} />
    </div>
  );
};

export default Showproduct;
