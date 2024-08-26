import { TProduct } from "../../../types";

interface ProductsRowsTableProps {
  product: TProduct;
  index: number;
  handleDeleteProduct: (id: string) => void;
  handleEditProduct: (product: TProduct) => void;
}

const ProductsRowsTable = ({
  product,
  index,
  handleDeleteProduct,
  handleEditProduct,
}: ProductsRowsTableProps) => {
  const { _id, name, image, price, brand } = product;

  return (
    <>
      <tr className="font-bold">
        <th>{index + 1}</th>
        <td>
          <span className="flex items-center space-x-3">
            <span className="avatar">
              <span className="mask mask-squircle w-12 h-12">
                <img src={image} alt="class picture" />
              </span>
            </span>
          </span>
        </td>
        <td>{name}</td>
        <td>{brand}</td>
        <td>$ {price}</td>
        <td>
          <button
            className="px-3 border-2 border-black text-black hover:text-white hover:bg-black rounded-3xl block w-20 mb-2"
            onClick={() => handleEditProduct(product)}
          >
            Edit
          </button>
          <button
            className="px-3 border-2 border-rose-600 text-rose-600 hover:text-white hover:bg-rose-600 rounded-3xl w-20"
            onClick={() => handleDeleteProduct(_id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default ProductsRowsTable;
