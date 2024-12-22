import React from 'react'
import { IoMdCamera } from 'react-icons/io'
import { IoEyeSharp } from 'react-icons/io5'
import { MdDeleteForever, MdDriveFolderUpload } from 'react-icons/md'

const Dropdown = () => {
    return (
        <ul className='absolute bottom-10 right-10 border'>
            <li className="bg-white p-2 flex  items-center gap-2 hover:text-orange-400"><IoEyeSharp style={{ color: 'black', fontSize: '20px' }} /> View Profile</li>
            <li className="bg-white p-2 flex  items-center gap-2 hover:text-orange-400"><IoMdCamera style={{ color: 'black', fontSize: '20px' }} />Take Photo</li>
            <li className="bg-white p-2 flex  items-center gap-2 border-b-[1px] hover:text-orange-400"><MdDriveFolderUpload style={{ color: 'black', fontSize: '20px' }} />Upload Photo</li>
            <li className="bg-white p-2 flex items-center gap-2 hover:text-orange-400"><MdDeleteForever style={{ color: 'black', fontSize: '20px' }} />Remove Photo</li>
        </ul>
    )
}

export default Dropdown