import React from "react";
import {Step,Divider,Container,Grid,Header,Item,Segment
        ,Input,Dropdown,Form,Checkbox} from "semantic-ui-react";
import { StickyContainer, Sticky } from 'react-sticky';

import { unwrap,addKeys } from "common/utils/common"

import NumericInput from 'react-numeric-input';

export default class ParamComponent extends React.Component {
    constructor(props){
      super(props)
    }

    render() {
        var {defaultParam,name,pv,type, ...otherProps} = this.props;

        var Final=null

        if (!defaultParam) {
          switch (type) {
            case "float":case "int":
              defaultParam=0;
              break;
            case "bool":
              defaultParam=false;
              break;
            default:
          }
        }

        switch (type) {
          case "float":
            Final = <NumericInput value={defaultParam} step={0.1} precision={2} value={defaultParam}/>
            break;
          case "int":
            Final = <NumericInput value={defaultParam}/>
            break;
          case "string":
            Final =   <Input
                        label={{ tag: true, content: name }}
                        labelPosition='right'
                        placeholder='Írb be a paramétert'
                        value={defaultParam}
                      />
            break;
          case "bool":
            Final = <Checkbox toggle checked={defaultParam}/>
            break;
          default:
            if (pv)
             Final=<Form>
                    { pv.map && pv.map( value =>
                      <Form.Field>
                        <Checkbox
                          radio
                          label={value}
                          name="name"
                          value={value}
                          checked={defaultParam === value}
                          onChange={() => ({})}
                        />
                      </Form.Field>)
                    }
                  </Form>
        }

        return Final

      }
}
