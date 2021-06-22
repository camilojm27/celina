import styled from 'styled-components';
import ProductsList from "../../components/ProductsList";
import CategoriesPanel from "../../components/CategoriesPanel";
import SearchBar from "../../components/SearchBar";
import { useRouter } from 'next/router'
import {useEffect} from "react";


const SectionCategories = styled.section`
  padding-top: 30px;
  display: flex;
  justify-content: center;
`;


const Categories = () => {

    const router = useRouter()
    const categoriesID = router.query.id
    //console.log(router.query)

    const fatherURL = router.pathname === '/admin/[id]' ? 'admin' : 'categories'

    useEffect(()=> {
        console.log('query', router.query)
        console.log('pathname', router.pathname)
        console.log('basepath', router.basePath)
    })

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
