import { useState, useEffect } from 'react';
import { getMetadata, ref } from 'firebase/storage';
import { storage } from '../firebase/storage';
import { getImages } from '../firebase/firestore';
import useAuth from '../hooks/useAuth';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell
} from "recharts";

const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
//Functional Statistics.
const Statistics = () => {
    const [files, setFiles] = useState([]);
    const [data, setData] = useState([]);
    const maxCant = 50;
    const [pieData, setPieData] = useState([
        {name: "Used", value: 0},
        {name: "Available", value: 100},
    ]);
    const { auth } = useAuth();

    useEffect(() => {
        getImages(auth.user.uid, setFiles);
    }, [auth.user.uid]);

    useEffect(() => {
        if(files.length > 0){
            //const uniqueDatesArr = [...new Set(files.map(item => new Date(item.uploadedAt.toDate()).toDateString()))];
            const dateCount = {}
            for(let f in files){
                const date = new Date(files[f].uploadedAt.toDate()).toLocaleDateString('en-US')
                dateCount[date] = dateCount[date] ? dateCount[date] + 1 : 1;
            }
            const tmpArr = Object.entries(dateCount).map(entry => {
                return {date: [entry[0]],count: entry[1]}
            });
            setData(tmpArr);
            files.forEach(async (file) => {
                try {
                    const storageRef = ref(storage, file.imgURL);
                    const metadata = await getMetadata(storageRef);

                    const mb = parseFloat((metadata.size * 0.000001).toFixed(2));
                    const tmp = pieData;
                    tmp[0].value += mb;
                    console.log(tmp[0].value);
                    tmp[1].value = maxCant - tmp[0].value;

                    setPieData([...tmp]);

                } catch (error) {
                    console.error(error)
                }
            })
        }
        
    }, [files])
    

    return (
        <div className="flex justify-evenly items-center">
            <div className="flex flex-col items-center shadow-md rounded-md">
                <h2 className='text-lg font-bold'>Uploads per date</h2>
                <LineChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </div>
            <div className="flex flex-col items-center shadow-md rounded-md">
                <h2 className='text-lg font-bold'>Used space in MB (Total space {maxCant}MB)</h2>
                <PieChart width={400} height={400}>
                    <Pie
                        data={pieData}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    )
}

export default Statistics;

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
