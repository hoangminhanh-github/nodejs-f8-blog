import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination({ count, onChange }) {
  const handleChange = (e, value) => {
    onChange(e, value);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.round(count / 5)}
        color="primary"
        onChange={handleChange}
      />
    </Stack>
  );
}
