import { Box } from "@mui/material";
import Header from "../component/Header";

function Basic() {
  return (
    <>
      <Header></Header>
      <main style={{ margin: "10px" }}>
        <Box
          sx={{
            border: "1px solid blue",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          게시판1
        </Box>
        <Box
          sx={{
            border: "1px solid blue",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          게시판2
        </Box>
      </main>
    </>
  );
}

export default Basic;
