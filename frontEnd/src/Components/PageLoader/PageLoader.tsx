import React from "react";
import { PulseLoader } from "react-spinners"
interface PageLoaderProps {
    pageLevelLoading: boolean
}
const PageLoader: React.FC<PageLoaderProps> = ({ pageLevelLoading }) => {
    return (
        <div className="w-full min-h-screen flex justify-center items-center z-10">
            <PulseLoader
                color={"red"}
                loading={pageLevelLoading}
                size={30}
                data-testid="loader"
            />
        </div>
    );
}

export default PageLoader;