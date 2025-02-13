"use client"; // Added for Next.js 15+ client-side rendering

import DataTable from '../components/DataTable';

export default function Home() {
  return (
    <div>
      <h1>Data Table App</h1>
      <DataTable />
    </div>
  );
}
