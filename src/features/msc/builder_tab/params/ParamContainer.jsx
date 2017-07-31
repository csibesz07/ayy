import React from "react";
import {Step,Divider,Container,Grid,Dropdown,Header,Item,Segment} from "semantic-ui-react";
import { StickyContainer, Sticky } from 'react-sticky';

import { unwrap,addKeys } from "common/utils/common"

import ParamComponent from "./ParamComponent"

export default class ParamContainer extends React.Component {
    constructor(props){
      super(props)
    }

    render() {
        const {onParamChange,global_params,local_params, defaultParams ,...otherProps} = this.props;

        var generate_params = (title,params) =>
            unwrap(<wrap>
                <Grid.Row>
                  <Grid.Column>
                      <Header content={title+" :"}/>
                      <Grid fluid>
                        {params &&
                          Object.keys(params).map( key =>
                                <Grid.Row>
                                <Grid.Column width={10}>
                                  <Item.Group style={{marginLeft:"5%"}}>
                                  <Item>
                                    <Item.Content>
                                      <Item.Header content={key}/>
                                      <Item.Meta>Leírás</Item.Meta>
                                      <Item.Description>
                                        {params[key].description}
                                      </Item.Description>
                                      <Item.Extra content={"Típus:\t"+(params[key].type || "Megadott")}/>
                                    </Item.Content>
                                  </Item>
                                  </Item.Group>
                                </Grid.Column>
                                <Grid.Column verticalAlign="middle" width={6}>
                                    <ParamComponent onParamChange={value=>onParamChange({[key]:value})}
                                    current_value={defaultParams[key]}
                                    default_value={params[key].default_value}
                                    name={key} type={params[key].type} pv={params[key].possible_values}/>
                              </Grid.Column>
                              </Grid.Row>)
                            }
                       </Grid>
                   </Grid.Column>
                  </Grid.Row>
                </wrap>)

        return (
            <div>
              { (global_params || local_params) && <Header content="Paraméterek: "/> }
              <Grid centered>
                { global_params &&
                  generate_params("Globális",global_params)}
                { local_params &&
                  generate_params("Lokális",local_params)}
              </Grid>
            </div>
        )
      }
}
