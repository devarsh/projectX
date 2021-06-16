import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

export const CardComponent1 = ({ label }) => (
  <Card>
    <CardContent>
      <Typography gutterBottom variant="h1" component="h1">
        {label}
      </Typography>
    </CardContent>
  </Card>
);

export const CardComponent2 = ({ label }) => (
  <Card>
    <CardContent>
      <Typography gutterBottom variant="h2" component="h2">
        {label}
      </Typography>
    </CardContent>
  </Card>
);

export const CardComponent3 = ({ label }) => (
  <Card>
    <CardContent>
      <Typography gutterBottom variant="h3" component="h3">
        {label}
      </Typography>
    </CardContent>
  </Card>
);
