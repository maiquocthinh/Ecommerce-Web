import { useState } from "react"
const Order = () => {
    const [isOrderDetail, setIsOrderDetail] = useState<boolean>(false)
    return (
        <>
            <div className="mx-auto max-w-screen-xl bg-white">
                <h1 className=" mt-10 ml-5 text-2xl font-bold text-gray-900">Order Management</h1>
            </div>
            <div className="w-screen flex bg-gray-50">
                <div className="flex-1 mx-auto max-w-screen-xl px-2 py-10">
                    <div className="mt-4 w-full">
                        <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
                            <form className="relative flex w-full max-w-2xl items-center">
                                <svg className="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="11" cy="11" r="8" className=""></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
                                </svg>
                                <input type="name" name="search" className="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2" placeholder="Search by Order ID, Date, Customer" />
                            </form>

                            <button type="button" className="relative mr-auto inline-flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 focus:shadow sm:mr-0">
                                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                                <svg className="mr-2 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                Filter
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
                        <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                            <thead className="hidden border-b lg:table-header-group">
                                <tr className="">
                                    <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                                        Order Date
                                        <svg xmlns="http://www.w3.org/2000/svg" className="float-right mt-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </td>

                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Order ID</td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Description</td>

                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Customer</td>

                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Weight</td>

                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                                        Price
                                        <svg xmlns="http://www.w3.org/2000/svg" className="float-right mt-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                        </svg>
                                    </td>

                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Status</td>
                                </tr>
                            </thead>

                            <tbody className="bg-white lg:border-gray-300">
                                <tr onClick={() => setIsOrderDetail(!isOrderDetail)} className="hover:bg-slate-100 cursor-pointer">
                                    <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                                        07 February, 2022
                                        <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Jane Doeson
                                            </div>
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                                </svg>
                                                Desktop Computer
                                            </div>
                                            <div className="">24 x 10 x 5 cm</div>
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                                </svg>
                                                1 Kg
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">62345231143</td>
                                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">Desktop Computer</td>
                                    <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">Jane Doeson</td>
                                    <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">1.0 Kg</td>
                                    <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                                        $59.00
                                        <span className="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-center text-xs text-purple-800 lg:hidden">Action Required</span>
                                    </td>
                                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                                        <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-purple-800">Action Required</span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-100 cursor-pointer">
                                    <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                                        07 February, 2022
                                        <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Jane Doeson
                                            </div>
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                                </svg>
                                                Desktop Computer
                                            </div>
                                            <div className="">24 x 10 x 5 cm</div>
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                                </svg>
                                                1 Kg
                                            </div>
                                        </div>
                                    </td>

                                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">62345231143</td>

                                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">Desktop Computer</td>
                                    <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">Jane Doeson</td>

                                    <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">1.0 Kg</td>
                                    <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                                        $59.00
                                        <span className="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-blue-100 px-2 py-0.5 text-center text-xs text-blue-800 lg:hidden">Pending</span>
                                    </td>

                                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                                        <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-blue-100 px-2 py-0.5 text-blue-800">Pending</span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-100 cursor-pointer">
                                    <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                                        07 February, 2022
                                        <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Jane Doeson
                                            </div>
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                                </svg>
                                                Desktop Computer
                                            </div>
                                            <div className="">24 x 10 x 5 cm</div>
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                                </svg>
                                                1 Kg
                                            </div>
                                        </div>
                                    </td>

                                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">62345231143</td>

                                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">Desktop Computer</td>


                                    <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">Jane Doeson</td>

                                    <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">1.0 Kg</td>
                                    <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                                        $59.00
                                        <span className="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-center text-xs text-purple-800 lg:hidden">Action Required</span>
                                    </td>

                                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                                        <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-purple-800">Action Required</span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-100 cursor-pointer">
                                    <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                                        07 February, 2022
                                        <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Jane Doeson
                                            </div>
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                                </svg>
                                                Desktop Computer
                                            </div>
                                            <div className="">24 x 10 x 5 cm</div>
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                                </svg>
                                                1 Kg
                                            </div>
                                        </div>
                                    </td>

                                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">62345231143</td>

                                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">Desktop Computer</td>


                                    <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">Jane Doeson</td>

                                    <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">1.0 Kg</td>
                                    <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                                        $59.00
                                        <span className="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-blue-100 px-2 py-0.5 text-center text-xs text-blue-800 lg:hidden">Pending</span>
                                    </td>

                                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                                        <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-blue-100 px-2 py-0.5 text-blue-800">Pending</span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-100 cursor-pointer">
                                    <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                                        07 February, 2022
                                        <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Jane Doeson
                                            </div>
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                                </svg>
                                                Desktop Computer
                                            </div>
                                            <div className="">24 x 10 x 5 cm</div>
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                                </svg>
                                                1 Kg
                                            </div>
                                        </div>
                                    </td>

                                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">62345231143</td>

                                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">Desktop Computer</td>


                                    <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">Jane Doeson</td>

                                    <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">1.0 Kg</td>
                                    <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                                        $59.00
                                        <span className="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-green-100 px-2 py-0.5 text-center text-xs text-green-800 lg:hidden">Delivered</span>
                                    </td>

                                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                                        <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-green-100 px-2 py-0.5 text-green-800">Delivered</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    isOrderDetail &&
                    <div>
                        <div className="relative my-10 flex h-full flex-col overflow-hidden rounded-2xl bg-white text-gray-600 shadow-lg ring-1 ring-gray-200">
                            <div className="border-b p-6">
                                <h6 className="mb-2 text-base font-semibold">Orders overview</h6>
                                <p className="mb-4 text-sm font-light">
                                    <i className="inline-block font-black not-italic text-green-600" aria-hidden="true"></i>
                                    <span className="font-semibold">24%</span> this month
                                </p>
                            </div>
                            <div className="flex-auto p-6">
                                <div className="relative flex flex-col justify-center">
                                    <div className="absolute left-4 h-full border-r-2"></div>
                                    <div className="relative mb-4">
                                        <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 p-4 text-center text-base font-semibold text-white shadow">A</span>
                                        <div className="ml-12 w-auto pt-1">
                                            <h6 className="text-sm font-semibold text-blue-900">$2400, Design changes</h6>
                                            <p className="mt-1 text-xs text-gray-500">22 DEC 7:20 PM</p>
                                        </div>
                                    </div>
                                    <div className="relative mb-4">
                                        <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 p-4 text-center text-base font-semibold text-white shadow">B</span>
                                        <div className="ml-12 w-auto pt-1">
                                            <h6 className="text-sm font-semibold text-blue-900">New order #1832412</h6>
                                            <p className="mt-1 text-xs text-gray-500">21 DEC 11 PM</p>
                                        </div>
                                    </div>
                                    <div className="relative mb-4">
                                        <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 p-4 text-center text-base font-semibold text-white shadow">C</span>
                                        <div className="ml-12 w-auto pt-1">
                                            <h6 className="text-sm font-semibold text-blue-900">Server payments for April</h6>
                                            <p className="mt-1 text-xs text-gray-500">21 DEC 9:34 PM</p>
                                        </div>
                                    </div>
                                    <div className="relative mb-4">
                                        <span className="absolute inline-flex h-6 w-6 items-center justify-center text-center text-base font-semibold">
                                            <span className="text-xl text-orange-600"></span>
                                        </span>
                                        <div className="ml-12 w-auto pt-1">
                                            <h6 className="text-sm font-semibold text-blue-900">New card added for order #4395133</h6>
                                            <p className="mt-1 text-xs text-gray-500">20 DEC 2:20 AM</p>
                                        </div>
                                    </div>
                                    <div className="relative mb-4">
                                        <span className="absolute inline-flex h-6 w-6 items-center justify-center text-center text-base font-semibold">
                                            <span className="text-xl text-red-600"></span>
                                        </span>
                                        <div className="ml-12 w-auto pt-1">
                                            <h6 className="text-sm font-semibold text-blue-900">Unlock packages for development</h6>
                                            <p className="mt-1 text-xs text-gray-500">18 DEC 4:54 AM</p>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute inline-flex h-6 w-6 items-center justify-center text-center text-base font-semibold">
                                            <span className="text-xl text-blue-900"></span>
                                        </span>
                                        <div className="ml-12 w-auto pt-1">
                                            <h6 className="text-sm font-semibold text-blue-900">New order #9583120</h6>
                                            <p className="mt-1 text-xs text-gray-500">17 DEC</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </div>


        </>
    );
}

export default Order;