import styled from "styled-components";
import {useEffect, useState} from "react";
import Axios from "axios";
import {API} from "../redux/constants/backend";
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

const CategoriesPanel = ({ categories, categoriesID, fatherURL}) => {

    return (
        <Panel>
            <ul>
                <Link href={`/${fatherURL}/todos`} replace shallow>
                    <a><Li className={categoriesID === '' ? 'steps-active' : ''}>Todas</Li></a>
                </Link>
                {
                    categories.map((cat) =>
                        <Link key={cat} href={`/${fatherURL}/${cat}`} replace shallow>
                            <a><Li  className={categoriesID === cat ? 'steps-active' : ''}>{cat}</Li></a>
                        </Link>
                    )
                }
            </ul>
        </Panel>
    )
}
export default CategoriesPanel
