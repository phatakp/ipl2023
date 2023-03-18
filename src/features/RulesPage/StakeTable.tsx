export const StakeTable = () => {
    return (
        <div className="relative my-4 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 ">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Player
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Team
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Stake
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Result
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="relative border-b bg-white">
                        <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
                        >
                            P1
                            <div className="absolute left-0 top-1/4 -rotate-45 text-xl font-bold text-green-600">
                                D
                            </div>
                        </th>
                        <td className="px-6 py-4">CSK</td>
                        <td className="px-6 py-4">60</td>
                        <td className="px-6 py-4 ">0</td>
                    </tr>

                    <tr className="relative border-b bg-gray-200">
                        <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
                        >
                            P2
                        </th>
                        <td className="px-6 py-4">KKR</td>
                        <td className="px-6 py-4">30</td>
                        <td className="px-6 py-4 ">0</td>
                    </tr>

                    <tr className="relative border-b bg-white">
                        <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
                        >
                            P3
                        </th>
                        <td className="px-6 py-4">KKR</td>
                        <td className="px-6 py-4">40</td>
                        <td className="px-6 py-4 ">0</td>
                    </tr>

                    <tr className="relative border-b bg-white">
                        <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
                        >
                            P4
                        </th>
                        <td className="px-6 py-4">KKR</td>
                        <td className="px-6 py-4">50</td>
                        <td className="px-6 py-4">0</td>
                    </tr>

                    <tr className="relative border-b bg-white">
                        <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
                        >
                            P5
                        </th>
                        <td className="px-6 py-4">CSK</td>
                        <td className="px-6 py-4">30</td>
                        <td className="px-6 py-4">0</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
