"use client"; // Added for Next.js 15+ client-side rendering

import React, { useState, useEffect } from 'react';
import { fetchPorts, createPort, updatePort, deletePort } from '../services/apiService';
import './DataTable.css';


const DataTable = () => {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState({ field: '', order: '' });
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [columns, setColumns] = useState({
    id: true,
    name: true,
    city: true,
    country: true,
    province: true,
    timezone: true,
    code: true,
    updatedAt: true
  });

  useEffect(() => {
    loadData();
  }, [sort, filter, page]);

  const loadData = async () => {
    try {
      const params = { _page: page, _limit: 5, q: filter };
      if (sort.field) {
        params._sort = sort.field;
        params._order = sort.order;
      }
      const response = await fetchPorts(params);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSort = (field) => {
    const order = sort.field === field && sort.order === 'asc' ? 'desc' : 'asc';
    setSort({ field, order });
  };

  const handleFilter = (e) => setFilter(e.target.value);

  const handlePageChange = (newPage) => setPage(newPage);

  const toggleColumn = (column) => setColumns({ ...columns, [column]: !columns[column] });

  const handleCreate = async (newRecord) => {
    try {
      await createPort({ ...newRecord, updatedAt: new Date().toISOString() });
      loadData();
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  const handleUpdate = async (id, updatedRecord) => {
    try {
      await updatePort(id, { ...updatedRecord, updatedAt: new Date().toISOString() });
      loadData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePort(id);
      loadData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Search..." onChange={handleFilter} />
      <table>
        <thead>
          <tr>
            {Object.keys(columns).map((col) => columns[col] && <th key={col} onClick={() => handleSort(col)}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {Object.keys(columns).map((col) => columns[col] && <td key={col}>{item[col]}</td>)}
              <td>
                <button onClick={() => handleUpdate(item.id, item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Prev</button>
      <button onClick={() => handlePageChange(page + 1)}>Next</button>
    </div>
  );
};

export default DataTable;
