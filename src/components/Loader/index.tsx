export const Loader = () => {
    return (
        <div className="absolute inset-0 flex h-screen w-screen items-center justify-center bg-white">
            <img
                src={`${process.env.REACT_APP_IMAGE_URL}/loader.gif`}
                className="h-24 w-24"
                alt=""
            />
        </div>
    );
};
