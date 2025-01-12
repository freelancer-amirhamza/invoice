import React, { useState } from 'react';
import CommonForm from './form';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { invoiceFormDetailsData } from '@/config';

const initialFormData = {
    companyName: "",
    address: ""
};


const InitialDetails = ({ openDetailsDialog, setOpenDetailsDialog, addDetails }) => {
    const [formData, setFormData] = useState(initialFormData);

    const onSubmit = (event) => {
        event.preventDefault();
        addDetails(formData); 
        setFormData(initialFormData);
        setOpenDetailsDialog(false);
    };

    return (
        <Sheet
            open={openDetailsDialog}
            className="duration-500"
            onOpenChange={() => {
                setOpenDetailsDialog(false);
                setFormData(initialFormData);
            }}
        >
            <SheetContent side="right" className="overflow-auto">
                <SheetHeader>
                    <SheetTitle>Add New Details</SheetTitle>
                </SheetHeader>
                <CommonForm
                    formData={formData}
                    setFormData={setFormData}
                    buttonText="Add"
                    formControls={invoiceFormDetailsData}
                    onSubmit={onSubmit}
                />
            </SheetContent>
        </Sheet>
    );
};

export default InitialDetails;
