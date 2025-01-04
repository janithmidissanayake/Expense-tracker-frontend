import  { useState ,useEffect} from 'react';
import { useAuth } from "../context/AuthProvider"
import axios from 'axios'; // Import Axios

import { Card, Col, Row, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, WalletOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth(); // Access the user data from AuthContext
    const userId = user?.id;
    console.log("hhhhhhhh"+userId);
    console.log("hhhhhhhhttttt"+user);
    
  const [summaryData , setSummaryData] = useState({
    totalIncome:0,
    totalExpense:0,
    balance:0
  }

  );
  const [monthlyData, setMonthlyData] = useState([]); // State for graph data
    

    useEffect(() => {
      if (userId) {  // Only fetch data if userId exists
        const fetchSummaryData = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/v1/summary-controller/summary?userId=${userId}`);
            setSummaryData(response.data);
          } catch (error) {
            console.error('Error fetching summary data:', error.response?.data || error.message);
          }
        };
        fetchSummaryData();
      }
    }, [userId]);  // Re-run the effect whenever userId changes
    
    useEffect(() => {
      if (userId) {  // Only fetch data if userId exists
        const fetchMonthlyData = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/v1/summary-controller/monthly-summary?userId=${userId}`);
            setMonthlyData(response.data);
          } catch (error) {
            console.error('Error fetching monthly data:', error);
          }
        };
        fetchMonthlyData();
      }
    }, [userId]);
  
    
    // const data = [
    //     { month: 'Jan', income: 4500, expense: 3200, balance: 1300 },
    //     { month: 'Feb', income: 5200, expense: 3800, balance: 1400 },
    //     { month: 'Mar', income: 4800, expense: 3500, balance: 1300 },
    //     { month: 'Apr', income: 6000, expense: 4200, balance: 1800 },
    //     { month: 'May', income: 5500, expense: 3900, balance: 1600 }
    //   ];
    
    //   const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
    //   const totalExpense = data.reduce((sum, item) => sum + item.expense, 0);
    //   const currentBalance = totalIncome - totalExpense;
  return (
    <div>
        <div>
        <Row gutter={16}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Total Income"
              value={summaryData.totalIncome}
              precision={2}
              prefix={<ArrowUpOutlined className="text-green-500" />}
              suffix="$"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Total Expenses"
              value={summaryData.totalExpense}
              precision={2}
              prefix={<ArrowDownOutlined className="text-red-500" />}
              suffix="$"
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Current Balance"
              value={summaryData.balance}
              precision={2}
              prefix={<WalletOutlined className="text-blue-500" />}
              suffix="$"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

        </div>

        <div className='mt-4'>
        <Card title="Financial Overview">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#3f8600" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="expense" 
                stroke="#cf1322" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#1890ff" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
        </div>
    </div>
  )
}

export default Dashboard