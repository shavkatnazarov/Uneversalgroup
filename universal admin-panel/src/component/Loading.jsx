export const Loading = () => {
    return (
        <div style={{height:'100vh'}} className={"w-100 d-flex align-items-center justify-content-center"}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}