const Action = () => {
    return (
        <div className="rounded-lg min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
            <div className="p-4">
                <div className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6 xl:flex">
                    <div className="flex-grow-0 sm:flex-grow md:flex-grow lg:flex-grow xl:flex-grow">
                        <div className="lg:flex md:flex flex-grow-0">
                            <div className="flex">
                                <div className="lg:flex-1 md:flex-1 mr-3 sm:flex-none">
                                    <button className="border flex justify-center items-center border-gray-300 hover:border-emerald-400 hover:text-emerald-400 dark:text-gray-300 cursor-pointer h-10 w-20 rounded-md focus:outline-none">
                                        <svg
                                            stroke="currentColor"
                                            fill="none"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="mr-2"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="17 8 12 3 7 8"></polyline>
                                            <line
                                                x1="12"
                                                y1="3"
                                                x2="12"
                                                y2="15"
                                            ></line>
                                        </svg>
                                        <span className="text-xs">Export</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Action;
