import Card from "../Card/Card";
import { Link } from "react-router-dom";
import styled from 'styled-components'

const Container = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
gap: 10px;
width: 98%;
margin: 15px;
`


export default function Cards({breeds}) {
    return(
        <Container>
            {breeds.map((breed)=>{
                return <Link to={`/detail?id=${breed.id}`}>
                <Card race={breed.name} 
                img={breed.image?.url} 
                metricWeight={breed.weight.metric}
                imperialWeight={breed.weight.imperial}
                temperaments={breed.temperament}
                />
                </Link>
            })}
        </Container>
    )
}