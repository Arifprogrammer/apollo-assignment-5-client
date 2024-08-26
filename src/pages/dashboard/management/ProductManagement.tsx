import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../redux/features/products/productsApi";
import { getAllProducts } from "../../../redux/features/products/productSlice";
import ProductsRowsTable from "../../../components/ui/productsManagement/ProductsRowsTable";
import { useAppSelector } from "../../../redux/hook";
import { useEffect, useState } from "react";
import { TProduct } from "../../../types";
import Swal from "sweetalert2";
import EditProductModal from "../../../components/ui/productsManagement/EditProductModal";

const InitialProduct = {
  id: "",
  brand: "",
  description: "",
  image: "",
  name: "",
  price: 0,
  rating: 0,
  availableQuantity: 0,
  orderQuantity: 0,
  _id: "",
};

const ProductManagement = () => {
  const [open, setOpen] = useState(false);
  const [specificProduct, setSpecificProduct] = useState<TProduct | null>(null);

  const { isLoading, refetch } = useGetProductsQuery(0);
  const { products } = useAppSelector(getAllProducts);
  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { success } = await deleteProduct(id).unwrap();
        if (success) {
          Swal.fire("Deleted!", "Deleted", "success");
        }
      }
    });
  };

  const handleCreateProduct = () => {
    setSpecificProduct(InitialProduct);
    setOpen(true);
  };

  const handleEditProduct = (product: TProduct) => {
    setSpecificProduct(product);
    setOpen(true);
  };

  //* effects
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <button
        className="w-fit btn bg-black text-white mt-4 md:mt-0 mb-2"
        onClick={() => handleCreateProduct()}
      >
        Add Product
      </button>
      <div className="overflow-x-auto min-h-screen text-slate-800">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-slate-600 text-base">
              <th></th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length &&
              products?.map((product, index) => (
                <ProductsRowsTable
                  key={product._id}
                  product={product}
                  index={index}
                  handleEditProduct={handleEditProduct}
                  handleDeleteProduct={handleDeleteProduct}
                />
              ))}
          </tbody>
        </table>
        {isLoading && (
          <div className="text-center">
            <span className="loading loading-bars loading-md"></span>
          </div>
        )}
        {!products?.length && (
          <>
            <p className="mt-10 text-rose-600 font-bold text-lg text-center">
              You have no product !!!
            </p>
          </>
        )}
      </div>
      {specificProduct && (
        <EditProductModal
          key={specificProduct._id}
          open={open}
          setOpen={setOpen}
          specificProduct={specificProduct}
        />
      )}
    </>
  );
};

export default ProductManagement;
