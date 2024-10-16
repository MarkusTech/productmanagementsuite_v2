import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchCategories } from "../../../services/inventory/categoryService";

const categoryTableHead = [
  "Category ID",
  "Category Code",
  "Category Name",
  "Description",
  "Status",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.categoryID}</td>
    <td>{item.categoryCode}</td>
    <td>{item.categoryName}</td>
    <td>{item.description}</td>
    <td>{item.status ? "Active" : "Inactive"}</td>
  </tr>
);

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="table-container">
      <h3>CATEGORY LIST</h3>
      <br />
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={categoryTableHead}
                renderHead={renderHead}
                bodyData={categories}
                renderBody={renderBody}
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CategoryList;
