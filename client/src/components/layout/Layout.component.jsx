import { Footer } from "./Footer.component"
import { Header } from "./Header.component"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Layout = ({ children }) => {

    return (
        <>
            <div className="">
                <div className="flex flex-col h-full min-h-screen w-full" >
                    <Header />
                    <ToastContainer />
                    <main className={`flex flex-grow text-center bg-blue-950 min-w-screen z-10 p-10 justify-center items-center'}`}>
                        {children}
                    </main>
                </div >
                <Footer />
            </div>
        </>
    )
}