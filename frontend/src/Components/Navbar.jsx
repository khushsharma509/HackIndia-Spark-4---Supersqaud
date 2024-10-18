import React from 'react';
import { MdOutlineForest } from 'react-icons/md';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dataActions } from '../store/data-slice';
import metamask from '../assets/metamask.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.data.walletAddress);
  const connectWalletRef = useRef();
  const navigate = useNavigate();

  const connectWallet = async () => {
    console.log('Requesting account...');
    if (window.ethereum) {
      console.log('MetaMask detected');
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        dispatch(dataActions.setWalletAddress(accounts[0]));
      } catch (error) {
        console.log('Error connecting...');
      }
    } else {
      alert('MetaMask not detected');
    }
  };

  return (
    <header className="text-black p-4 bg-[#040B11]">
      <div className="container mx-auto px-10 flex justify-between items-center bg-[#040B11]">
        {/* Logo */}
        <Link to="/" className="flex gap-2 items-center">
          <MdOutlineForest className="text-3xl mt-1 text-[#21e786] transition-all duration-100 hover:text-2xl" />
          <h1 className="font-bold text-3xl text-white transition-all duration-100 hover:text-4xl">GreenCredits</h1>
        </Link>

        {/* Navbar Links */}
        <nav className="hidden md:flex items-center gap-6 font-bold">
          <NavLink
            to="/tokens"
            className={({ isActive }) =>
              `block text-xl text-white ${isActive ? 'text-[#3f4233]' : 'text-black'} hover:text-[#21e786]`
            }
          >
            Marketplace
          </NavLink>
          <NavLink
            to="/calculate"
            className={({ isActive }) =>
              `block text-xl text-white ${isActive ? 'text-[#3f4233]' : 'text-black'} hover:text-[#21e786]`
            }
          >
            Trace Carbon Footprints 👣
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `block text-xl text-white ${isActive ? 'text-[#3f4233]' : 'text-black'} hover:text-[#21e786]`
            }
          >
            List your 🍀 Credits
          </NavLink>
          <NavLink
            to="/learn"
            className={({ isActive }) =>
              `block text-xl text-white ${isActive ? 'text-[#3f4233]' : 'text-black'} hover:text-[#21e786]`
            }
          >
            Learn
          </NavLink>
          {!walletAddress ? (
            <button
              className="text-black py-2 px-4 rounded flex items-center gap-2 bg-[#21e74f] hover:text-xl"
              onClick={connectWallet}
              ref={connectWalletRef}
            >
              Connect Wallet <img src={metamask} alt="MetaMask" className="w-5 h-5" />
            </button>
          ) : (
            <button
              className="text-white text-xs hover:text-[#d5b549] whitespace-nowrap"
              onClick={() => navigate('/myBalance')}
            >
              {walletAddress}
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white text-xl">
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
        <NavLink
          to="/tokens"
          className={({ isActive }) =>
            `block text-xl text-white ${isActive ? 'text-[#3f4233]' : 'text-black'} hover:text-[#21e786]`
          }
        >
          Marketplace
        </NavLink>
        <NavLink
          to="/calculate"
          className={({ isActive }) =>
            `block text-xl text-white ${isActive ? 'text-[#3f4233]' : 'text-black'} hover:text-[#21e786]`
          }
        >
          Trace Carbon Footprints 👣
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            `block text-xl text-white ${isActive ? 'text-[#3f4233]' : 'text-black'} hover:text-[#21e786]`
          }
        >
          List your 🍀 Credits
        </NavLink>
        <NavLink
          to="/learn"
          className={({ isActive }) =>
            `block text-xl text-white ${isActive ? 'text-[#3f4233]' : 'text-black'} hover:text-[#21e786]`
          }
        >
          Learn
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
