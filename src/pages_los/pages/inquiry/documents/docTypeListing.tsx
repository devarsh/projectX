import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 100,
  },
});

const docMeta = [
  {
    groupName: "Pii",
    groupLabel: "Personal Information",
    docTypes: [
      {
        docId: "34",
        docLabel: "Pancard",
        docDescription: "Copy of pancard front and back",
      },
    ],
  },
];

export const FolderCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
      </CardActionArea>
      <CardContent>
        <Typography variant="h6" color="textPrimary" component="p">
          Approved
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          Pancard
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Pancard Front and Back
        </Typography>
      </CardContent>
    </Card>
  );
};
