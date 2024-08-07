import React from "react";
import Row1 from "./Row1";
import Button from "@mui/material/Button";
import { DownloadOutlined } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";

const AdmDash = () => {
  const theme = useTheme();
  return (
    <Box sx={{ padding: 3, backgroundColor: theme.palette.background.paper }}>
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} mb={2}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Administration Dashboard
        </Typography>
        <Box>
          <Button
            sx={{ 
              padding: "8px 16px", 
              textTransform: "capitalize", 
              borderRadius: "20px",
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
              }
            }}
            variant="contained"
            color="primary"
          >
            <DownloadOutlined sx={{ mr: 1 }} />
            Download Reports
          </Button>
        </Box>
      </Stack>

      <Row1 />
    </Box>
  );
};

export default AdmDash;
