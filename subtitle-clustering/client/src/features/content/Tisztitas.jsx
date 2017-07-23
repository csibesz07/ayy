import React from "react";
import {
    Header,
    Container,
    Segment,
    Divider,
    Grid,
    Image,
    Icon
} from "semantic-ui-react";

export default class Tisztitas extends React.Component {

  render() {
      return (
          <div>
            <Header as="h1" textAlign="center">Előfeldolgozás</Header>
            <p className="bigtext">
            Az előfeldolgozás az a szövegfeldolgozásnál használt folyamat amely során kiszűrjük a bemenetben található zajokat és megpróbáljuk egységes formára hozni a bemenet valamiféle normalizálás, szótár vagy generátorok segítségével. Ebbe bele tartozik a forrásfájl típusának (doc, rtf, pub, pdf, xml, json) szöveges fájllá való átdolgozása. Minél hatékonyabban valósítjuk meg az átalakítást annál gyorsabb és pontosabb végeredményt kapunk a későbbiekben.
            </p>
            <Header as="h2" textAlign="center">Tokenizálás</Header>
            <Grid stretched padded relaxed textAlign="justified" verticalAlign="middle">
            <Grid.Column className="largetext" width={12}>
             Tokenizálás célja a oldalak, bekezdések, mondatok lebontása és elválasztása kisebb elemi objektumokra, tokenekre, amelyeknek önmagukban is van értelme. Az egységek legtöbbször fehér szóközök között találhatóak. Két legismertebb felbontás a szózsákmodell és az n-gramm osztályok. Az előbbi minden szót egy egységnek vesz, míg az utóbbi már a sorrendet is figyelembe veszi, ezzel egyfajta általánosítása is a szózsákmodellnek. Az n-gramm osztályok széles körben vannak alkalmazva, főleg távol-keleti nyelveknél ahol nincsenek jól elkülöníthető szavak (kínai,japán).
            </Grid.Column>
            <Grid.Column width={4}>
            <Icon name="ellipsis horizontal" loading size="massive"/>
            </Grid.Column>
            </Grid>
            <Header as="h2" textAlign="center">Szótövezés és lemmatizálás</Header>
            <Grid stretched padded relaxed textAlign="justified" verticalAlign="middle">
            <Grid.Column width={4}>
            <Icon name="sitemap" size="massive"/>
            </Grid.Column>
            <Grid.Column className="largetext" width={12} >
            Egy másik fontos eljárás amely hasznos bármely szövegfeldolgozó számara es a későbbi dimenziókat is jóval lecsökkenti az a szavak szótövezése és társa a lemmatizálás. Mindkettő módszer lényege a mondatelemek átalakítása, levágása hogy végül megszabaduljunk a morfológiában ismert nyelvi jelektől, ragoktól esetleges képzőktől. Míg lemmatizálásnál a szó alakja teljesen megváltozhat jelentését megtartva (pl: warm -> hot), addig szótövezésnél (stemming) csak különböző vágássokkal módosulnak a szavak, ennek eredményeképpen nem biztos hogy értelmes kimenetet kapunk. (pl. having -> hav)
            </Grid.Column>
            </Grid>
            <Header as="h2" textAlign="center">Stopszószűrés</Header>
            <Grid stretched padded relaxed textAlign="justified" verticalAlign="middle">
            <Grid.Column className="largetext" width={12}>
            Ha megnézünk bármilyen olvasmányt észrevehetjük, hogy bizony akadnak kifejezések amik témától függetlenül előfordulnak és önmagukban kevés információt nyújtanak az adott tárgyról. Ebből adódóan ezeket az elemeket érdemes kiszűrni hiszen ezzel is csökkentjük a későbbi mátrixunk nem-zérus helyeinek számát. A stopszó-szótárakban tehát azok a szavak szerepelnek amik sok dokumentumban fordulnak elő és jelentésük elhanyagolható. (pl az, abból, igen, stb.)
            </Grid.Column>
            <Grid.Column width={4}>
            <Icon name="cut" loading size="massive"/>
            </Grid.Column>
            </Grid>
          </div>
      )
  }
}
