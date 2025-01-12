import React, { useState } from 'react';
import CommonForm from './form';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { invoiceFormData } from '@/config';

const initialFormData = {
    customerName: '',
    product: '',
    brandName: '',
    quantity: '',
    totalPrice: '',
};



const Product = ({ openProductDialog, setOpenProductDialog, addProduct }) => {
    const [formData, setFormData] = useState(initialFormData);

    const onSubmit = (event) => {
        event.preventDefault();
        addProduct(formData); 
        setFormData(initialFormData);
        setOpenProductDialog(false);
    };

    return (
        <Sheet
            open={openProductDialog}
            className="duration-500"
            onOpenChange={() => {
                setOpenProductDialog(false);
                setFormData(initialFormData);
            }}
        >
            <SheetContent side="right" className="overflow-auto">
                <SheetHeader>
                    <SheetTitle>Add New Product</SheetTitle>
                </SheetHeader>
                <CommonForm
                    formData={formData}
                    setFormData={setFormData}
                    buttonText="Add"
                    formControls={invoiceFormData}
                    onSubmit={onSubmit}
                />
            </SheetContent>
        </Sheet>
    );
};

export default Product;
