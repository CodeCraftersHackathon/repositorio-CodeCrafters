import { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaYoutube, FaArrowUp } from "react-icons/fa";


export const Footer = () => {

    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) { // Puedes ajustar la altura para mostrar el botón
            setShowScrollToTop(true);
        } else {
            setShowScrollToTop(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={`bg-blue-900 py-6 space-y-4`}>
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center text-sm text-white pb-8">
                    <p className="mb-2">
                        ¿Quieres saber más sobre nosotros?{" "}
                        <a
                            href="/about"
                            className="text-blue-500 hover:text-blue-300 transition-colors duration-300 hover:underline"
                        >
                            ¡Entra aquí!
                        </a>
                    </p>
                </div>
                <ul className="flex justify-center items-center space-x-6 pb-4">
                    <li className="relative group">
                        <a
                            target='_blank'
                            href="https://linkedin.com"
                            aria-label="LinkedIn"
                            className="relative flex justify-center items-center w-12 h-12 rounded-full text-gray-600 bg-white transition-all duration-300 overflow-hidden group-hover:shadow-lg"
                        >
                            <div className="absolute inset-0 bg-[#0274b3] transform translate-y-full transition-all duration-300 group-hover:translate-y-0"></div>
                            <FaLinkedin className="relative z-10 w-8 h-8 group-hover:text-white" />
                        </a>
                        <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-white text-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-[-40px] bg-opacity-80 bg-[#0274b3]">
                            LinkedIn
                        </div>
                    </li>
                    <li className="relative group">
                        <a
                            href="https://github.com"
                            aria-label="GitHub"
                            target='_blank'
                            className="relative flex justify-center items-center w-12 h-12 rounded-full text-gray-600 bg-white transition-all duration-300 overflow-hidden group-hover:shadow-lg"
                        >
                            <div className="absolute inset-0 bg-[#24262a] transform translate-y-full transition-all duration-300 group-hover:translate-y-0"></div>
                            <FaGithub className="relative z-10 w-8 h-8 group-hover:text-white" />
                        </a>
                        <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-white text-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-[-40px] bg-opacity-80 bg-[#24262a]">
                            GitHub
                        </div>
                    </li>
                    <li className="relative group">
                        <a
                            target='_blank'
                            href="https://instagram.com"
                            aria-label="Instagram"
                            className="relative flex justify-center items-center w-12 h-12 rounded-full text-gray-600 bg-white transition-all duration-300 overflow-hidden group-hover:shadow-lg"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#405de6] via-[#c135b4] to-[#fd1f1f] transform translate-y-full transition-all duration-300 group-hover:translate-y-0"></div>
                            <FaInstagram className="relative z-10 w-8 h-8 group-hover:text-white" />
                        </a>
                        <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-white text-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-[-40px] bg-opacity-80 bg-gradient-to-r from-[#405de6] via-[#c135b4] to-[#fd1f1f]">
                            Instagram
                        </div>
                    </li>
                    <li className="relative group">
                        <a
                            target='_blank'
                            href="https://youtube.com"
                            aria-label="YouTube"
                            className="relative flex justify-center items-center w-12 h-12 rounded-full text-gray-600 bg-white transition-all duration-300 overflow-hidden group-hover:shadow-lg"
                        >
                            <div className="absolute inset-0 bg-[#ff0000] transform translate-y-full transition-all duration-300 group-hover:translate-y-0"></div>
                            <FaYoutube className="relative z-10 w-8 h-8 group-hover:text-white" />
                        </a>
                        <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-white text-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-[-40px] bg-opacity-80 bg-[#ff0000]">
                            YouTube
                        </div>
                    </li>
                </ul>
                <div className="text-center text-sm text-white mb-4">
                    <p>
                        © 2024 StudyMate todos los derechos reservados.
                    </p>
                </div>
                {showScrollToTop && (
                    <button
                        onClick={scrollToTop}
                        className="flex justify-center fixed bottom-6 left-0.5 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
                        aria-label="Scroll to Top"
                    >
                        <FaArrowUp />
                    </button>
                )}
            </div>
        </div>
    );
};
