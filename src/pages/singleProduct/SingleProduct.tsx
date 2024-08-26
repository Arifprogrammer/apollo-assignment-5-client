import { useParams } from "react-router-dom";
import { getAllProducts } from "../../redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setToCart } from "../../redux/features/cart/cartSlice";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Swal from "sweetalert2";
import { TProduct } from "../../types";

const SingleProduct = () => {
  const { id } = useParams();
  const { products } = useAppSelector(getAllProducts);
  const product = products.find((product) => product._id === id);
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: TProduct) => {
    dispatch(setToCart(product));

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Product added to cart",
    });
  };

  return (
    <section className="min-h-screen  py-8 lg:py-20 px-4 md:px-8 lg:px-0 lg:w-1/2 lg:mx-auto">
      {product && (
        <>
          <div className="grid grid-cols-1 gap-y-10 font-semibold">
            <div>
              <img
                src={product.image}
                alt=""
                className="rounded-2xl shadow-lg shadow-rose-600"
              />
            </div>
            <div className="divide-y-2 space-y-4 text-slate-700">
              <div>
                <p className="text-slate-600">{product.brand}</p>
                <h2 className="card-title text-2xl text-black">
                  {product.name}
                  <div className="badge bg-rose-300 border-none text-black">
                    NEW
                  </div>
                </h2>
              </div>
              <p className="pt-4">{product.description}</p>
              <div>
                <p className="text-gray-600">
                  {product.availableQuantity
                    ? `Remaining items: ${product.availableQuantity}`
                    : "Out of stock"}
                </p>
                <Rating
                  style={{ maxWidth: 100 }}
                  readOnly
                  value={product.rating}
                />
                <p className="font-bold text-lg">${product.price}</p>
                <button
                  className="btn bg-black text-white mt-4"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProduct;
