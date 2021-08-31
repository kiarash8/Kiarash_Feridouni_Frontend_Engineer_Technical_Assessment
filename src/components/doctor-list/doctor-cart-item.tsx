import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Chip, Grid, List, ListItem, ListItemIcon, ListItemText, Card, CardContent, Typography } from '@material-ui/core';
import PlaceIcon from '@material-ui/icons/Place';
import PhoneIcon from '@material-ui/icons/Phone';
import { IDoctor } from '../../data-source/schemas';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header:{
        display: 'flex',
        justifyContent: 'space-between'
    },
    cardContent:{
        paddingBottom: `${theme.spacing(2)}px!important`
    },
    serviceTypeContainer:{
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0.5),
        },
        '& :first-child':{
          marginLeft: 0,
        }
    },
    contactList:{
        '& .MuiListItem-root':{
            paddingLeft: 0,
            paddingRight: 0,
        }
    },
    sequences:{
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0.5),
        },
        '& :first-child':{
          marginLeft: 0,
        }
    }
  }),
);

const DoctorCartItem: React.FC<{data: IDoctor}> = ({data}) => {
    const classes = useStyles();
        
    return (
        <Grid item xs={12}>
            <Card variant="outlined">
            <CardContent className={classes.cardContent}>
            <div className={classes.header}>
                <Typography>{data.name}</Typography>
                <div className={classes.serviceTypeContainer}>
                    {data.serviceTypes.map((item, index) => <Chip key={index} label={item} variant="outlined" />)}
                </div>
            </div>
            <List className={classes.contactList}>
                <ListItem>
                <ListItemIcon>
                    <PlaceIcon />
                </ListItemIcon>
                <ListItemText primary={data.address1} secondary={<span>
                    <div>{data.address2}</div>
                    <small><i>({data.region}/{data.location})</i></small>
                </span>} />
                </ListItem>
                <ListItem>
                <ListItemIcon>
                    <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary={data.telephones} />
                </ListItem>
            </List>
            <Typography color="textSecondary" gutterBottom>Consultation Fee: ${data.price}</Typography>
            <div className={classes.sequences}>
                {data.sequences.map((sequence, index) => 
                    <React.Fragment key={index}>
                        {sequence.days.map((day, dayIndex) => 
                            <Chip key={dayIndex} label={`${day}: ${sequence.times}`} variant="outlined" size="small" />
                        )}
                    </React.Fragment>
                )}
            </div>
            </CardContent>
        </Card>
        </Grid>
    );
}

export default DoctorCartItem;
