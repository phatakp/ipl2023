export const MatchDetail = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className={`relative mt-16 min-h-screen w-screen bg-cover bg-center bg-no-repeat p-2`}
            style={{
                backgroundImage: `url('${process.env.REACT_APP_IMAGE_URL}/scheduleBg.jpg')`,
            }}
        >
            {children}
        </div>
    );
};
