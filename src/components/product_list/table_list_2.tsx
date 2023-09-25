"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef,GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import Card from "@mui/material/Card";
import { ProductList } from "@/app/types.d";


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'description', headerName: 'description', width: 300 },
    { field: 'price', headerName: 'price', width: 300 },
    { field: 'discountPercentage', headerName: 'discountPercentage', width: 300 },
    { field: 'rating', headerName: 'rating', width: 300 },
    { field: 'stock', headerName: 'stock', width: 300 },
    { field: 'brand', headerName: 'brand', width: 300 },
    { field: 'category', headerName: 'category', width: 300 },
    { field: 'thumbnail', headerName: 'thumbnail', width: 300 },
    // { field: 'images', headerName: 'images', width: 300 },
    // { field: 'quantity', headerName: 'quantity', width: 300 }
];

interface Props {
    tablelist: ProductList[];
  }
  

export default function productsList({tablelist}: Props) {
  return (
    <Box sx={{ height: 700, width: '100%', border: "none" }} >
      {/* <Card sx={{p:"2em"}}> */}
      <DataGrid
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 }
        }
      }}
        rows={tablelist}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 11,
            },
          },
        }}
        pageSizeOptions={[8]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      {/* </Card> */}

    </Box>
  );
}
