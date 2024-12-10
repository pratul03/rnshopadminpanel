/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrdersWithProducts } from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  ordersWithProducts: OrdersWithProducts;
};
const statusOptions = ["Pending", "Shipped", "InTransit", "Completed"];

type OrderedProducts = {
  order_id: number;
  product: number & {
    category: number;
    created_at: string;
    heroImage: string;
    id: number;
    imagesUrl: string[];
    maxQuantity: number;
    price: number;
    slug: string;
    title: string;
  };
}[];

export default function PageComponent({ ordersWithProducts }: Props) {
  const [selectedProducts, setSelectedProducts] = useState<OrderedProducts>([]);

  const openProductModal = (products: OrderedProducts) => () =>
    setSelectedProducts(products);

  const orderedProducts = ordersWithProducts.flatMap((order) =>
    order.order_items.map((item) => ({
      order_id: order.id,
      product: item.product,
    }))
  );

  const handleStatusChange = async (orderId: number, status: string) => {
    await updateOrderStatus(orderId, status);
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Orders management Dashboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersWithProducts.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>
                {format(new Date(order.created_at), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>
                <Select
                  onValueChange={(value) => handleStatusChange(order.id, value)}
                  defaultValue={order.status}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue>{order.status}</SelectValue>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              </TableCell>
              <TableCell>{order.description || "No Description"}</TableCell>
              {/** @ts-ignore */}
              <TableCell>{order.user.email}</TableCell>
              <TableCell>{order.slug}</TableCell>
              <TableCell>{order.totalPrice.toFixed(2)} ₹/-</TableCell>
              <TableCell>
                {order.order_items.length} item{" "}
                {order.order_items.length > 1 ? "s" : ""}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      onClick={openProductModal(
                        orderedProducts.filter(
                          (item) => item.order_id === order.id
                        )
                      )}
                    >
                      View Products
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Order Products</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      {selectedProducts.map(({ product }, index) => (
                        <div
                          key={index}
                          className="mr-2 mb-2 flex items-center space-x-2"
                        >
                          <Image
                            src={product.heroImage}
                            alt="Product Image"
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              {product.title}
                            </span>
                            <span className="text-gray-600">
                              {product.price.toFixed(2)} ₹/-
                            </span>
                            <span className="text-sm to-gray-500">
                              Available quantity : {product.maxQuantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
