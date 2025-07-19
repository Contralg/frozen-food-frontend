import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import '../styles/ChartSalesTrend.css'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, type ChartData, ArcElement, LineController } from 'chart.js'
import { Chart } from 'react-chartjs-2'

interface ChartSalesTrendProps  {
}

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement, LineController
)

const ChartSalesTrend : React.FC<ChartSalesTrendProps> = ({ }) => {

    const { reportData, getReport, getCategory, categoryData, getProductsData, productsData } = useAuth()

    useEffect(() => {
        getCategory()
        getProductsData()
    }, [])

    useEffect(() => {
        getReport(7, categoryData, productsData)
    }, [categoryData, productsData])

    const optionsPenghasilan = {
        responsive: true,
        maintainAspectRatio: false,
        Interaction: {
            mode: 'index' as const,
            intersect: false
        },
        stacked: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Kocak',
            },
        },
        scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                grid: {
                    drawOnChartArea: false,
                }
            }
        }
    };

    //Tren Penghasilan
    const [labels, setLabels] = useState<Array<string>>([])
    const [datasets, setDatasets] = useState<ChartData<"bar" | "line">>({labels: [], datasets: []})
    const [chartSalesTrend, setChartSalesTrend] = useState<React.ReactNode>(<Chart
                                                                                type= 'bar'
                                                                                options={optionsPenghasilan}
                                                                                data={datasets}
                                                                            />)

    

    useEffect(() => {
        if(reportData.hourly_data.length > 0) {
            let newLabels = []
            for( let x in reportData.hourly_data) {
                newLabels.push(reportData.hourly_data[x]['label'])
            }
            setLabels(newLabels)
        }
    }, [reportData])
    useEffect(() => {
        const data2 = {
            labels,
            datasets: [
                {   
                    type: 'line' as const,
                    label: 'Total Penghasilan',
                    data: labels.map((_value, index) =>  reportData.hourly_data[index]['total_sales']),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'y'
                },
                {
                    type: 'bar' as const,
                    label: 'Total Penjualan',
                    data: labels.map((_value, index) =>  reportData.hourly_data[index]['total_transactions']),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'y1'
                }
            ]}
        setDatasets(data2)
    }, [labels])
    useEffect(() => {
        setChartSalesTrend(<Chart 
                                type='line'
                                options={optionsPenghasilan}
                                data={datasets}
                            />)
    }, [datasets])

  return (
    <div className='css-chartsales-001'>
        <div className='css-chartsales-002'>Tren Penghasilan</div>
        <div className='css-chartsales-003'>
            {chartSalesTrend}
        </div>
    </div>
  )
}

export default ChartSalesTrend