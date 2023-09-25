import { useState } from "react"
import Header from "../Header/Header";
import RightBar from "../RightBar/RightBar";
import SlideBar from "../Sidebar/SideBar";
import ModalMenu from "../../Components/ModalMenu/ModalMenu";
import Footer from "../Footer/Footer";

interface DefaultLayoutProps {
    children: React.ReactElement
}
const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <div className="bg-background_Color h-screen">
            <Header />
            <div className="md:container md:mx-auto mx-4 sm:mx-8 xl:w-3/4 pt-[78px]">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;