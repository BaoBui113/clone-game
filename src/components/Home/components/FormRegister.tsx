import { yupResolver } from '@hookform/resolvers/yup';
import { Button, ModalBody, ModalHeader } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import ControllerInput from './ControllerForm';


export default function FormRegister({ onClose }: { onClose: () => void }) {
    const schema = yup.object().shape({
        username: yup.string().required("Username is required"),
        id: yup.string().required("ID is required"),
        password: yup.string().required("Password is required"),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), undefined], "Passwords must match")
            .required("Confirm Password is required"),
        phone: yup.string().required("Phone is required"),
        verifyNumber: yup.string().required("Verify Number is required"),
        bank: yup.string().required("Bank is required"),
        depositor: yup.string().required("Depositor is required"),
        account: yup.string().required("Account is required"),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {
        console.log("Registration Data:", data);
    };

    return (
        <div className='bg-black text-white py-[30px] px-5 overflow-y-scroll h-[700px]'>
            <ModalHeader className="flex gap-2 flex-col items-center justify-center w-full">
                <Image src="/images/logo_top.svg" alt='logo' width={64} height={48} />
                <Image src="/images/text_logo.svg" alt='logo' width={143} height={16} />
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
                    <ControllerInput
                        name="username"
                        control={control}
                        placeholder="아이디를 입력하세요"
                        title='아이디'
                        errorMessage={errors.username?.message}
                        content={
                                <>
                                 <Button className='px-3 py-2 rounded bg-[#444444] text-white h-[34px]'>중복확인</Button>
                                </>
                        }
                    />
                   
                    
                    <ControllerInput
                        name="password"
                        control={control}
                        placeholder="비밀번호를 입력하세요"
                        title='비밀번호'
                        type='password'
                        errorMessage={errors.password?.message}
                    />
                    <ControllerInput
                        name="confirmPassword"
                        control={control}
                        placeholder="비밀번호 확인"
                        title='비밀번호 확인'
                        type='password'
                        errorMessage={errors.confirmPassword?.message}
                    />
                    <ControllerInput
                        name="phone"
                        control={control}
                        placeholder="‘-’ 없이 숫자만 입력"
                        title='휴대폰번호'
                        errorMessage={errors.phone?.message}
                        content={
                                <>
                                <Button className='px-3 py-2 rounded bg-[#444444] text-white h-[34px]'>인증번호요청</Button>

                                </>
                        }
                    />
                    
                    <ControllerInput
                        name="verifyNumber"
                        control={control}
                        placeholder="코드를 입력하세요"
                        title='인증번호'
                        errorMessage={errors.verifyNumber?.message}
                        content={
                        <>
                               <Button className='px-3 py-2 rounded bg-[#444444] text-white h-[34px]'>인증확인</Button>
                         </>
                        }

                    />
                    

                    <ControllerInput
                        name="bank"
                        control={control}
                        placeholder="은행을 선택하세요"
                        title='은행'
                        errorMessage={errors.bank?.message}
                    />
                    <ControllerInput
                        name="depositor"
                        control={control}
                        placeholder="선택하신 은행사의 예금주명을 입력하세요."
                        title='예금주'
                        errorMessage={errors.depositor?.message}
                    />
                    <ControllerInput
                        name="account"
                        control={control}
                        placeholder="계좌번호를 입력하세요."
                        title='계좌번호'
                        errorMessage={errors.account?.message}
                         content={
                        <>
                                <Button className='px-3 py-2 rounded bg-[#444444] text-white h-[34px]'>중복확인</Button>
                         </>
                        }
                    />
       

                    <ControllerInput
                        name="id"
                        control={control}
                        placeholder="추천인 ID를 입력해 주세요."
                        title='추천인 ID'
                        errorMessage={errors.id?.message}
                        content={
                        <>
                               <Button className='px-3 py-2 rounded bg-[#444444] text-white h-[34px]'>추천인확인</Button>
                         </>
                        }
                    />
        

                    <Button type="submit" className='w-full h-[50px] mt-10 rounded-md' color="danger">
                        가입하기
                    </Button>
                </form>
            </ModalBody>
        </div>
    );
}