import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../authcontext/AuthContext';
import { IoChatbubblesOutline, IoHomeOutline } from "react-icons/io5";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { MdPersonSearch } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import axios from 'axios';
import { backendUrl } from '../../config';

const Sidebar = () => {
	const { navigate, setToken, checkToken, token } = useContext(AuthContext);
	const [toggle, setToggle] = useState(true);
	const [activeItem, setActiveItem] = useState("Home");

	useEffect(() => {
		checkToken();
		if (!token) {
			navigate('/login');
		}
	}, [checkToken, navigate, token]);

	const handleLogout = async () => {
		try {
			const res = await axios.post(backendUrl + "/api/auth/logout", {}, { withCredentials: true });
			if (res.status === 200) {
				localStorage.removeItem('accessToken');
				setToken(null);
				navigate('/login');
			}
		} catch (error) {
			console.log("error in logout", error);
		}
	};

	return (
		<div className={`flex flex-col h-screen p-1 ${toggle ? "w-60" : "w-16"} bg-[#465775] text-white duration-200`}>
			<div className="space-y-10">
				<div className={`flex items-center ${toggle ? "justify-end pr-2" : "justify-center"}`}>
					<button onClick={() => setToggle(!toggle)} className="mt-4 hover:text-white duration-200">
						{toggle ? <RiMenuFoldLine size={27} /> : <RiMenuUnfoldLine size={27} />}
					</button>
				</div>

				{/* Search Bar */}
				{toggle && (
					<div className="relative">
						<span className="absolute inset-y-0 left-0 flex items-center py-4">
							<MdPersonSearch size={20} className="p-2 text-black" />
						</span>
						<input type="search" placeholder="Search..." className="w-full py-2 pl-10 text-black text-sm rounded-md focus:outline-none" />
					</div>
				)}

				{/* Navigation Buttons */}
				<ul className="pt-2 pb-4 space-y-1 text-sm">
					<li className="rounded-sm">
						<button onClick={() => { navigate("/"); setActiveItem("Home"); }}
							className={`flex items-center p-2 space-x-3 w-full rounded-md ${activeItem === "Home" ? "bg-[#EC4A1C] text-white" : "hover:text-white duration-200"}`}>
							<IoHomeOutline size={20} />
							{toggle && <span>Home</span>}
						</button>
					</li>

					<li className="rounded-sm">
						<button
							onClick={() => {
								navigate("/message");
								setActiveItem("Chat");
							}}
							className={`flex items-center p-2 space-x-3 rounded-md w-full ${activeItem === "Chat" ? "bg-[#EC4A1C] text-white" : "hover:text-white duration-200"
								}`}
						>
							<IoChatbubblesOutline size={20} />
							{toggle && <span>Chat</span>}
						</button>
					</li>

					<li className="rounded-sm">
						<button
							onClick={() => {
								navigate("/wishlist");
								setActiveItem("Wishlist");
							}}
							className={`flex items-center p-2 space-x-3 rounded-md w-full ${activeItem === "Wishlist" ? "bg-[#EC4A1C] text-white" : "hover:text-white duration-200"
								}`}
						>
							<IoHomeOutline size={20} />
							{toggle && <span>Wishlist</span>}
						</button>
					</li>

					<li className="rounded-sm">
						<button
							onClick={() => {
								navigate("/settings");
								setActiveItem("Settings");
							}}
							className={`flex items-center p-2 space-x-3 rounded-md w-full ${activeItem === "Settings" ? "bg-[#EC4A1C] text-white" : "hover:text-white duration-200"
								}`}
						>
							<IoHomeOutline size={20} />
							{toggle && <span>Settings</span>}
						</button>
					</li>

					<li className="rounded-sm">
						<button
							onClick={handleLogout}
							className="flex items-center p-2 space-x-3 rounded-md w-full hover:text-white duration-200"
						>
							<SlLogout size={20} />
							{toggle && <span>Logout</span>}
						</button>
					</li>
				</ul>
			</div>

			{/* Profile Section */}
			<div className="flex gap-2 justify-evenly pb-3 mt-auto cursor-pointer">
				<img src="https://avatar.iran.liara.run/public/38" alt="Profile Pic" className="w-12 h-12 rounded-full border-2 hover:border-[#EC4A1C]" />
				{toggle && (
					<div>
						<h2 className="text-lg font-semibold hover:text-white duration-200">Kaja Moideen</h2>
						<span className="text-xs hover:underline">View profile</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default Sidebar;