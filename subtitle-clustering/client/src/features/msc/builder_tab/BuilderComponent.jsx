import React from "react";
import {Step,Divider,Container,Grid,Dropdown,Header,Item} from "semantic-ui-react";
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
        const {types, current, ...otherProps} = this.props;
        const { name, params, type} = current;
        const {category_key,input_types,output_type,type_params} = type;

        const dropdown_options=
                [].concat(...Object.keys(types).map((key,idx1) =>
                  [<Dropdown.Header content={key} {...propsByType[key]}/>
                    ,...types[key].types.map( (subtype,idx2) =>
                    ({key:idx1*5000+idx2+1, value:subtype.name, text:subtype.name}))
                  ,{key:idx1*-5000-1,content:<Divider fitted fluid/>}]))

        return (
            <div>
              <Grid className="builder_dropdown" centered>
                <Grid.Column width="9">
                  <Dropdown onChange={this.handleChange}
                  value={current.name} selection item labeled placeholder='Típus'
                  fluid className='icon' options={dropdown_options}/>
                </Grid.Column>
              </Grid>
              <Divider fluid/>
              <ParamContainer defaultParams={params} global_params={types[category_key] && types[category_key].params} local_params={type_params}/>
              <Divider fluid/>
              <IOComponent local_io={types[category_key] && types[category_key]}
                           global_io={{input_types,output_type}}/>
            </div>
        )
      }
}
