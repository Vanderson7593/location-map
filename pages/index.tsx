import { Form } from "@components";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import dynamic from "next/dynamic";
import { Grid } from "@mui/material";

const MapWithNoSSR = dynamic(() => import("../components/map") as any, {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Draw it - Form</title>
      </Head>

      <main className={styles.main}>
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
