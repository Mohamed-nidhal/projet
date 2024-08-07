import {
  Box,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import AdmQuestionnaire from "../AdmQuestionnaire/AdmQuestionnaire";
import Participant from "../Participant/Participant";

const Row1 = () => {
  const theme = useTheme();
  return (
    <Stack direction={"row"} flexWrap={"wrap"} gap={2} mt={2}>
      <Paper
        sx={{
          maxWidth: 500,
          flexGrow: 1,
          minWidth: "580px",
          borderRadius: "12px",
          boxShadow: 2,
          overflow: "hidden",
          height: "400px",
        }}
      >
        <Stack
          spacing={2}
          p={2}
          height="100%"
          sx={{
            overflowY: "auto", // Enable vertical scrolling
            cursor: "pointer", // Add a cursor style for scrollable area
          }}
        >
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            Questionnaire Management
          </Typography>
          <AdmQuestionnaire isDashboard={true} />
        </Stack>
      </Paper>
      
      <Paper
        sx={{
          maxWidth: 500,
          flexGrow: 1,
          minWidth: "580px",
          borderRadius: "12px",
          boxShadow: 2,
          overflow: "hidden",
          height: "400px",
        }}
      >
        <Stack
          spacing={2}
          p={2}
          height="100%"
          sx={{
            overflowY: "auto", // Enable vertical scrolling
            cursor: "pointer", // Add a cursor style for scrollable area
          }}
        >
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            Participant Overview
          </Typography>
          <Participant isDashboard={true} />
        </Stack>
      </Paper>

      {/* <Box
        sx={{
          overflowY: "auto",  // Enable vertical scrollbar
          overflowX: "hidden", // Hide horizontal scrollbar
          borderRadius: "12px",
          minWidth: "280px",
          maxHeight: 700,
          flexGrow: 1,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.default,
          cursor: "pointer", // Add a cursor style for scrollable area
          padding: 2,  // Optional: Add padding for better content spacing
        }}
      >
      </Box> */}
    </Stack>
  );
};

export default Row1;
