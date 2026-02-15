'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Heart, ShoppingBag, Menu, ChevronRight, ChevronDown, X } from 'lucide-react';

const menuItems = [
  { 
    name: 'EID/26', 
    href: '/eid-2026',
    megaMenu: {
      columns: [
        {
          title: 'Exclusive Wear',
          items: ['Designer Salwar Kameez', 'Premium Silk Sarees', 'Embroidered Lehenga', 'Festive Kurta Sets', 'Luxury Dupattas', 'Eid Special Gowns']
        },
        {
          title: 'Festive Accessories',
          items: ['Eid Special Jewelry', 'Clutches', 'Traditional Footwear', 'Embellished Bags', 'Statement Earrings', 'Festive Bangles']
        },
        {
          title: 'Pre-order',
          items: ['Early Bird Collection', 'Limited Edition Designs', 'Exclusive Pre-launch', 'VIP Collection', 'Designer Specials']
        }
      ]
    }
  },
  { 
    name: 'Falgun & Valentine', 
    href: '/falgun-valentine',
    megaMenu: {
      columns: [
        {
          title: 'Falgun Specials',
          items: ['Yellow & Orange Kurtis', 'Floral Print Sarees', 'Basanti Tunic', 'Spring Collection', 'Vibrant Lehengas', 'Festival Wear']
        },
        {
          title: 'Valentine Collection',
          items: ['Red & Pink Dresses', 'Date Night Outfits', 'Romantic Sarees', 'Evening Gowns', 'Couple Coordinates', 'Love Edition']
        },
        {
          title: 'Gift Sets',
          items: ['Fragrances', 'Jewelry Boxes', 'Gift Cards', 'Luxury Hampers', 'Personalized Gifts', 'Gift Vouchers']
        }
      ]
    }
  },
  { 
    name: 'Clearance Craze', 
    href: '/clearance',
    megaMenu: {
      columns: [
        {
          title: 'Flash Sale',
          items: ['Flat 60% Off', 'Buy 1 Get 1', 'Daily Deals', 'Hourly Specials', 'Weekend Steals', 'Lightning Offers']
        },
        {
          title: 'Last Chance',
          items: ['Final Sizes', 'Clearance Store', 'Winter Stock Out', 'End of Line', 'Last Pieces', 'Discontinued Items']
        },
        {
          title: 'Price Store',
          items: ['Under 599 BDT', 'Under 999 BDT', 'Under 1499 BDT', 'Under 1999 BDT', 'Budget Finds']
        }
      ]
    }
  },
  { 
    name: 'Women', 
    href: '/women',
    megaMenu: {
      columns: [
        {
          title: 'Tops',
          items: ['Kurti', 'Tunic', 'T-shirt', 'Shirt', 'Jacket', 'Blazer', 'Top', 'Pullover', 'Hoodie', 'Sweater', 'Poncho', 'Two-Piece Set']
        },
        {
          title: 'Bottoms',
          items: ['Denim', 'Leggings', 'Skirt', 'Palazzos', 'Ethnic Bottom', 'Western Bottom', 'Trousers', 'Culottes']
        }
      ]
    }
  },
  { 
    name: 'Accessories', 
    href: '/accessories',
    megaMenu: {
      columns: [
        {
          title: 'Jewelry',
          items: ['Earrings', 'Necklaces', 'Rings', 'Bangles', 'Payel', 'Bracelets', 'Anklets', 'Brooches']
        },
        {
          title: 'Essentials',
          items: ['Handbags', 'Clutches', 'Belts', 'Hair Accessories', 'Scarves', 'Sunglasses', 'Watches']
        },
        {
          title: 'Traditional',
          items: ['Orna/Dupatta', 'Hijab', 'Shawls', 'Stoles', 'Bindis', 'Maang Tikka']
        }
      ]
    }
  },
  { 
    name: 'Sale', 
    href: '/sale',
    megaMenu: {
      columns: [
        {
          title: 'Discounts',
          items: ['Flat 50% Off', 'Season Clearance', 'Flash Sale', 'End of Season', 'Limited Time Offers', 'Mega Sale']
        },
        {
          title: 'Price Point',
          items: ['Under 999 BDT', 'Under 1999 BDT', 'Under 2999 BDT', 'Under 4999 BDT', 'Luxury Deals']
        },
        {
          title: 'Bundles',
          items: ['Buy 1 Get 1', 'Festive Combo', 'Mix & Match', 'Complete the Look', 'Gift Sets']
        }
      ]
    }
  }
];

export default function Navbar() {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      setShowTopBar(scrollPosition < 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 transition-all duration-300">
      <div 
        className={`bg-[#B22222] text-white py-2.5 transition-all duration-300 ${
          showTopBar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-10">
          <div className="flex items-center justify-center">
            <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              EID SPECIAL: UP TO 60% OFF
              <ChevronRight size={12} strokeWidth={2.5} />
            </p>
          </div>
        </div>
      </div>

      <nav 
        className={`relative transition-all duration-300 ${
          isScrolled 
            ? 'bg-white border-b border-gray-200 shadow-md' 
            : 'bg-transparent border-b border-white/10'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-10">
          <div className="flex items-center justify-between h-[110px]">
            <div className="flex-shrink-0 py-4">
              <Link href="/" className="block">
                <Image
                  src="/logo.png"
                  alt="Zerin Heritage"
                  width={250}
                  height={75}
                  className={`h-[75px] w-auto object-contain transition-all duration-300 ${
                    !isScrolled ? 'brightness-0 invert' : ''
                  }`}
                  priority
                />
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.megaMenu && setHoveredMenu(item.name)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <Link
                    href={item.href}
                    className={`text-[15px] font-medium transition-all duration-300 flex items-center gap-1 ${
                      isScrolled 
                        ? 'text-[#2C2C2C] hover:text-[#B22222]' 
                        : 'text-white hover:text-[#FF7F24]'
                    }`}
                  >
                    {item.name}
                    {item.megaMenu && (
                      <ChevronDown 
                        size={14} 
                        strokeWidth={2}
                        className={`transition-transform duration-200 ${hoveredMenu === item.name ? 'rotate-180' : ''}`}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </div>
            
            {hoveredMenu && menuItems.find(item => item.name === hoveredMenu)?.megaMenu && (
              <div 
                className="hidden lg:block absolute left-0 right-0 top-full animate-fadeIn z-50"
                onMouseEnter={() => setHoveredMenu(hoveredMenu)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <div className="w-full bg-white shadow-xl border-t-2 border-[#CD7F32]/30">
                  <div className="max-w-[1440px] mx-auto px-10 py-10">
                    <div className={`grid ${
                      menuItems.find(item => item.name === hoveredMenu)?.megaMenu.columns.length === 3 
                        ? 'grid-cols-3' 
                        : menuItems.find(item => item.name === hoveredMenu)?.megaMenu.columns.length === 4 
                        ? 'grid-cols-4' 
                        : 'grid-cols-2'
                    } gap-16`}>
                      {menuItems.find(item => item.name === hoveredMenu)?.megaMenu.columns.map((column, idx) => (
                        <div key={idx}>
                          <h3 className="text-[15px] font-semibold text-[#2C2C2C] mb-5 pb-2 border-b-2 border-[#CD7F32]/40 tracking-wide uppercase text-sm">
                            {column.title}
                          </h3>
                          <ul className="space-y-3">
                            {column.items.map((subItem) => {
                              const slug = subItem.toLowerCase().replace(/\s+/g, '-').replace(/[&/]/g, '');
                              const parentSlug = menuItems.find(item => item.name === hoveredMenu)?.href.split('/').pop();
                              return (
                                <li key={subItem}>
                                  <Link
                                    href={`/${parentSlug}/${slug}`}
                                    className="text-[14px] text-[#2C2C2C] hover:text-[#B22222] hover:translate-x-1 transition-all duration-200 block font-medium"
                                  >
                                    {subItem}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-6">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className={`hidden md:block hover:scale-110 transition-all duration-300 ${
                  isScrolled 
                    ? 'text-[#4A4A4A] hover:text-[#B22222]' 
                    : 'text-white hover:text-[#FF7F24]'
                }`}
                aria-label="Search"
              >
                <Search size={22} strokeWidth={1.5} />
              </button>
              <Link 
                href="/login"
                className={`hidden md:block hover:scale-110 transition-all duration-300 ${
                  isScrolled 
                    ? 'text-[#4A4A4A] hover:text-[#B22222]' 
                    : 'text-white hover:text-[#FF7F24]'
                }`}
                aria-label="Profile"
              >
                <User size={22} strokeWidth={1.5} />
              </Link>
              <Link 
                href="/wishlist"
                className={`hidden md:block hover:scale-110 transition-all duration-300 ${
                  isScrolled 
                    ? 'text-[#4A4A4A] hover:text-[#B22222]' 
                    : 'text-white hover:text-[#FF7F24]'
                }`}
                aria-label="Wishlist"
              >
                <Heart size={22} strokeWidth={1.5} />
              </Link>
              <Link 
                href="/cart"
                className={`hover:scale-110 transition-all duration-300 relative ${
                  isScrolled 
                    ? 'text-[#4A4A4A] hover:text-[#B22222]' 
                    : 'text-white hover:text-[#FF7F24]'
                }`}
                aria-label="Shopping Bag"
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
                <span className={`absolute -top-1.5 -right-1.5 text-white text-[9px] font-semibold rounded-full w-4 h-4 flex items-center justify-center transition-colors duration-300 ${
                  isScrolled ? 'bg-[#B22222]' : 'bg-[#FF7F24]'
                }`}>
                  0
                </span>
              </Link>
              <button 
                className={`lg:hidden hover:scale-110 transition-all duration-300 ${
                  isScrolled 
                    ? 'text-[#4A4A4A] hover:text-[#B22222]' 
                    : 'text-white hover:text-[#FF7F24]'
                }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {searchOpen && (
        <div className="bg-white border-b border-gray-200 shadow-lg animate-fadeIn">
          <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-6">
            <div className="flex items-center gap-4">
              <Search size={20} className="text-[#4A4A4A]" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search for products, categories..."
                className="flex-1 text-[15px] text-[#2C2C2C] placeholder:text-gray-400 focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-[#4A4A4A] hover:text-[#B22222] transition-colors"
                aria-label="Close search"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200">
          <div className="max-w-[1440px] mx-auto px-4 py-6">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[15px] font-medium text-[#2C2C2C] hover:text-[#B22222] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 flex items-center gap-6">
                <button 
                  onClick={() => {
                    setSearchOpen(!searchOpen);
                    setMobileMenuOpen(false);
                  }}
                  className="text-[#4A4A4A] hover:text-[#B22222] transition-colors" 
                  aria-label="Search"
                >
                  <Search size={20} strokeWidth={1.5} />
                </button>
                <Link 
                  href="/login"
                  className="text-[#4A4A4A] hover:text-[#B22222] transition-colors" 
                  aria-label="Profile"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={20} strokeWidth={1.5} />
                </Link>
                <Link 
                  href="/wishlist"
                  className="text-[#4A4A4A] hover:text-[#B22222] transition-colors" 
                  aria-label="Wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart size={20} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
