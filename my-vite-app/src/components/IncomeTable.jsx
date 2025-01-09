
import {  Pencil, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';


const IncomeTable = ({incomeData }) => {
  console.log(incomeData);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {incomeData.map((income) => (
              <tr key={income.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{income.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${income.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {(income.incomeDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{income.categoryName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                    //   onClick={() => onEdit(income)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                    //   onClick={() => onDelete(income.id)}
                       className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
IncomeTable.propTypes = {
  incomeData: PropTypes.arrayOf(
    PropTypes.shape({
      // id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      incomeDate: PropTypes.string.isRequired,
      categoryName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default IncomeTable
// Compare this snippet from my-vite-app/src/components/IncomeTable.jsx: