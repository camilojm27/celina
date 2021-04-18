import styled from 'styled-components';
import ProductsList from "../components/ProductsList";
import CategoriesPanel from "../components/CategoriesPanel";
import {useEffect, useState} from "react";
import Axios from "axios";
import {API} from "../constants/backend";


const SectionCategories = styled.section`
    padding-top: 30px;
    display: flex;
    justify-content: center;
`;



const Categories = (props) => {

    const categoriesID = props.match.params.id

    return(
        <SectionCategories >
            <CategoriesPanel categoriesID={categoriesID}/>
            <ProductsList />
        </SectionCategories>

    )
}

export default Categories