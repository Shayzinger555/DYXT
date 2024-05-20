import { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  right: "0vw",
  color: "white",
  // zIndex: -1,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.45),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "6vw",
      zIndex: 0,
      "&:focus": {
        width: "8vw",
        zIndex: 0,
      },
    },
  },
}));

export default function SearchAppBar({ allValues, setFilteredValues }) {
  const [searchString, setSearchString] = useState("");

  const handleChange = (e) => {
    const searchString = e.target.value.toLowerCase();
    setSearchString(searchString);
    const filteredValues = allValues.filter((value) => {
      for (const key in value) {
        if (typeof value[key] === "string") {
          if (value[key].toLowerCase().includes(searchString)) {
            return true;
          }
        }
      }
      return false;
    });
    setFilteredValues(filteredValues);
  };

  useEffect(() => {
    console.log(searchString);
  }, [searchString]);

  return (
    <Box sx={{ flexGrow: 1, zIndex: 0 }}>
      <Toolbar>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleChange}
          />
        </Search>
      </Toolbar>
    </Box>
  );
}
