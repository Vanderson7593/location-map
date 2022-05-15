import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

import dynamic from "next/dynamic";
import { Box, Grid, Typography } from "@mui/material";
import AutoComplete from "components/atom/autocomplete";
import { Form } from "@components";

const MapWithNoSSR = dynamic(() => import("../components/map"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Location to map</title>
      </Head>

      <main className={styles.main}>
        <Box my={5}>
          <Typography color="primary" variant="h3">
            Search your location
            <AddLocationAltIcon fontSize="large" />
          </Typography>
        </Box>

        <Grid container spacing={5} justifyContent="center">
          <Grid item>
            <Form />
          </Grid>
          <Grid item>
            <MapWithNoSSR />
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default Home;
