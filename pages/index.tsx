import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GetStaticProps } from "next";
import { Champion, Champions, getChampions } from "../lib/champions";
import { useRef, useState } from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#F5F5F5",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: "40px",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    button: {
      marginBottom: "20px",
    },
  })
);

interface HomeProps {
  champions: Champions;
}

const getChampionKeys = (champions: Champions) => {
  return Object.keys(champions.data).reduce(
    (acc, cur) => [...acc, champions.data[cur].key],
    []
  );
};

export default function Home({ champions }: HomeProps) {
  const classes = useStyles();
  const championKeys = useRef<string[]>(getChampionKeys(champions)).current;
  const [randomList, setRandomList] = useState<Champion[]>([]);

  const random = () => {
    let result = [];
    const maximum = championKeys.length;

    for (let i = 0; i < 10; i++) {
      const random = Math.floor(Math.random() * maximum);
      const key = championKeys[random];
      result.push(key);
    }

    result = result.map((key) =>
      Object.keys(champions.data).find((i) => champions.data[i].key === key)
    );

    setRandomList(result);
  };

  return (
    <div className={classes.root}>
      <Head>
        <title>Random LOL champion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={random}
      >
        Radom
      </Button>
      {!!randomList.length && (
        <Grid container spacing={3}>
          {randomList.map((item, index) => (
            <Grid item xs={6} key={index}>
              <Paper className={classes.paper}>{item}</Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const champions = await getChampions();
  return {
    props: {
      champions,
    },
  };
};
