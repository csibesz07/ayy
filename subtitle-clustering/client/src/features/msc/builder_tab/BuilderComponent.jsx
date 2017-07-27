import React from "react";
import {Step,Divider,Container,Grid,Dropdown,Header,Item,
        Dimmer,Loader,Segment,Image,Button} from "semantic-ui-react";
import { StickyContainer, Sticky } from 'react-sticky';

import { unwrap,addKeys } from "common/utils/common"

import ParamContainer from "./params/ParamContainer"
import IOComponent from "./IOComponent"

import {propsByType} from "./common"

import "./builder.css"


export default class BuilderComponent extends React.Component {
    constructor(props){
      super(props)
    }

    handleChange(e,data) {
      console.log(data);
    }

    render() {
        const {isFetchingProcess,canDelete,isFetchingType,onTaskChange,onTaskAdd,onTaskDelete,onTaskProcess,types, current, ...otherProps}
        = this.props;
        const { id, name, params, type} = current;
        const {category_key,input_types,output_type,type_params} = type;

        const dropdown_options=(!isFetchingType &&
                [].concat(...Object.keys(types).map((key,idx1) =>
                  [<Dropdown.Header content={key} {...propsByType[key]}/>
                    ,...types[key].types.map( (subtype,idx2) =>
                    ({key:idx1*5000+idx2+1, value:subtype.name, text:subtype.name}))
                  ,{key:idx1*-5000-1,content:<Divider fitted fluid/>}]))
                ) || [{text: name, value:name}]

        return (
            <div>
              <Grid className="builder_dropdown" centered>
                    <Grid.Column width="9">
                      <Dropdown onChange={(e,data)=> onTaskChange(id,data.value)}
                      value={name} selection item labeled placeholder='Típus'
                      fluid className='icon' options={dropdown_options}/>
                    </Grid.Column>
                    <Grid.Column centered width="7">
                    <Button.Group>
                        <Button negative disabled={!canDelete} onClick={onTaskDelete}>Törlés</Button>
                        <Button.Or id="or" text='vagy' />
                        <Button positive onClick={() => onTaskAdd(name,params)}>Hozzáadás</Button>
                    </Button.Group>
                    <Button floated="right" disabled={isFetchingType || isFetchingProcess}
                          loading={isFetchingType || isFetchingProcess}
                          onClick={onTaskProcess} primary>Feldolgozás</Button>
                    </Grid.Column>
              </Grid>
              <Divider fluid/>
              { unwrap(
                  <wrap>
                    <Segment>
                      <Dimmer active={isFetchingType} blurring>
                          <Loader active={isFetchingType} inverted content='Típusok betöltése' />
                      </Dimmer>
                      { !isFetchingType && <ParamContainer onParamChange={(params) => onTaskChange(id,null,params)}
                      defaultParams={params} global_params={types[category_key] && types[category_key].params}
                        local_params={type_params}/>}
                      <Image hidden={!isFetchingType} src='images/paragraph.png' />
                      <Divider hidden fitted={!isFetchingType} fluid/>
                      <Image hidden={!isFetchingType} src='images/paragraph.png' />
                    </Segment>
                    <Divider fluid/>
                   <Segment>
                    <Dimmer active={isFetchingType} blurring>
                        <Loader active={isFetchingType} inverted content='Típusok betöltése' />
                    </Dimmer>
                    { !isFetchingType &&
                      <IOComponent local_io={types[category_key] && types[category_key]}
                                 global_io={{input_types,output_type}}/>}
                    <Image hidden={!isFetchingType} src='images/paragraph.png' />
                  </Segment>
                  </wrap>)
              }
            </div>
        )
      }
}
