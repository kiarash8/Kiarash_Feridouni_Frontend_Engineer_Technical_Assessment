import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Checkbox, Grid, TextField } from '@material-ui/core';
import {Pagination, Autocomplete, Alert } from '@material-ui/lab';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Service } from '../../data-source/service';
import { IArea, IDoctor } from '../../data-source/schemas';
import DoctorCartItem from './doctor-cart-item';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filtering:{
        marginTop: theme.spacing(2)
    },
    pagination:{
        '& .MuiPagination-ul':{
            justifyContent: 'center'
        }
    }
  }),
);

const DoctorList: React.FC = () => {
    const classes = useStyles();
    let dataSource = require('../../data.json');
    const service = new Service(dataSource);
    const areas = service.getAreas();
    const serviceTypes = service.getServiceTypes();
    const [data, setData] = useState<{
        items: IDoctor[];
        pages: number;
    }>({
        items: [],
        pages: 0,
    });
    const [page, setPage] = useState<number>(1);
    const [selectedRegion, setSelectedRegion] = useState<IArea | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<string[] | null>(null);
    const [selectedService, setSelectedService] = useState<string[] | null>(null);

    useEffect(() => {
        setData(service.retrieveData(page, {
            serviceTypes: selectedService,
            region: selectedRegion ? selectedRegion.region : null,
            locations: selectedLocation
        }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page, selectedService, selectedRegion, selectedLocation]);
    
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Grid container spacing={3} className={classes.filtering}>
                    <Grid item xs={12}>
                        <Autocomplete
                            size="small"
                            multiple
                            options={serviceTypes}
                            getOptionLabel={(option) => option}
                            renderOption={(option, { selected }) => (
                                <React.Fragment>
                                  <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                  />
                                  {option}
                                </React.Fragment>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Services" placeholder="choose a service" />
                            )}
                            onChange={(_event, value) => {
                                setSelectedService(value);
                                setPage(1);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            size="small"
                            options={areas}
                            getOptionLabel={(option) => option.region}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Region" placeholder="choose a region" />
                            )}
                            onChange={(_event, value) => {
                                setSelectedRegion(value)
                                setSelectedLocation(null);
                                setPage(1);
                            }}
                        />
                    </Grid>
                    {selectedRegion && <Grid item xs={12}>
                        <Autocomplete
                            size="small"
                            multiple
                            options={selectedRegion ? selectedRegion.locations : []}
                            getOptionLabel={(option) => option}
                            renderOption={(option, { selected }) => (
                                <React.Fragment>
                                  <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                  />
                                  {option}
                                </React.Fragment>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Locations" placeholder="choose a location" />
                            )}
                            onChange={(_event, value) => {
                                setSelectedLocation(value);
                                setPage(1);
                            }}
                        />
                    </Grid>}
                </Grid>
            </Grid>
            {data.items.length === 0 ?
                <Grid item xs={12}>
                    <Alert variant="outlined" severity="warning">It looks like there aren't any matches for your search!</Alert>
                </Grid>
            :
                data.items.map((item, index) => <DoctorCartItem key={index} data={item} />)
            }
            <Grid item xs={12}>
                <Pagination
                    className={classes.pagination}
                    count={data.pages}
                    page={page}
                    onChange={(_event: React.ChangeEvent<unknown>, value: number) => setPage(value)}
                />
            </Grid>
        </Grid>
    );
}

export default DoctorList;
