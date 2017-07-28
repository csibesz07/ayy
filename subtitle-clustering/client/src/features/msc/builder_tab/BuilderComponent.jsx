import React from "react";
import {Step,Divider,Container,Grid,Dropdown,Header,Item,
        Dimmer,Loader,Segment,Image,Button,Progress} from "semantic-ui-react";
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
        const {
          result,
          isFetchingProcess,canDelete,isFetchingType,
          onTaskChange,onTaskAdd,onTaskDelete,onTaskProcess
          ,types, current, ...otherProps}
        = this.props;
        const { id, name, params, type} = current;
        const {category_key,input_types,output_type,type_params} = type;
        const {operations,results} = types
        var progress,content,error,percent,message,inProgress
        if (result) {
          var {progress,content,error} = result
          if (progress)
            var {percent,message} = progress
            inProgress = !error && progress && percent!=100
        }

        const dropdown_options=(!isFetchingType &&
                [].concat(...Object.keys(operations).map((key,idx1) =>
                  [<Dropdown.Header content={key} {...propsByType[key]}/>
                    ,...operations[key].types.map( (subtype,idx2) =>
                    ({key:idx1*5000+idx2+1, value:subtype.name, text:subtype.name}))
                  ,{key:idx1*-5000-1,content:<Divider fitted fluid/>}]))
                ) || [{text: name, value:name}]

        return (
            <div>
              <Grid className="builder_dropdown" centered>
                  <Grid.Row>
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
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                          <Divider fluid/>
                          {(isFetchingProcess || result) &&
                            <Progress percent={progress && progress.percent}
                              indicating={inProgress}
                              progress={inProgress} precision={0}
                              error={error} success={!error && progress && percent==100}
                              active={inProgress}>
                              {result && error || progress && progress.message}
                            </Progress>}
                      </Grid.Column>
                    </Grid.Row>
              </Grid>
              { (isFetchingProcess || result) && <Divider fluid/>}
              { unwrap(
                  <wrap>
                    <Segment>
                      <Dimmer active={isFetchingType} blurring>
                          <Loader active={isFetchingType} inverted content='Típusok betöltése' />
                      </Dimmer>
                      { !isFetchingType && <ParamContainer onParamChange={(params) => onTaskChange(id,null,params)}
                      defaultParams={params} global_params={operations[category_key] && operations[category_key].params}
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
                      <IOComponent local_io={operations[category_key] && operations[category_key]}
                                 global_io={{input_types,output_type}}/>}
                    <Image hidden={!isFetchingType} src='images/paragraph.png' />
                  </Segment>
                  </wrap>)
              }
            </div>
        )
      }
}
