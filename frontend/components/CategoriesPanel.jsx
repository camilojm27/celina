import styled from "styled-components";
import {useEffect, useState} from "react";
import Axios from "axios";
import {API} from "../constants/backend";
import Link from "next/link";

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

const CategoriesPanel = ({categoriesID, fatherURL}) => {
    let [categories, setCategories] = useState([])
    useEffect(() => {
        Axios.get(API + '/products/categories').then((res) => setCategories(res.data))
    }, [])

    return (
        <Panel>
            <ul>
                <Link href={`/${fatherURL}`}>
                    <Li className={categoriesID === '' ? 'steps-active' : ''}>Todas</Li>
                </Link>
                {
                    categories.map((cat) =>
                        <Link href={`/${fatherURL}/${cat}`}>
                            <Li  className={categoriesID === cat ? 'steps-active' : ''}>{cat}</Li>
                        </Link>

                    )
                }
            </ul>
        </Panel>
    )
}
export default CategoriesPanel