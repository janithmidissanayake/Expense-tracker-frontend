import { useState } from 'react';

import { Pencil, Trash2, Save, X } from 'lucide-react';

import PropTypes from 'prop-types';
import { useAuth } from "../context/AuthProvider";
import axios from 'axios';


const ExpenseTable = ({expenseData,onUpdateExpense}) => {
  const [editingId, setEditingId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({});
  const { user } = useAuth();
  const userId = user?.id;

  const handleEditClick = (expense) => {
    setEditingId(expense.id);
    setEditedExpense({ ...expense });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedExpense({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value
    }));
  };
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/expense-controller/update-expense/${editedExpense.id}?userId=${userId}`,
        editedExpense
      );
      
      // Update the list of incomes
      onUpdateExpense(prevExpense => 
        prevExpense.map(expense => 
          expense.id === editedExpense.id ? response.data : expense
        )
      );
      
      // Reset editing state
      setEditingId(null);
      setEditedExpense({});
    } catch (error) {
      console.error("Error updating income:", error.response?.data || error.message);
    }
  };
  console.log(expenseData);
  const handleDelete = async (expenseId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/expense-controller/delete-expense/${expenseId}?userId=${userId}`
      );
      
      // Remove the deleted income from the state
      onUpdateExpense(prevExpense => 
        prevExpense.filter(expense => expense.id !== expenseId)
      );
    } catch (error) {
      console.error("Error deleting expense:", error.response?.data || error.message);
    }
  };
  
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
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
            {expenseData.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">

         {editingId === expense.id ? (
                  <>
                  <td className="px-6 py-4">
                      <input
                        type="text"
                        name="title"
                        value={editedExpense.title}
                        onChange={handleInputChange}
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        name="description"
                        value={editedExpense.description}
                        onChange={handleInputChange}
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        name="amount"
                        value={editedExpense.amount}
                        onChange={handleInputChange}
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="date"
                        name="expenseDate"
                        value={editedExpense.expenseDate}
                        onChange={handleInputChange}
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        name="categoryName"
                        value={editedExpense.categoryName}
                        onChange={handleInputChange}
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">{expense.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{expense.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${expense.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {expense.expenseDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{expense.categoryName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditClick(expense)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(expense.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </>
                )}
                                                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

ExpenseTable.propTypes = {
  expenseData: PropTypes.arrayOf(
    PropTypes.shape({
        title: PropTypes.string.isRequired,
      // id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      incomeDate: PropTypes.string.isRequired,
      categoryName: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUpdateExpense: PropTypes.func.isRequired,
};

export default ExpenseTable