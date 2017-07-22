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

export default class Gyujtes extends React.Component {

  render() {
      return (
          <div>
            <Header as="h1" textAlign="center">Adatgyüjtés</Header>
            <p className="bigtext">
            Kezdetben, legyen bármilyen kiterjesztésű is, minden szöveges dokumentum valamilyen hierarchikus szerkezetet követ. Tehát annak tartalmát dekódolni tudjuk, hogy végül csak a fontosabb, környezetfüggetlen üzentetettel dolgozzunk tovább. Az eljárás bemenete különbözhet attól függően, hogy mire használjuk, mit akarunk elemezni, mi a feladatunk. Algoritmusok általában megelégszenek a dokumentumok ún. reprezentációs egységeivel amik sok esetben szavaknak felelnek meg. Az előfeldolgozás megkezdéséhez csoportosítanunk kell a korpuszunkat dokumentumokra. Enélkül a lépés nélkül csak "puha" vagy "gyenge" klaszterezést végezhetünk amely a szavakra általánosan kinyerhető információkat ad vissza. Ellenkező esetben "erős" klasztert készíthetünk amely nem csak szavak szintjén hanem ami fontosabb, dokumentumok szintjén szolgáltat egyféle rendezést, csoportosítást. Ezek mellet szerepelhet különféle dokumentumra értelmezett meta-információ mint például: formátum, kódolás, hely, idő, szerző, statisztikák és egyéb adatok amelyek nem számítanak címkéknek. Ha címkék is találhatók akkor már érdemesebb a klaszterezés testvérét az osztályozót használhatunk.
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

          </div>
      )
  }
}
