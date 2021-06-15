import styled from 'styled-components';
import ProductsList from "../../components/ProductsList";
import CategoriesPanel from "../../components/CategoriesPanel";
import SearchBar from "../../components/SearchBar";

const SectionCategories = styled.section`
  padding-top: 30px;
  display: flex;
  justify-content: center;
`;


const Categories = () => {

    const categoriesID = 'Blusa'
    const fatherURL = ''
    return (
        <>
            <SearchBar/>
            <SectionCategories>
                <CategoriesPanel fatherURL={fatherURL} categoriesID={categoriesID}/>
                {fatherURL === 'admin'
                    ? <ProductsList categoriesID={categoriesID} admin/>
                    :
                    <ProductsList categoriesID={categoriesID}/>}

            </SectionCategories>

        </>


    )
}

export default Categories
