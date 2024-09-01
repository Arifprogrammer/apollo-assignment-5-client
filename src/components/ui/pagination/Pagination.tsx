interface IProps {
  index: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ index, page, setPage }: IProps) => {
  return (
    <div className="join">
      <input
        className="join-item mr-1 btn btn-square bg-black text-white border-none hover:text-white checked:!bg-[#D62828] checked:!text-white"
        type="radio"
        name="options"
        aria-label={index.toString()}
        defaultChecked={index === page}
        onClick={() => setPage(index)}
      />
    </div>
  );
};

export default Pagination;
