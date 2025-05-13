import { getFooter } from '@/utils/action/siteCustom'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const Footer = async () => {
  const footer = await getFooter();
  return (
    <div className="bg-gray-900 px-5 lg:px-10 text-white mt-10">
      <div className="pt-10 flex flex-col lg:flex-row gap-10 lg:gap-20">
        <div className="flex-[1.5]">
          {
            footer.image_url &&
            <div className="relative w-[200px] h-[60px] mb-3">
              <Image src={footer.image_url} alt="" fill className="" />
            </div>
            }
            <p className="text-sm"> {footer.description} </p>
        </div>
        <div className="flex-[2] flex justify-between gap-4 lg:pr-20">
          <div className="flex flex-col gap-3">
            <h3> দেওয়ানী </h3>
            <div className="flex flex-col text-sm gap-1 lg:px-3">
              <Link href="/category/সিপিসি"> সিপিসি </Link>
              <Link href="/category/স্পেসিফিক-রিলিফ-এক্ট"> স্পেসিফিক রিলিফ এক্ট </Link>
              <Link href="/category/কমপানি-ল"> কন্টাক্ট ল </Link>
              <Link href="/category/ব্যংকিং"> ব্যংকিং </Link>
              <Link href="/category/কন্টাক্ট-ল"> কন্টাক্ট ল </Link>
              <Link href="/category/বিজনেস-ল"> 	বিজনেস ল </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3> ফৌজদারি </h3>
            <div className="flex flex-col text-sm gap-1 lg:px-3">
              <Link href="/category/পিনাল-কোড"> 	পিনাল কোড </Link>
              <Link href="/category/সিআরপিসি"> সিআরপিসি </Link>
              <Link href="/category/এভিডেন্স-এক্ট"> এভিডেন্স এক্ট	 </Link>
              <Link href="/category/সাইবার-ল"> সাইবার ল </Link>
              <Link href="/category/মুসলিম-ল"> 	মুসলিম ল </Link>
              <Link href="/category/জুরিসপ্রুডেন্স"> 	জুরিসপ্রুডেন্স </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3> অন্যান্য </h3>
            <div className="flex flex-col text-sm gap-1 lg:px-3">
              <Link href="/category/ইন্টারন্যাশনাল-ল"> 	ইন্টারন্যাশনাল ল </Link>
              <Link href="/category/এডভোকেসি"> এডভোকেসি </Link>
              <Link href="/category/হিউমান ল"> 	হিউমান ল </Link>
              <Link href="/category/হিন্দু-ল"> হিন্দু ল </Link>
              <Link href="/category/ড্রাফিটিং"> ড্রাফিটিং </Link>
            </div>
          </div>
          
        </div>
      </div>
      <div className="flex items-center justify-between py-3 mt-5">
        <p className="text-[10px] lg:text-sm text-gray-400">আইন অঙ্গনে সমালোচনামূলক প্রথম অনলাইন ল জার্নাল</p>
        <p className='text-[10px] lg:text-sm text-gray-500'>© All rights are reserved</p>
      </div>
    </div>
  )
}

export default Footer
