import styled from 'styled-components';
import ProductsList from "../components/ProductsList";
import CategoriesPanel from "../components/CategoriesPanel";



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
            <ProductsList categoriesID={categoriesID} />
        </SectionCategories>

    )
}

export default Categories
