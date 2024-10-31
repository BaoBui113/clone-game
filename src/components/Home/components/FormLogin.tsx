"use client";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { css } from '@emotion/react'
import Image from 'next/image'
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@/components/shared/utils/input';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';
import { EyeFilledIcon } from './EyeFilledIcon';
import ModalCommon from './CommonModal';
import FormRegister from './FormRegister';
const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});
export type FormLoginType = yup.InferType<typeof schema>;
export default function FormLogin({ onClose }: { onClose: () => void }) {

    const { isOpen: isOpenRegister, onOpen: onOpenRegister, onOpenChange: onOpenChangeRegister, onClose: onCloseRegister } = useDisclosure();
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const handleShowRegister = () => {
        onClose(); // Close the login form
        onOpenChangeRegister();
    }

    const onSubmit = (data: FormLoginType) => {
        console.log("Login Data:", data);
        // Add your login logic here

    };
    return (
        <>
            <div className='bg-black text-white py-[30px] px-5'>
                <ModalHeader className="flex gap-2 flex-col items-center justify-center w-full">
                    <div className='relative w-16 h-12'>
                        <Image src={"/images/logo_top.svg"} alt='logo' fill className='object-contain' />
                    </div>
                    <div className='relative w-[143px] h-4'>
                        <Image src={"/images/text_logo.svg"} alt='logo' fill className='object-contain' />
                    </div>
                </ModalHeader>
                <ModalBody>
                    <form className='mb-6' onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <Input
                                        className='mb-6'
                                        classNameInput='bg-transparent focus:bg-transparent'
                                        {...field}
                                        placeholder="아이디"
                                        title='아이디'
                                        errorMessage={errors.username?.message}
                                    />
                                </>
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    className='mb-12'
                                    classNameInput='bg-transparent focus:bg-transparent'
                                    {...field}
                                    placeholder="비밀번호"
                                    title='비밀번호'
                                    errorMessage={errors.password?.message}
                                    type={isVisible ? "text" : "password"}
                                    endContext={
                                        <>
                                            {!!field.value && (
                                                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                                    {isVisible ? (
                                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    ) : (
                                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    )}
                                                </button>
                                            )}
                                        </>
                                    }
                                />
                            )}
                        />
                        <Button type="submit" className='w-full h-[50px] rounded-md' color="danger">
                            로그인
                        </Button>
                    </form>
                    <div onClick={handleShowRegister} className='flex justify-center gap-2 items-center cursor-pointer'>
                        <span className='text-sm text-[#DDD] font-normal leading-5'>지금 바로 회원가입</span>
                        <div className='relative w-4 h-4'>
                            <Image src={"/images/icon/next.svg"} alt="next" fill />
                        </div>
                    </div>
                </ModalBody>
            </div>
            <ModalCommon isOpen={isOpenRegister} onOpenChange={onOpenRegister}>
                <FormRegister onClose={onCloseRegister} />
            </ModalCommon>

        </>
    )
}
