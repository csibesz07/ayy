import React from "react";
import {Step,Divider,Container,Grid,Dropdown,Header,Item,Segment} from "semantic-ui-react";
import { StickyContainer, Sticky } from 'react-sticky';

import { unwrap,addKeys } from "common/utils/common"

export default class IOComponent extends React.Component {
    constructor(props){
      super(props)
    }

    render() {
        const {global_io,local_io, ...otherProps} = this.props;

        var generate_io = (title,io) =>
            unwrap(<wrap>
                <Grid.Row>
                  <Grid.Column width={6}>
                    { (io.output_type || io.output_type) && <Header content={title+" :"}/>}
                  </Grid.Column>
                  <Grid.Column width={10}>
                      { io.input_types &&
                        unwrap(<wrap>
                                  <Header content="Bemenet :"/>
                                  <p>{JSON.stringify(io.input_types).replaceAll('\"'," ")}</p>
                              </wrap>)
                      }
                   </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                <Grid.Column width={6}>

                </Grid.Column>
                   <Grid.Column width={10}>
                         { io.output_type &&
                           unwrap(<wrap>
                                     <Header content="Kimenet :"/>
                                      <p>{JSON.stringify(io.output_type).replaceAll('\"'," ")}</p>
                                 </wrap>)
                         }
                    </Grid.Column>
                  </Grid.Row>
                </wrap>)

        return (
            <div>
              <Header content="Input/Output típusok: "/>
              <Grid centered>
                { global_io &&
                  generate_io("Globális",global_io)}
                { local_io &&
                  generate_io("Lokális",local_io)}
              </Grid>
            </div>
        )
      }
}
