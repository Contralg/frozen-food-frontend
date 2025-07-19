import { useEffect } from 'react'
import '../styles/Dashboard.css'
import PagesButton from '../components/PagesButton'
import DashboardIcon from '../assets/dashboard.svg'
import PosIcon from '../assets/pos.svg'
import StorageIcon from '../assets/storage.svg'
import ReportIcon from '../assets/report.svg'
import CardText from '../components/CardText'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import ChartSalesTrend from '../components/ChartSalesTrend'
import TableTransactions from '../components/TableTransactions'


const Dashboard = () => {

    const { dashboardData, getDashboard, getReport, categoryData, productsData } = useAuth()

    useEffect(() => {
        getDashboard()
        getReport(7, categoryData, productsData)
    }, [])

  return (
    <>
        <div>
            <Header />
        </div>
        <div className='css-dashboard-006'>
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
        <div className='css-dashboard-007'>
            <div className='css-dashboard-013'>
                <CardText 
                    textTop = {`Rp. ${dashboardData?.today_sales.toLocaleString('id-ID')}`}
                    textBot = {'Penjualan Hari Ini'}
                />
                <CardText 
                    textTop = {dashboardData?.today_transaction.toLocaleString('id-ID')}
                    textBot = {'Transaksi Hari Ini'}
                />
            </div>
            <div className='css-dashboard-011'>
                <div className='css-dashboard-012'>
                    <CardText 
                        textTop = {`Rp. ${(dashboardData?.curr_monthly_sales)?.toLocaleString('id-ID')}`}
                        textBot = {'Penjualan Bulan Ini'}
                    />
                    <CardText 
                        textTop = {dashboardData?.curr_monthly_transaction.toLocaleString('id-ID')}
                        textBot = {'Transaksi Bulan Ini'}
                    />
                </div>
                <div className='css-dashboard-012'>
                    <CardText 
                        textTop = {`Rp. ${dashboardData?.last_monthly_sales.toLocaleString('id-ID')}`}
                        textBot = {'Penjualan Bulan Sebelumnya'}
                    />
                    <CardText 
                        textTop = {dashboardData?.last_monthly_transaction.toLocaleString('id-ID')}
                        textBot = {'Transaksi Bulan Sebelumnya'}
                    />
                </div>
            </div>
        </div>
        <div className='css-dashboard-010'>
            <ChartSalesTrend 
            />
            <div className='css-dashboard-008'>
                <div className='css-dashboard-009'>Transaksi Terbaru</div>
                <TableTransactions 
                    page='dashboard'
                />
            </div>
        </div>
    </>
  )
}

export default Dashboard