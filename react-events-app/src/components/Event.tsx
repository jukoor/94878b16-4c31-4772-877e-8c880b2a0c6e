import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FmdGood from "@mui/icons-material/FmdGood";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Add from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

import "./Event.scss";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: 0,
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

type Props = {
  title: string;
  flyerFront: string;
  venueName: string;
  venueGmapsUrl: string;
  date: string;
};

const Event: React.FC<Props> = ({
  title,
  flyerFront,
  venueName,
  venueGmapsUrl,
  date,
}) => {
  const dateFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  // TODO: Types
  let formatedDate = new Date(date).toLocaleString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Grid xs={4} className="event-card">
      <Item>
        <Card>
          <CardMedia
            component="img"
            alt={title}
            height="140"
            image={flyerFront}
          />
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              <CalendarMonth />
              {formatedDate}
            </Typography>
            <Typography gutterBottom component="h2" variant="h6">
              {title}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              <FmdGood />
              <a
                className="external-link"
                href={venueGmapsUrl}
                target="_blank"
                aria-label="Google Maps directions to venue"
              >
                {venueName}
              </a>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" startIcon={<Add />}>
              Add
            </Button>
          </CardActions>
        </Card>
      </Item>
    </Grid>
  );
};

export default Event;
