import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Pagination,
  Paper,
} from "@mui/material";

interface Item {
  id: number;
  email: string;
  details: string;
}

interface State {
  data: Item[]; // Full data from the API
  filteredData: Item[]; // Data after applying search filter
  page: number; // Current page
  totalPages: number; // Total pages based on filtered data
  search: string; // Search input value
}

class PaginatedTable extends Component<{}, State> {
  PER_PAGE = 2; // Items per page

  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      filteredData: [],
      page: 1,
      totalPages: 1,
      search: "",
    };
  }

  // Fetch data from the API
  fetchData = async () => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/users?page_no=${this.state.page}&per_page=${this.PER_PAGE}`
      );
      const result = await response.json();
      console.log('----result',result)
      this.setState({
        data: result,
        filteredData: result,
        totalPages: Math.ceil(result.length / this.PER_PAGE),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Update filtered data based on search input
  handleSearch = (value: string) => {
    const { data } = this.state;
    const filtered = data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    this.setState({
      search: value,
      filteredData: filtered,
      totalPages: Math.ceil(filtered.length / this.PER_PAGE),
      page: 1, // Reset to the first page
    });
  };

  // Handle page change
  handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    this.setState({ page: value });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { filteredData, page, totalPages, search } = this.state;

    // Paginate filtered data
    const paginatedData = filteredData.slice(
      (page - 1) * this.PER_PAGE,
      page * this.PER_PAGE
    );

    return (
      <Paper style={{ padding: "16px" }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          value={search}
          onChange={(e) => this.handleSearch(e.target.value)}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={totalPages}
          page={page}
          onChange={this.handlePageChange}
          style={{ marginTop: "16px" }}
        />
      </Paper>
    );
  }
}

export default PaginatedTable;
