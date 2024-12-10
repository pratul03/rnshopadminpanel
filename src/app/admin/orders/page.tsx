import { getOrdersWithProducts } from "@/actions/orders";
import PageComponent from "./page-component";

const Orders = async () => {
  const ordersWithProducts = await getOrdersWithProducts();

  if (!ordersWithProducts) {
    return (
      <div className="text-center font-bold text-xl">No orders found!🥹</div>
    );
  }

  return (
    <div>
      <PageComponent ordersWithProducts={ordersWithProducts} />
    </div>
  );
};

export default Orders;
