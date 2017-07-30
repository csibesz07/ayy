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
        var {onParamChange,current_value,default_value,name,pv,type, ...otherProps} = this.props;

        var Final=null

        if (!current_value && current_value!=0) {
          if (default_value)
            current_value = default_value
          else
            switch (type) {
              case "float":case "int":
                current_value=0;
                break;
              case "bool":
                current_value=false;
                break;
              default:
              current_value="Default";
                break;
          }
          onParamChange(current_value)
          return null
        }

        switch (type) {
          case "float":
            Final = <NumericInput onChange={value=> onParamChange(value)} value={current_value} step={0.1} precision={2} value={current_value}/>
            break;
          case "int":
            Final = <NumericInput onChange={value=> onParamChange(value)} value={current_value}/>
            break;
          case "string":
            Final =   <Input
                        label={{ tag: true, content: name }}
                        labelPosition='right'
                        placeholder='Írb be a paramétert'
                        value={current_value}
                        onChange={(e,data)=> onParamChange(data.value)}
                      />
            break;
          case "bool":
            Final = <Checkbox toggle checked={current_value} onChange={(e,data)=> onParamChange(data.value)}/>
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
                          checked={current_value === value}
                          onChange={(e,data)=> onParamChange(data.value)}
                        />
                      </Form.Field>)
                    }
                  </Form>
        }

        return Final

      }
}
