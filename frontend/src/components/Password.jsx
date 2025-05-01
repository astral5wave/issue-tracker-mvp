import React, { useState } from 'react'

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
const Password = ({ password, setPassword }) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const handleChangeClick = () => {
        setPasswordVisible(!isPasswordVisible);
    }
    return (
        <>
            <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
            >
                Password:
            </label>
            <div
                tabIndex={0}
                className=' flex items-center justify-between gap-1 w-full pr-2 pl-4 py-2 border border-gray-300/50 bg-indigo-100 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500/50'>
                <input
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    type={isPasswordVisible ? "text" : "password"}
                    className="w-full outline-none text-slate-800"
                />
                {
                    isPasswordVisible ?
                        <button type='button' onClick={handleChangeClick}>
                            <FaRegEye className='text-2xl text-fuchsia-900' />
                        </button>
                        :
                        <button type='button' onClick={handleChangeClick}>
                            <FaRegEyeSlash className='text-2xl text-fuchsia-900' />
                        </button>
                }
            </div>
        </>
    )
}

export default Password