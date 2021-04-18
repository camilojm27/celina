import styled from "styled-components";
import {useEffect, useState} from "react";
import Axios from "axios";
import {API} from "../constants/backend";
import {Link} from "react-router-dom";

const Li = styled.li`
  font-size: 2rem;
  list-style: none;
  padding: 0.25em 0.5em;
  margin: 10px;
  border-radius: 9px;
  
`;

const Panel = styled.aside`
  height: 500px;
  width: 200px;
  overflow: auto;
`;

const CategoriesPanel = (props) => {
    let [categories, setCategories] = useState([])
    console.log(props.categoriesID)
    useEffect(() => {
        Axios.get(API + '/products/categories').then((res) => setCategories(res.data))
    }, [])

    return (
        <Panel>
            <ul>
                {
                    categories.map((cat) =>
                        <Link to={`/categories/${cat}`}>
                            <Li  className={props.categoriesID === cat ? 'active' : ''}>{cat}</Li>
                        </Link>

                    )
                }
            </ul>
        </Panel>
    )
}
export default CategoriesPanel