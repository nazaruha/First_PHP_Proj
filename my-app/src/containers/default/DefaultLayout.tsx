import { Outlet } from "react-router-dom"

const DefaultLayout = () => {
    return (
        <>
            <div className="container mt-3">
                <Outlet />
            </div>
        </>
    )
}

export default DefaultLayout;