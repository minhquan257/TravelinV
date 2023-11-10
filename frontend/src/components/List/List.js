import React, { useState, createRef, useEffect } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormLabel,
  FormHelperText,
} from "@material-ui/core";
import useStyles from "./styles.js";
import PlaceDetails from "../PlaceDetails/PlaceDetails.js";
import { useSelector } from "react-redux";
const List = ({
  chidClicked,
  type,
  setType,
  rating,
  setRating,
  filteredPlaces,
}) => {
  const classes = useStyles();
  const placesData = useSelector((state) => state.places.placesData);
  const places = filteredPlaces.length ? filteredPlaces : placesData;
  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    setElRefs((refs) =>
      Array(places.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you.
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {places?.map((place, i) => (
          <Grid ref={elRefs[i]} item key={i} xs={12}>
            <PlaceDetails
              place={place}
              selected={Number(chidClicked) === i}
              refProp={elRefs[i]}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default List;
