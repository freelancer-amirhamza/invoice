import  { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Product from './Product';
import InitialDetails from './initialDetails';

const Invoice = () => {
    const [openProductDialog, setOpenProductDialog] = useState(false);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [products, setProducts] = useState([]);
    const [details, setDetails] = useState([]);
    const invoiceRef = useRef(null);
    

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }

        const storedDetails = localStorage.getItem('products');
        if (storedDetails) {
            setProducts(JSON.parse(storedDetails));
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('details', JSON.stringify(details));
    }, [products, details]);


    const addProduct = (product) => {
        setProducts([...products, product]);
    };

    const addDetails = (detail) => {
        setDetails([...details, detail]);
    };


    const clearProducts = () => {
        setProducts([]);
        setDetails([])
        localStorage.removeItem('products');
        localStorage.removeItem('details');
    };

    const handleDownloadInvoice = async () => {
        const element = invoiceRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 });
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4',
        });

        const imageProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imageProperties.height * pdfWidth) / imageProperties.width;
        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('invoice.pdf');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                <div ref={invoiceRef} className="p-8 bg-white border border-gray-200">

                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
                            <p className="text-sm text-gray-600">Invoice #INV-2024-001</p>
                        </div>
                        <div className="text-right">
                            <h2 className="font-semibold">Company Name</h2>
                            <p className="text-sm text-gray-600">
                            AR IT FIRM
                                <br />
                                159, Santinagar,
                            </p>
                        </div>
                    </div>
                    {/* Billing Information */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">Bill To:</h3>
                        {details.map((detail, index)=> (
                            <p key={index} className="text-gray-700 capitalize">
                            {detail.companyName}
                            <br />
                            {detail.address}
                            <br />
                            Dhaka-1217
                        </p>
                        ))}
                        
                    </div>

                    <table className="w-full text-black mb-8 border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-left">Customer</th>
                                <th className="border p-2 text-left">Product</th>
                                <th className="border p-2 text-left">Brand</th>
                                <th className="border p-2 text-left">Quantity</th>
                                <th className="border p-2 text-right">Unit Price</th>
                                <th className="border p-2 text-right">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td className="border capitalize p-2">{product.customerName}</td>
                                    <td className="border capitalize p-2">{product.product}</td>
                                    <td className="border capitalize p-2">{product.brandName}</td>
                                    <td className="border capitalize p-2">{product?.quantity}</td>
                                    <td className="border capitalize p-2 text-right">{product.unitPrice}</td>
                                    <td className="border capitalize p-2 text-right">{(product.unitPrice * product.quantity).toFixed(2)}</td> {/* {product} */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    

                    <div className="flex justify-end">
                        <div className="w-64">
                            <div className="flex justify-between mb-2">
                                <span>Subtotal:</span>
                                <span>
                                    {products.reduce((total, product) => total + parseFloat(product.unitPrice * product.quantity), 0).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Tax (10%):</span>
                                <span>
                                    {(
                                        products.reduce((total, product) => total + parseFloat(product.unitPrice * product.quantity), 0) * 0.1
                                    ).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span>
                                    {(
                                        products.reduce((total, product) => total + parseFloat(product.unitPrice * product.quantity), 0) * 1.1
                                    ).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                    <button
                        onClick={handleDownloadInvoice}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Download PDF
                    </button>
                    <button
                        onClick={() => setOpenProductDialog(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                    >
                        Add Product
                    </button>
                    <button
                        onClick={() => setOpenDetailsDialog(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                    >
                    Initial Details
                    </button>
                    <button
                        onClick={clearProducts}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                    >
                        Delete All
                    </button>
                </div>
            </div>

            <Product
                openProductDialog={openProductDialog}
                setOpenProductDialog={setOpenProductDialog}
                addProduct={addProduct}
            />
            <InitialDetails
                openDetailsDialog={openDetailsDialog}
                setOpenDetailsDialog={setOpenDetailsDialog}
                addDetails={addDetails}
            />
        </div>
    );
};

export default Invoice;
