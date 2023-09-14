import Header from "../Header/Header";
import RightBar from "../RightBar/RightBar";
import SlideBar from "../Sidebar/SideBar";

interface DefaultLayoutProps {
    children: any
}
const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <div className="bg-background_Color h-screen">
            <Header />
            <div className="md:container md:mx-auto mx-4 sm:mx-8 xl:w-3/4 grid grid-cols-12 grid-rows-1 gap-4 mt-4">
                <div className="col-span-2 hidden md:block">
                    <SlideBar />
                </div>
                <div className="md:col-span-8 col-span-12">
                    {children}
                </div>
                <div className="col-span-2  hidden md:block">
                    <RightBar />
                </div>
            </div>

        </div>
    );
}

export default DefaultLayout;