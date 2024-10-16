import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchLocations } from "../../../services/inventory/locationService";

const TableHead = ["ID", "Location Name", "Description", "Status"];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.locationID}</td>
    <td>{item.locationName}</td>
    <td>{item.description}</td>
    <td>{item.status ? "Active" : "Inactive"}</td>
  </tr>
);

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const data = await fetchLocations();
        setLocations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getLocations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="table-container">
      <h3>LOCATION LIST</h3>
      <br />
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={TableHead}
                renderHead={renderHead}
                bodyData={locations}
                renderBody={renderBody}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationList;
