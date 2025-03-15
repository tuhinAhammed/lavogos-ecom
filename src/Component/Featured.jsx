import React from 'react'
import Container from '../Layout/Container'
import Flex from '../Layout/Flex'
import feature from '../assets/feature.jpg'
import feature2 from '../assets/feature2.png'
import feature3 from '../assets/feature3.jpg'
import feature4 from '../assets/feature4.png'
import { Link } from 'react-router'

const Featured = () => {
    return (
        <div className=' sm:pb-[140px] p-4'>
            <Container>
                <Flex className={'gap-x-[30px]'}>
                    <div className='w-[570px] relative'>
                        <div>
                            <img src={feature} alt="" />
                        </div>
                        <div className='absolute left-8 bottom-8 text-white'>
                            {/* <h5>PlayStation 5</h5>
                            <p>Black and White version of the PS5 <span> coming out on sale.</span></p> */}
                            {/* <h4>Shop Now</h4> */}
                        </div>
                    </div>
                    <div>
                        <div className='432px relative'>
                            <div>
                                <img src={feature4} alt="" />
                            </div>
                            <div className='absolute left-[6px] bottom-[8px] text-white'>
                                {/* <h5 className='text-[10px]'>PlayStation 5</h5>
                                <p className='text-[12px]'>Black and White version of the PS5 <span> coming out on sale.</span></p> */}
                                <Link to={'category/panjabi'}>
                                    <h4 className="relative inline-flex items-center justify-center px-4 py-2 text-base md:text-lg font-medium mt-[80%] md:mt-[330px] text-black bg-white hover:bg-gray-200 transition-all duration-300">
                                        Shop Now
                                    </h4>
                                </Link>
                            </div>
                        </div>
                        <div className='flex gap-x-[30px] mt-[30px]'>
                            <div className='relative'>
                                <div>
                                    <img src={feature2} alt="" className='w-[270px]' />
                                </div>
                                <div>
                                    <div className='absolute left-8 bottom-8 text-white hidden md:block'>
                                        {/* <h5 className='text-[10px]'>PlayStation 5</h5>
                                        <p className='text-[12px]'>Black and White version of the PS5 <span> coming out on sale.</span></p> */}
                                        {/* <h4 className='text-[14px]'>Shop Now</h4> */}
                                    </div>
                                </div>
                            </div>
                            <div className='relative'>
                                <div>
                                    <img src={feature3} alt="" className='w-[270px]' />
                                </div>
                                <div>
                                    <div className='absolute left-8 bottom-8 text-white hidden md:block'>
                                        {/* <h5 className='text-[10px]'>PlayStation 5</h5>
                                        <p className='text-[12px]'>Black and White version of the PS5 <span> coming out on sale.</span></p> */}
                                        {/* <h4 className='text-[14px]'>Shop Now</h4> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Flex>
            </Container>
        </div>
    )
}

export default Featured;
