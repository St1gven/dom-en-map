import {Card, Stack, Typography} from "@mui/material";
import styled from "@emotion/styled";


export default function StatsPlaceholder() {

    const Bar = styled.div`
  position: relative;
  height: 100px;
  width: 30px;
  border-radius: 3px;
  border: 1px solid #ccc;
  margin: 0.5rem 0.5em;
  text-align: center;
`

    //todo separate class + hiding?
    return <Card className="stats-menu" onClick={event => event.stopPropagation()}>
        <Stack direction="row">
            <Stack>
                <div>
                    <Bar>
                        <div style={{
                            background: "#b11a1a",
                            width: 30,
                            transition: "height 0.2s ease-in",
                            height: "90%",
                            position: "absolute",
                            bottom: 0,
                            zIndex: -1
                        }}/>
                        90
                    </Bar>
                </div>
                <Typography align="center" marginBottom={0.5} >ХП</Typography>
            </Stack>
            <Stack>
                <div>
                    <Bar>
                        <div style={{
                            background: "#166108",
                            width: 30,
                            transition: "height 0.2s ease-in",
                            height: "20%",
                            position: "absolute",
                            bottom: 0,
                            zIndex: -1
                        }}/>
                        10
                    </Bar>
                </div>
                <Typography align="center" marginBottom={0.5} >Еда</Typography>
            </Stack>
        </Stack>
    </Card>
}