import React, { useEffect, useState, useMemo } from 'react';

export default function ComponentProva() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!searchTerm) return;

    const fetchData = async () => {
      console.log(searchTerm);
      try {
        const response = await fetch('https://epsg.io/?format=json&q=' + searchTerm);
        console.log('query== ', response);
        const res = await response.json();
        console.log('response is instead', res);
        setData(res.results);
      } catch (error) {
        console.error("Errore durante la fetch:", error);
      }
    };

    fetchData();

  }, [searchTerm]); 

  const filteredData = useMemo(() => {
    if (data && data.length > 0) {
      console.log('data is ===>', data);
      return data.filter((item) => (item.area.toLowerCase()).includes(searchTerm.toLowerCase()) || (item.name.toLowerCase()).includes(searchTerm.toLowerCase()) || (item.code.toLowerCase()).includes(searchTerm.toLowerCase()));
    }
    return [];
  }, [data, searchTerm]); 

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (

    
    <>
      <input type="text" value={searchTerm} onChange={handleChange} />
      {filteredData.length > 0 ? (
        <ul>
          {filteredData.map((item, index) => (
            <li key={index}>Area: {item.area} - Name: {item.name} - Code: {item.code}</li>
          ))}
        </ul>
      ) : (
        <p>No results</p>
      )}
    </>
  );
}