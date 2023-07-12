import React, { useEffect, useState } from "react";

const DataComponent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleFilter = () => {
    const filtered = data.filter((product) => {
      if (minPrice && maxPrice) {
        return product.price >= minPrice && product.price <= maxPrice;
      } else if (minPrice) {
        return product.price >= minPrice;
      } else if (maxPrice) {
        return product.price <= maxPrice;
      }
      return true;
    });
    setFilteredData(filtered);
  };

  return (
    <div>
      <h2>Data from API:</h2>
      <p>Minimum Price: {minPrice !== "" ? `$${minPrice}` : "Not set"}</p>
      <p>Maximum Price: {maxPrice !== "" ? `$${maxPrice}` : "Not set"}</p>
      <input
        type="number"
        placeholder="Minimum Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Maximum Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>
      {filteredData.length > 0 ? (
        filteredData.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <img src={product.image} alt={product.title} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default DataComponent;
