import { useParams } from "react-router-dom"

function Details() {
    let params = useParams();
    return (
        <h1>This is details page with name {params.name}</h1>
    )
}

export default Details