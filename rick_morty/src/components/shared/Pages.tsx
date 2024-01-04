import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataAction } from "../../redux/DataSlice";
import Card from "./Card";
import { Link } from "react-router-dom";

interface PagesProps {
  check: string;
}

function Pages({ check }: PagesProps) {
  const page = useSelector((state) => state.data.pageNumber);
  const TotalPages = useSelector((state) => state.data.filterdata.Totalpage);
  const dispatch = useDispatch();

  const nextpage = () => {
    if (page >= TotalPages) {
      dispatch(dataAction.setpage(1));
      return;
    }
    dispatch(dataAction.setpage(page + 1));
  };

  const prvPage = () => {
    if (page <= 1) {
      dispatch(dataAction.setpage(1));
      return;
    }
    dispatch(dataAction.setpage(page - 1));
  };

  let filterdata = useSelector((state) => state.data.filterdata.filterdata);

  if (check && filterdata.length !== 0) {
    const startIndex = (page - 1) * TotalPages;
    const endIndex = startIndex + 20;
    filterdata = filterdata?.slice(startIndex, endIndex);
  }
  const pagenumber = Array.from({ length: TotalPages }, (_, i) => i + 1);

  useEffect(() => {
    dispatch(dataAction.setpage(1));
  }, [check, dispatch]);

  const displayData =
    filterdata?.length > 0 ? (
      filterdata.map((item) => (
        <Link
          key={item.id}
          to={`/profile/${item.id}`}
          style={{ textDecoration: "none" }}
        >
          <Card item={item}></Card>
        </Link>
      ))
    ) : (
      <h1 style={{ color: check ? "black" : "white" }}>No data Found</h1>
    );

  return (
    <div>
      <div className="flex flex-wrap gap-8 justify-center">{displayData}</div>

      <div className="flex flex-wrap gap-4 justify-center items-center mt-4 text-white">
        {pagenumber.map((pageNumber) => (
          <div
            key={pageNumber}
            className={`bg-gray-500 p-2 rounded-md ${
              pageNumber === page ? "bg-red-500" : ""
            }`}
            onClick={() => dispatch(dataAction.setpage(pageNumber))}
          >
            {pageNumber}
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-4 gap-4">
        <button
          className="p-2 text-white bg-gray-500 rounded-md hover:bg-green-500"
          onClick={prvPage}
        >
          Pre
        </button>
        <button
          className="p-2 text-white bg-gray-500 rounded-md hover:bg-green-500"
          onClick={nextpage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pages;
