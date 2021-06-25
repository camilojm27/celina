import Link from "next/link";


const CategoriesPanel = ({categories, categoriesID, fatherURL}) => {

    return (
        <aside>
            <ul>
                <Link href={`/${fatherURL}/todos`} replace shallow>
                    <a>
                        <li className={categoriesID === '' ? 'steps-active' : ''}>Todas</li>
                    </a>
                </Link>
                {
                    categories.map((cat) =>
                        <Link key={cat} href={`/${fatherURL}/${cat}`} replace shallow>
                            <a><li className={categoriesID === cat ? 'steps-active' : ''}>{cat}</li></a>
                        </Link>
                    )
                }
            </ul>
            <style jsx>{
                `aside {
                  height: 500px;
                  width: 200px;
                  overflow: auto;
                }

                li {
                  font-size: 2rem;
                  list-style: none;
                  padding: 0.25em 0.5em;
                  margin: 10px;
                  border-radius: 9px;
                }
                `
            }</style>
        </aside>
    )
}
export default CategoriesPanel
