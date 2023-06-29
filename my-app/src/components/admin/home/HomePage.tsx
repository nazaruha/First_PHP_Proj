import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <>
            <h1 className='text-center'>Головна сторінка</h1>
            <Link to="/admin/category">Категорії</Link>
        </>
    )
}

export default HomePage;