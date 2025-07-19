import  { useEffect, useState, type ReactNode } from 'react'
import { createContext, useContext } from 'react'

type AuthContextType = {
    //For PoS Pages
    getProductsData          : () => void;
    productsData             : {product_id: string, product_name: string, product_price: string, product_stock:string, category_id: string, product_icon: string}[]
    filteredProducts         : {product_id: string, product_name: string, product_price: string, product_stock:string, category_id: string, product_icon: string}[]
    sortTerm                 : string
    searchProducts           : (serch: any) => void;
    sortPorducts             : (value: string) => void;
    getCategory              : () => void;
    cartProducts             : {product_id: string | undefined, product_name: string | undefined, product_qty: number, product_price: string | undefined, product_total: number}[];
    buyProducts              : (value: string) => void;
    categoryData             : {category_id: string, category_name: string, category_icon: string}[]
    normalizeId              : (code: string) => void
    newCategoryId            : string
    newProductId             : string
    newTransactionId         : string
    addCategory              : (formData: any) => void
    addProduct               : (formData: any) => void
    chageQty                 : (product_id: string | undefined, newQty: number) => void
    counterItem              : {total_price: number, total_cash?: number | any, total_change?: number | undefined} | undefined
    changeCounter            : (totalCash: number) => void
    isTunai                  : boolean;
    changeIsTunai            : (value: boolean) => void
    addTransaction           : (value: object) => void
    getTransactionId         : () => void,
    clearTransaction         : () => void,
    notificationTransaction  : {transaction_id: any, transaction_price: any, success: any} | undefined
    modalNotification        : boolean
    changeModalNotification  : (value: boolean) => void
    firstRender              : boolean;
    changeFirstRender        : (value: boolean) => void
    dashboardData            : {today_sales: string | number, today_transaction: string | number, curr_monthly_sales: string | number, curr_monthly_transaction: string | number, last_monthly_sales: string | number, last_monthly_transaction: string | number} | undefined
    getDashboard             : () => void
    isEditProduct            : boolean;
    editProductData          : {product_id: string, product_name: string, product_price: string, product_stock:string, category_id: string, product_icon: string}
    changeIsEditProduct      : (value: boolean) => void
    getEditProduct           : (product_id: string) => void
    updateProduct            : (formData: any) => void
    isDeleteProduct          : {product_id: string, product_name: string, product_price: string, product_stock:string, category_id: string, product_icon: string}
    changeIsDeleteProduct    : (value: any) => void
    deleteProduct            : (product_id: string) => void
    isSuccessEdit            : {status: boolean, data: any};
    changeisSuccessEdit      : (value: boolean) => void;
    isSuccessDelete          : {status: boolean, data: any, count: number};
    changeIsSuccessDelete    : (value: boolean, countData: number) => void
    reportData               : {sales_trend: any, sales_category: any, most_buy_product: any, hourly_data: any}
    getReport                : (sortValue: number, category_data: any, product_data: any) => void
    transactionsData         : {transaction_id: string, transaction_product: {product_id: string, product_qty: string | number}[], transaction_price: number, transaction_cash: string | number, transaction_tunai: boolean, transaction_complete: boolean, transaction_date: Date}[]
    getTransactionsData      : () => void;
    useDefaultData           : () => void;
    resetAllData             : () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children } : { children : ReactNode}) => {

    const [productsData, setProductsData] = useState<AuthContextType["productsData"]>([])
    const [filteredProducts, setFilteredProducts] = useState<AuthContextType["filteredProducts"]>([])
    const [newProductId, setProductId] = useState<AuthContextType["newProductId"]>('')
    const getProductsData = async() => {
        try {
            const response  = await fetch('https://portofolio.lakonio.com/backend/portofolio2/api/products', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await response.json()
            if (data) {
                setProductsData(data)
                setFilteredProducts(data)
                const newData = normalizeId(data[data.length-1]['product_id'])
                setProductId(await newData)
            }
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    const [categoryData, setCategoryData] = useState<AuthContextType["categoryData"]>([])
    const [newCategoryId, setNewCategoryId] = useState<AuthContextType["newCategoryId"]>('')
    const getCategory = async() => {
        try {
            const response  = await fetch('https://portofolio.lakonio.com/backend/portofolio2/api/category', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await response.json()
            if (data) {
                setCategoryData(data)
                const newData = normalizeId(data[data.length-1]['category_id'])
                setNewCategoryId(await newData)
                // console.log(newData)
            }
        } catch (error) {
            console.log('Error: ', error)
        }        
    }

    const normalizeId = async (code: string) => {
        const [prefix, numberStr] = code.split('-')
        const number = parseInt(numberStr, 10) + 1;
        const newNumberStr = number.toString()
        return `${prefix}-${newNumberStr}`
    }

    const addCategory = async (formData: any) => {
        try {
            await fetch('https://portofolio.lakonio.com/backend/portofolio2/api/category', {
                method  : 'POST',
                mode    : 'cors',
                credentials: 'include',
                headers : {'Content-Type': 'application/json'},
                body    : JSON.stringify(formData)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const addProduct = async (formData: any) => {
        try {
            await fetch('https://portofolio.lakonio.com/backend/portofolio2/api/products', {
                method  : 'POST',
                mode    : 'cors',
                credentials: 'include',
                headers : {'Content-Type': 'application/json'},
                body    : JSON.stringify(formData)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const [sortTerm, setSortTerm] = useState<AuthContextType['sortTerm']>('')
    const sortPorducts = (value: string) => {
        setSortTerm(value)
    }

    const searchProducts = (search: any) => {
        if(sortTerm !== '') {
            const filterProducts = productsData.filter((product) => product.product_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && product.category_id === sortTerm)
            setFilteredProducts(filterProducts)
        } else {
            const filterProducts = productsData.filter((product) => product.product_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
            setFilteredProducts(filterProducts)            
        }
    }

    useEffect(() => {
        if (sortTerm === '') {
            setFilteredProducts(productsData)
        } else {
            const filterProducts = productsData.filter((product) => product.category_id === sortTerm)
            setFilteredProducts(filterProducts)
        }
    }, [sortTerm])

    const [cartProducts, setCartProducts] = useState<AuthContextType['cartProducts']>([])
    const buyProducts = (value: string) => {
        if(cartProducts.find(product1 => product1.product_id === value)) {
            setCartProducts(cartProducts.map(item => {
                if (item.product_id === value) {
                    return {
                        ...item,
                        product_qty: item.product_qty + 1,
                        product_total: Number(item.product_price)*(item.product_qty + 1)
                    }
                } return item
            }))
        } else {
            let findProduct = productsData.find(product => product.product_id === value)
            let newBuy      = {product_id: findProduct?.product_id, product_name: findProduct?.product_name, product_qty: 1, product_price: findProduct?.product_price, product_total: Number(findProduct?.product_price)*1}
            setCartProducts([...cartProducts, newBuy])
        }
    }

    const chageQty = (product_id: string | undefined, newQty: number) => {
        if(cartProducts.find(product1 => product1.product_id === product_id)) {
            if (newQty > 0) {
                setCartProducts(cartProducts.map(item => {
                    if (item.product_id === product_id) {
                        return {
                            ...item,
                            product_qty: newQty,
                            product_total: Number(item.product_price)*newQty
                        }
                    } return item
                }))
            } else {
                setCartProducts(prev => prev.filter(item => item.product_id !== product_id))
            }
        }
    }

    const [counterItem, setCounterItem] = useState<AuthContextType['counterItem']>()
    const changeCounter = (totalCash: number) => {
        let totalPrice = cartProducts.reduce((sum, item) => sum + item.product_total, 0)
        setCounterItem({total_price: totalPrice, total_cash: totalCash, total_change: totalCash - totalPrice})
    }

    useEffect(() => {
        const totalPrice = cartProducts.reduce((sum, item) => sum + item.product_total, 0);   
        setCounterItem(() => {
          return {
            total_price: totalPrice,
            total_change:  -totalPrice,
          };
        });
    }, [cartProducts])

    const [isTunai, setIsTunai] = useState<AuthContextType['isTunai']>(true)
    const changeIsTunai = (value: boolean) => {
        setIsTunai(value)
    }

    const [newTransactionId, setNewTransactionId] = useState<AuthContextType['newTransactionId']>('TRNS-00001')
    const getTransactionId = async() => {
        try {
            const response = await fetch('https://portofolio.lakonio.com/backend/portofolio2/api/transaction', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if (data) {
                const newId = normalizeId(data[data.length-1]['transaction_id'])
                setNewTransactionId(await newId)
            } else {
                setNewTransactionId('TRNS-1')
            }
        } catch (error) {
                setNewTransactionId('TRNS-1')
        }
    }
    
    
    const addTransaction = async (value: Object) => {
        try {
            const response = await fetch('https://portofolio.lakonio.com/backend/portofolio2/api/transaction', {
                method  : 'POST',
                mode    : 'cors',
                credentials: 'include',
                headers : {'Content-Type': 'application/json'},
                body    : JSON.stringify(value)
            })
            const data = await response.json()
            if (data) {
                clearTransaction()
                setNotificationTransaction({transaction_id: data['transaction_id'], transaction_price: data['transaction_price'], success: data['success']})
            }
        } catch (error) {
            console.log(error)
        }
    }

    const clearTransaction = () => {
        setCartProducts([])
        const totalPrice = cartProducts.reduce((sum, item) => sum + item.product_total, 0);
        setCounterItem( () => {
          return {
            total_price:    totalPrice,
            total_cash: '',
            total_change:  -totalPrice,
          };
        })
    }

    const [notificationTransaction, setNotificationTransaction] = useState<AuthContextType['notificationTransaction']>()

    const [modalNotification, setModalNotification] = useState<AuthContextType['modalNotification']>(false)
    const changeModalNotification = (value: boolean) => {
        setModalNotification(value)
    }

    const [firstRender, setFirstRender] = useState<AuthContextType['firstRender']>(false)
    const [countRender, setCountRender] = useState<any>(0)
    const changeFirstRender = (value: boolean) => {
        let render = countRender + 1
        setCountRender(render)
        if(render > 0){
            setFirstRender(value)
        }
    }

    const [dashboardData, setDashboardData] = useState<AuthContextType['dashboardData']>()
    const getDashboard = async() => {
        try {
            const response = await fetch('https://portofolio.lakonio.com/backend/portofolio2/api/transaction', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if (data) {

                const now = new Date("2025-06-30T11:18:00Z")
                const thisMonth = now.getMonth()

                let newDashboardData = {
                                        today_sales: data.filter((item: { transaction_date: string | number | Date; }) => {
                                            const itemDateStr = new Date(item.transaction_date).toLocaleDateString().split("T")[0];
                                            return itemDateStr === now.toLocaleDateString().split("T")[0]
                                        }).reduce((sum: any, item: { transaction_price: any; }) => sum + item.transaction_price, 0),
                                    
                                        today_transaction: data.filter((item: { transaction_date: string | number | Date; }) => {
                                            const itemDateStr = new Date(item.transaction_date).toLocaleDateString().split("T")[0];
                                            return itemDateStr === now.toLocaleDateString().split("T")[0]
                                        }).length,
                                        
                                        curr_monthly_sales: data.filter((item: { transaction_date: string | number | Date; }) => {
                                            const itemMonthStr = new Date(item.transaction_date).getMonth();
                                            return itemMonthStr === thisMonth
                                        }).reduce((sum: any, item: { transaction_price: any; }) => sum + item.transaction_price, 0),

                                        curr_monthly_transaction: data.filter((item: { transaction_date: string | number | Date; }) => {
                                            const itemMonthStr = new Date(item.transaction_date).getMonth();
                                            return itemMonthStr === thisMonth
                                        }).length,

                                        last_monthly_sales: data.filter((item: { transaction_date: string | number | Date; }) => {
                                            const itemMonthStr = new Date(item.transaction_date).getMonth();
                                            return itemMonthStr === (thisMonth -1)
                                        }).reduce((sum: any, item: { transaction_price: any; }) => sum + item.transaction_price, 0),

                                        last_monthly_transaction: data.filter((item: { transaction_date: string | number | Date; }) => {
                                            const itemMonthStr = new Date(item.transaction_date).getMonth();
                                            return itemMonthStr === (thisMonth -1)
                                        }).length,
                                    }
                setDashboardData(newDashboardData)
                                    
            } else {
                setNewTransactionId('TRNS-1')
            }
        } catch (error) {
                setNewTransactionId('TRNS-1')
        }        
    }

    const [isEditProduct, setIsEditProduct] = useState<AuthContextType['isEditProduct']>(false)
    const changeIsEditProduct = (value: boolean) => {
        setIsEditProduct(value)
    }
    const [editProductData, setEditProductData] = useState<AuthContextType['editProductData']>(
        {product_id: '', product_name: '', product_price: '', product_stock: '', category_id: '', product_icon: ''}
    )
    const getEditProduct = (product_id: string) => {
        const foundProduct = productsData.find(product => product.product_id === product_id);

        const newEditData = foundProduct ?? {
          product_id: '',
          product_name: '',
          product_price: '',
          product_stock: '',
          category_id: '',
          product_icon: ''
        };
    
        setEditProductData(newEditData);
    }
    const updateProduct = async (formData: any) => {
        try {
            const response = await fetch('https://portofolio.lakonio.com/backend/portofolio2/api/products', {
                method  : 'PUT',
                mode    : 'cors',
                credentials: 'include',
                headers : {'Content-Type': 'application/json'},
                body    : JSON.stringify(formData)
            })
            const data = await response.json()
            if (data) {
                const newData = {
                    product_name: data.product_name,
                    product_price: data.product_price,
                    product_stock: data.product_stock,
                    category_id: data.category_id,
                    product_icon: data.product_icon,
                    category_name: categoryData.find(item => item.category_id === data.category_id)?.category_name
                }
                setIsSuccessEdit({status: true, data: newData})
            }
        } catch (error) {
            console.log(error)
        }
    }
    const [isSuccessEdit, setIsSuccessEdit] = useState<AuthContextType['isSuccessEdit']>({status: false, data:{}})
    const changeisSuccessEdit = (value: boolean) => {
        setIsSuccessEdit({...isSuccessEdit, status:value})
    }

    const [isDeleteProduct, setIsDeleteProduct] = useState<AuthContextType['isDeleteProduct']>({product_id: '', product_name: '', product_price: '', product_stock:'', category_id: '', product_icon: ''})
    const changeIsDeleteProduct = (product_id: any) => {
        const foundProduct = productsData.find(product => product.product_id === product_id);

        const newEditData = foundProduct ?? {
          product_id: '',
          product_name: '',
          product_price: '',
          product_stock: '',
          category_id: '',
          product_icon: ''
        };
        setIsDeleteProduct(newEditData)
    }
    const deleteProduct = async (prod_id: string) => {
        const data = {product_id: prod_id}
        try {
            const response = await fetch('https://portofolio.lakonio.com/backend/portofolio2/api/products', {
                method  : 'DELETE',
                mode    : 'cors',
                credentials: 'include',
                headers : {'Content-Type': 'application/json'},
                body    : JSON.stringify(data)
            })
        const data2 = await response.json()
        if(data2){
            const newData = {
                    product_name: data2.product_name,
                    product_price: data2.product_price,
                    product_stock: data2.product_stock,
                    category_id: data2.category_id,
                    product_icon: data2.product_icon,
                    category_name: categoryData.find(item => item.category_id === data2.category_id)?.category_name
                }
           setIsSuccessDelete({status: true, data: newData, count: 1})     
        }
        } catch (error) {
            console.log(error)
        }        
    }
    const [isSuccessDelete, setIsSuccessDelete] = useState<AuthContextType['isSuccessDelete']>({status: false, data: {}, count: 0})
    const changeIsSuccessDelete = (value: boolean, countData: number) => {
        setIsSuccessDelete({...isSuccessDelete, status: value, count: countData})
    }


    const [reportData, setReportData] = useState<AuthContextType['reportData']>({sales_trend: '', sales_category: '', most_buy_product: '', hourly_data: ''})
    const getReport = async(sortValue: number, category_data: any, product_data: any) => {
        try {
            const response = await fetch('https://portofolio.lakonio.com/backend/portofolio2/api/transaction', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if (data) {

                const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
                const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
                const now = new Date("2025-06-30T11:18:00Z")
                // console.log(`${now.toLocaleDateString()}`)

                let groupedData = []
                let newSalesCategory = []
                let hourlyData = []

                for (let x = 0; x < 24; x++){
                    let startTime = '';
                    let forLabel   = '';
                    if(x < 10){
                        startTime = `${now.toLocaleDateString()}-${x}`
                        forLabel = `0${x}:00`
                        // console.log(startTime)
                    } else {
                        startTime = `${now.toLocaleDateString()}-${x}`
                        forLabel = `${x}:00`
                        // console.log(startTime)
                    }

                    let hourlyFilteredData = {
                        label: forLabel,
                        total_sales: data.filter((item: { transaction_date: string | number | Date; }) => {
                            const itemHourStr = `${new Date(item.transaction_date).toLocaleDateString()}-${new Date(item.transaction_date).getHours()}`;
                            return itemHourStr === startTime;
                        }).reduce((sum: any, item: { transaction_price: any; }) => sum + item.transaction_price, 0),
                        total_transactions: data.filter((item: { transaction_date: string | number | Date; }) => {
                            const itemHourStr = `${new Date(item.transaction_date).toLocaleDateString()}-${new Date(item.transaction_date).getHours()}`;
                            return itemHourStr === startTime;
                        }).length
                    } 

                    hourlyData.push(hourlyFilteredData)
                }
                
                for (let x = sortValue; x > 0; x--) {
                    let hari = new Date("2025-06-30T11:18:00Z")
                    hari.setDate(now.getDate() - (x - 1))
                    
                    let days = `${(hari.toLocaleDateString().split("/")[0])}-${(hari.toLocaleDateString().split("/")[1])}`
                    let month = `${(hari.toLocaleDateString().split("/")[1])}-${(hari.toLocaleDateString().split("/")[2])}`
                    let years = (hari.toLocaleDateString().split("/")[2])

                    if(sortValue === 7){
                        let filteredData = {
                                            label: `${dayNames[hari.getDay()]}-${days.split("/")[0]}`,
                                            total_sales: data.filter((item: { transaction_date: string | number | Date; }) => {
                                                    const itemDateStr = `${new Date(item.transaction_date).toLocaleDateString().split("/")[0]}-${new Date(item.transaction_date).toLocaleDateString().split("/")[1]}`;
                                                    return itemDateStr === days
                                                }).reduce((sum: any, item: { transaction_price: any; }) => sum + item.transaction_price, 0),
                                            total_transactions: data.filter((item: { transaction_date: string | number | Date; }) => {
                                                    const itemDateStr = `${new Date(item.transaction_date).toLocaleDateString().split("/")[0]}-${new Date(item.transaction_date).toLocaleDateString().split("/")[1]}`;
                                                    return itemDateStr === days
                                                }).length
    
                        }
                        groupedData.push(filteredData)
                    } else if (sortValue === 30) {
                        let filteredData = {
                                            label: `${days.split("/")[0]}-${monthNames[hari.getMonth()]}`,
                                            total_sales: data.filter((item: { transaction_date: string | number | Date; }) => {
                                                    const itemDateStr = `${new Date(item.transaction_date).toLocaleDateString().split("/")[0]}-${new Date(item.transaction_date).toLocaleDateString().split("/")[1]}`;
                                                    return itemDateStr === days
                                                }).reduce((sum: any, item: { transaction_price: any; }) => sum + item.transaction_price, 0),
                                            total_transactions: data.filter((item: { transaction_date: string | number | Date; }) => {
                                                    const itemDateStr = `${new Date(item.transaction_date).toLocaleDateString().split("/")[0]}-${new Date(item.transaction_date).toLocaleDateString().split("/")[1]}`;
                                                    return itemDateStr === days
                                                }).length
    
                        }
                        groupedData.push(filteredData)                        
                    } else if (sortValue === 90) {
                        let filteredData = {
                                            label: monthNames[hari.getMonth()],
                                            total_sales: data.filter((item: { transaction_date: string | number | Date; }) => {
                                                    const itemMonthStr = `${(new Date(item.transaction_date).toLocaleDateString().split("/")[1])}-${(new Date(item.transaction_date).toLocaleDateString().split("/")[2])}`
                                                    return itemMonthStr === month
                                                }).reduce((sum: any, item: { transaction_price: any; }) => sum + item.transaction_price, 0),
                                            total_transactions: data.filter((item: { transaction_date: string | number | Date; }) => {
                                                    const itemMonthStr = `${(new Date(item.transaction_date).toLocaleDateString().split("/")[1])}-${(new Date(item.transaction_date).toLocaleDateString().split("/")[2])}`
                                                    return itemMonthStr === month
                                                }).length
                        }
                        groupedData.push(filteredData)
                    } else if (sortValue === 360) {
                        let filteredData = {
                                            month: monthNames[hari.getMonth()],
                                            label: `${monthNames[hari.getMonth()]} - ${years}`,
                                            total_sales: data.filter((item: { transaction_date: string | number | Date; }) => {
                                                    const itemMonthStr = `${(new Date(item.transaction_date).toLocaleDateString().split("/")[1])}-${(new Date(item.transaction_date).toLocaleDateString().split("/")[2])}`
                                                    return itemMonthStr === month
                                                }).reduce((sum: any, item: { transaction_price: any; }) => sum + item.transaction_price, 0),
                                            total_transactions: data.filter((item: { transaction_date: string | number | Date; }) => {
                                                    const itemMonthStr = `${(new Date(item.transaction_date).toLocaleDateString().split("/")[1])}-${(new Date(item.transaction_date).toLocaleDateString().split("/")[2])}`
                                                    return itemMonthStr === month
                                                }).length
                        }
                        groupedData.push(filteredData)
                    }
                }

                
                let countedProd = []
                for (let x in product_data) {
                    let countProd = 0
                    let hari = new Date(now)
                    hari.setDate(now.getDate() - (sortValue - 1))
                    let startDays = new Date(hari)

                    let endDays = new Date(now)

                    data.filter((item: { transaction_date: string | number | Date; }) => {
                                                                                                const itemDateStr = new Date(item.transaction_date);
                                                                                                return  itemDateStr >= startDays && itemDateStr <= endDays
                                                                                            }).map((item: { transaction_product: any; }) => item.transaction_product.map((item2: any) => item2.product_id === product_data[x].product_id? countProd = Number(countProd) + Number(item2.product_qty) : 0))

                    const newData = {prod_id: product_data[x].product_id, ctg_id: product_data[x].category_id, count: countProd}

                    countedProd.push(newData)
                    // console.log(sortValue, countedProd)
                }
                for (let x in category_data) {
                    let filteredDataCategory = {
                                                string: category_data[x]['category_name'],
                                                total_sales_ctg: countedProd.find(item => item.ctg_id === category_data[x]['category_id'])?.count
                    }
                    newSalesCategory.push(filteredDataCategory)
                    // console.log(newSalesCategory)
                }   
                
                if (sortValue === 90 || sortValue === 360){
                    groupedData = groupedData.filter((value, index, self) => index === self.findIndex(obj => obj.label === value.label))
                }

                setReportData({sales_trend: groupedData, sales_category: newSalesCategory, most_buy_product: countedProd.sort((a, b) => b.count - a.count), hourly_data: hourlyData})
                                    
            } else {
                setNewTransactionId('TRNS-1')
            }
        } catch (error) {
                console.log(error)
        } 
    }


    const [transactionsData, setTransactionsData] = useState<AuthContextType['transactionsData']>([])
    const getTransactionsData = async() => {
        try {
             const response = await fetch('https://portofolio.lakonio.com/backend/portofolio2/api/transaction', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if (data) {
                let newData = data.sort((a: { transaction_date: string | number | Date; },b: { transaction_date: string | number | Date; }) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime())
                setTransactionsData(newData)
            } else {
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const useDefaultData = async() => {
        try {
             await fetch('https://portofolio.lakonio.com/backend/portofolio2/api/default', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })  
            await window.location.reload()              
        } catch (error) {
            console.log(error)
        }
    }

    const resetAllData = async() => {
        try {
             await fetch('https://portofolio.lakonio.com/backend/portofolio2/api/reset', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }) 
            await window.location.reload()           
        } catch (error) {
            console.log(error)
        }
    }

    return (
      <AuthContext.Provider value={{
            productsData,
            getProductsData,
            categoryData,
            getCategory,
            normalizeId,
            newCategoryId,
            newProductId,
            addCategory,
            addProduct,
            searchProducts,
            filteredProducts,
            sortPorducts,
            sortTerm,
            cartProducts,
            buyProducts,
            chageQty,
            counterItem,
            changeCounter,
            isTunai,
            changeIsTunai,
            newTransactionId,
            getTransactionId,
            addTransaction,
            clearTransaction,
            notificationTransaction,
            modalNotification,
            changeModalNotification,
            firstRender,
            changeFirstRender,
            getDashboard,
            dashboardData,
            isEditProduct,
            changeIsEditProduct,
            getEditProduct,
            editProductData,
            updateProduct,
            isDeleteProduct,
            changeIsDeleteProduct,
            deleteProduct,
            isSuccessEdit,
            changeisSuccessEdit,
            isSuccessDelete,
            changeIsSuccessDelete,
            reportData,
            getReport,
            transactionsData,
            getTransactionsData,
            useDefaultData,
            resetAllData
      }}>
          {children}
      </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export default AuthProvider