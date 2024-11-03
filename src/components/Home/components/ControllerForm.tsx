import React from 'react';
import { Controller } from 'react-hook-form';
import Input from '@/components/shared/utils/input';
interface ControllerInputProps {
    name: string;
    control: any;
    placeholder: string;
    title: string;
    type?: string;
    errorMessage?: string;
    additionalProps?: any;
    content?: React.ReactNode;
}

const ControllerInput: React.FC<ControllerInputProps> = ({
    name,
    control,
    placeholder,
    title,
    type,
    errorMessage,
    additionalProps,
    content
}) => {
    return (
        <div className='flex flex-col w-full'>
        <div className='flex gap-2 items-end w-full'>
            <div className='flex-1'>
               <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        type={type}
                        placeholder={placeholder}
                        title={title}
                        underline={false}
                        classNameInput='bg-transparent focus:bg-transparent'
                        {...additionalProps}
                    />
                )}
            />
            </div>
         
            {content && content}
        </div>
             {errorMessage && <p className="text-red-500 text-xs mt-2">{errorMessage}</p>}
        </div>
      
    );
};

export default ControllerInput;