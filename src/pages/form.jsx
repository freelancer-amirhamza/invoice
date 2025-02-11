/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectItem } from '@radix-ui/react-select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';



const CommonForm = ({formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled}) => {
    console.log(formData)
    const renderInputsByComponentType = (getControlItem) =>{
        let element = null; 
        const value = formData[getControlItem.name] || "";
        switch (getControlItem.componentType) {
            case "input":
                element = (
                <Input 
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                id={getControlItem.name}
                type={getControlItem.type}
                value={value}
                onChange={event => setFormData(
                    {...formData, 
                    [getControlItem.name]: event.target.value })}
                />)
                break;
                case "select":
                element = (
                    <Select onValueChange={(value)=> setFormData({
                        ...formData,
                        [getControlItem.name] : value
                    })}
                    value={value}>
                        <SelectTrigger >
                            <SelectValue placeholder={getControlItem.label} />
                        </SelectTrigger>
                        <SelectContent>
                            {getControlItem.options &&
                            getControlItem.options.length > 0 ?
                            getControlItem.options.map(optionItem => (
                            <SelectItem key={optionItem.id} value={optionItem.id}>
                                {optionItem.label} </SelectItem>)) : null
                        }
                        </SelectContent>
                    </Select>
                )
                break;

                case "textarea":
                element = (
                <Textarea
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                id={getControlItem.id}
                value={value}
                onChange={event => setFormData(
                    {...formData, 
                    [getControlItem.name]: event.target.value })}
                />)
                
                break;
        
            default:
                element = (<Input 
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                id={getControlItem.name}
                type={getControlItem.type}
                value={value}
                onChange={event => setFormData(
                    {...formData, 
                    [getControlItem.name]: event.target.value })}
                />)
                break;
        }
        return element;
    }
  return (
    <form onSubmit={onSubmit} >
        <div className="flex flex-col  gap-3">
            {formControls.map(controlItem => (
                <div className="grid w-full gap-1.5" key={controlItem.name} >
                <Label className="mb-1 font-bold">{controlItem.label} </Label>
                {
                    renderInputsByComponentType(controlItem)
                }
                </div>
            ))}
        </div>
        <Button disabled={isBtnDisabled} type="submit" className="mt-2 bg-green-700 hover:bg-green-800 w-full" >{buttonText || "Submit"}</Button>
    </form>
  )
}

export default CommonForm