import * as React from "react";
import useResize from "../../hooks/useResize";
import CartDesktop from "./CartDesktop";
import CartMobile from "./CartMobile";
const Cart = () => {
  const size = useResize();
  console.log(size.with);
  return <>{size.with > 768 ? <CartDesktop /> : <CartMobile />}</>;
};

export default Cart;
