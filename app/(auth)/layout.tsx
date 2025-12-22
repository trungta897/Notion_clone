const RootLayout = ({ children }:
    { children: React.ReactNode }) => { 
    return <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="flex flex-col items-center justify-center">
                    {children}
                </div>
            </div>;
};

export default RootLayout;