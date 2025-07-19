import React, { useEffect, useState } from 'react'
import '../styles/Report.css'
import Header from '../components/Header'
import PagesButton from '../components/PagesButton'
import DashboardIcon from '../assets/dashboard.svg'
import PosIcon from '../assets/pos.svg'
import StorageIcon from '../assets/storage.svg'
import ReportIcon from '../assets/report.svg'
import CardText from '../components/CardText'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, type ChartData, ArcElement, BarController } from 'chart.js'
import { Chart, Doughnut } from 'react-chartjs-2'
import { useAuth } from '../context/AuthContext'
import 'tailwindcss'

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement, BarController
)

type Props = {}

const Report = (_props: Props) => {

    const { reportData, getReport, getCategory, categoryData, getProductsData, productsData } = useAuth()
    
    useEffect(() => {
        getCategory()
        getProductsData()
    }, [])

    useEffect(() => {
        getReport(7, categoryData, productsData)
    }, [categoryData, productsData])
    

    //Header Data
    const [headerData, setHeaderData] = useState<Object | any>({total_sales: '', total_transactions: '', average_per_transaction: ''})
    useEffect(() => {
        let new_total_sales = 0
        let new_total_transactions = 0
        for(let x in reportData.sales_trend){
            new_total_sales = new_total_sales + (reportData.sales_trend[x]['total_sales'])
            new_total_transactions = new_total_transactions + (reportData.sales_trend[x]['total_transactions'])
        }
        setHeaderData({
            total_sales: new_total_sales,
            total_transactions: new_total_transactions,
            average_per_transaction: (new_total_sales / new_total_transactions).toFixed(2)
        })
    }, [reportData])


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
        if(reportData.sales_trend.length > 0) {
            let newLabels = []
            for( let x in reportData.sales_trend) {
                newLabels.push(reportData.sales_trend[x]['label'])
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
                    data: labels.map((_value, index) =>  reportData.sales_trend[index]['total_sales']),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'y'
                },
                {
                    type: 'bar' as const,
                    label: 'Total Penjulan',
                    data: labels.map((_value, index) =>  reportData.sales_trend[index]['total_transactions']),
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
                                width={900}
                            />)
    }, [datasets])
    

    //Sales by Category Doughnut Chart
    const optionsSalesCtg = {
        responsive: true,
        maintainAspectRation: false,
        Interaction: {
            mode: 'index' as const,
            intersect: false
        },
        stacked: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom' as const,
            },
            title: {
                display: false,
                text: 'Kocak',
            },
        },

    };    
    const [datasetSalesCtg, setDatsetSalesCtg] = useState<ChartData<"doughnut">>({labels: [], datasets: []})
    const [chartSalesCtg, setChartSalesCtg] = useState<React.ReactNode>(<Doughnut
                                                                            options={optionsSalesCtg}
                                                                            data={datasetSalesCtg}
                                                                        />)
    const [labelSalesCtg, setLabelSalesCtg] = useState<Array<String>>([])
    
    useEffect(() => {
        if(reportData.sales_category) {
            let newLabel = []
            for(let x in reportData.sales_category){
                newLabel.push(reportData.sales_category[x]['string'])
            }
            setLabelSalesCtg(newLabel)
        }
        // console.log(reportData.sales_trend)
    }, [reportData])
    useEffect(() => {
        let qtyData = labelSalesCtg.map((value, index) => value === reportData.sales_category[index]['string']? reportData.sales_category[index]['total_sales_ctg'] : 0)
        
        const newData = 
            {
                labels: labelSalesCtg,
                datasets: [
                    {
                        label: 'Jumlah',
                        data: qtyData,
                        backgroundColor: [ 'rgba(255,99,132,0.2)',
                                            'rgba(54,162,235,0.2)',
                                            'rgba(255,206,86,0.2)',
                                            'rgba(75,192,192,0.2)',
                                            'rgba(153,102,255,0.2)',
                                            'rgba(255,159,64,0.2)',],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    }
                ]
            }
        
        setDatsetSalesCtg(newData)
    }, [labelSalesCtg])
    useEffect(() => {
        setChartSalesCtg(<Doughnut options={optionsSalesCtg} data={datasetSalesCtg}/>)
    }, [datasetSalesCtg])


    //Most Buy Products Table
    const [mostBuyProduct, setMostBuyProduct] = useState<Array<Object | any>>([])
    useEffect(() => {
        let newMostBuy = []
        for(let x in reportData.most_buy_product){
            let newData = {
                            products_name: productsData.find(item => item.product_id === reportData.most_buy_product[x]['prod_id'])?.product_name,
                            units_sold: reportData.most_buy_product[x]['count'],
                            revenue: reportData.most_buy_product[x]['count'] * Number(productsData.find(item => item.product_id === reportData.most_buy_product[x]['prod_id'])?.product_price)
                        }
            // setMostBuyProduct(prev => [...prev, newData])
            newMostBuy.push(newData)
        }
        setMostBuyProduct(newMostBuy.slice(0,5))
    }, [reportData])


    //Handle Option Change
    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        getReport(Number(e.target.value), categoryData, productsData)
    }

  return (
    <>
        <div>
            <Header />
        </div>
        <div className='css-report-001'>
            <PagesButton 
                icon    = {DashboardIcon}
                text    = {'Dashboard'}
                onclick = {'dashboard'}
            />
            <PagesButton 
                icon    = {PosIcon}
                text    = {'Jualan'}
                onclick = {'pos'}
            />
            <PagesButton 
                icon    = {StorageIcon}
                text    = {'Penyimpanan'}
                onclick = {'inventory'}
            />
            <PagesButton 
                icon    = {ReportIcon}
                text    = {'Laporan'}
                onclick = {'report'}
            />
        </div>
        <div className='css-report-002'>
            <div className='css-report-005'>Laporan Penjualan</div>
            <div className='css-report-004'>
                <select className='css-report-006' onChange={handleOptionChange}>
                    <option value={7}>7 Hari</option>
                    <option value={30}>30 Hari</option>
                    <option value={90}>90 Hari</option>
                    <option value={360}>Tahun Ini</option>
                </select>
            </div>
        </div>
        <div className='css-report-007'>
            <div className='css-report-003'>
                <CardText 
                    textTop = {`Rp. ${Number(headerData.total_sales).toLocaleString('id-ID')}`}
                    textBot = {'Total Keuntungan'}
                />
                <CardText 
                    textTop = {`${Number(headerData.total_transactions).toLocaleString('id-ID')}`}
                    textBot = {'Total Transaksi'}
                />
                <CardText 
                    textTop = {`Rp. ${Number(headerData.average_per_transaction).toLocaleString('id-ID')}`}
                    textBot = {'Rata-Rata Per Transaksi'}
                />
            </div>
            <div className='css-report-008'>
                <div className='css-report-009'>
                    <div className='css-report-010'>Tren Penghasilan</div>
                    <div className='css-report-011'>
                        {chartSalesTrend}
                    </div>
                </div>
                <div className='css-report-009'>
                    <div className='css-report-010'>Penjualan Perkategori</div>
                    <div className='css-report-016'>
                            {chartSalesCtg}
                    </div>
                </div>
                <div className='css-report-009'>
                    <div className='css-report-010'>Produk Terlaris</div>
                    <div className='css-report-014'>
                        {/* {chartSalesTrend} */}
                        <table className='css-report-020'>
                            <thead>
                                <tr>
                                    <th className='css-report-022'>No</th>
                                    <th className='css-report-022'>Nama Produk</th>
                                    <th className='css-report-022'>Terjual</th>
                                    <th className='css-report-022'>Penghasilan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mostBuyProduct.map((row, index) => (
                                    <tr key={index}>
                                        <td className='css-report-021'>{index + 1}</td>
                                        <td className='css-report-021'>{row.products_name}</td>
                                        <td className='css-report-021'>{row.units_sold.toLocaleString('id-ID')}</td>
                                        <td className='css-report-021'>Rp {row.revenue.toLocaleString('id-ID')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>        
        </div>
    </>
  )
}

export default Report