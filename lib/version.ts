export interface Version {
  n: {
    item: string;
    rune: string;
    mastery: string;
    summoner: string;
    champion: string;
    profileicon: string;
    map: string;
    language: string;
    sticker: string;
  };
  v: string;
  l: string;
  cdn: string;
  dd: string;
  lg: string;
  css: string;
  profileiconmax: number;
  store: any;
}

export const getLastestVersion = async () => {
  const res = await fetch("https://ddragon.leagueoflegends.com/realms/na.json");

  return res.json();
};
