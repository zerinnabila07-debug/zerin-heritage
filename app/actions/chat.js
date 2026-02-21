'use server';

import fs from 'fs';
import path from 'path';

function loadKnowledgeBase() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'knowledge-base.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

function detectLanguage(message) {
  const bengaliPattern = /[\u0980-\u09FF]/;
  const hasBengali = bengaliPattern.test(message);
  
  if (hasBengali) return 'bengali';
  
  const banglishKeywords = ['koto', 'ache', 'ki', 'kemon', 'price', 'er', 'ta', 'apni', 'amader'];
  const lowerMessage = message.toLowerCase();
  const hasBanglish = banglishKeywords.some(keyword => lowerMessage.includes(keyword));
  
  if (hasBanglish) return 'banglish';
  
  return 'english';
}

function matchKeywords(message, keywords) {
  const lowerMessage = message.toLowerCase();
  return keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()));
}

function generateResponse(message, knowledgeBase) {
  const language = detectLanguage(message);
  const lowerMessage = message.toLowerCase();
  
  // Greeting patterns
  const greetings = ['hello', 'hi', 'hey', 'assalamu alaikum', 'salam', 'namaste', 'hola', 'good morning', 'good afternoon', 'good evening'];
  if (matchKeywords(message, greetings) && lowerMessage.split(' ').length <= 3) {
    if (language === 'bengali') {
      return `স্বাগতম Zerin Heritage-এ! ✨ আমি আপনার ফ্যাশন পরামর্শদাতা। আমি কীভাবে আপনাকে সাহায্য করতে পারি? আমাদের Eid 2026 বা Falgun কালেকশন সম্পর্কে জানতে চান?`;
    } else if (language === 'banglish') {
      return `Welcome to Zerin Heritage! ✨ Ami apnar fashion consultant. Kemon help korte pari? Amader Eid 2026 ba Falgun collection dekhen?`;
    }
    return `Welcome to Zerin Heritage! ✨ I'm your personal fashion consultant. How may I assist you today? Would you like to explore our Eid 2026 or Falgun collections?`;
  }
  
  // Pricing queries
  const pricingKeywords = ['price', 'cost', 'how much', 'koto', 'dam', 'দাম', 'কত', 'টাকা'];
  if (matchKeywords(message, pricingKeywords)) {
    // Saree pricing
    if (matchKeywords(message, ['saree', 'sari', 'sharee', 'শাড়ি'])) {
      if (language === 'bengali') {
        return `আমাদের অসাধারণ শাড়ি ${knowledgeBase.pricing_guide.sarees} থেকে শুরু ✨ ঐতিহ্যবাহী সিল্ক থেকে আধুনিক ডিজাইন পর্যন্ত সুন্দর কালেকশন রয়েছে। আপনি কি আমাদের Eid 2026 কালেকশন দেখতে চান?`;
      } else if (language === 'banglish') {
        return `Amader exquisite sarees ${knowledgeBase.pricing_guide.sarees} theke shuru ✨ Traditional silk theke contemporary design porjonto ache. Apni ki Eid 2026 collection dekhte chan?`;
      }
      return `Our exquisite sarees ${knowledgeBase.pricing_guide.sarees} ✨ We have a beautiful collection ranging from traditional silk to contemporary designs. Would you like to explore our Eid 2026 collection?`;
    }
    
    // Kurti pricing
    if (matchKeywords(message, ['kurti', 'kurta', 'tunic', 'কুর্তি'])) {
      if (language === 'bengali') {
        return `আমাদের সুন্দর Kurtis ও Tunics ${knowledgeBase.pricing_guide.kurtis_tunics} থেকে শুরু 👗 আমাদের Falgun কালেকশনে বসন্তি-হলুদ ফুলের ডিজাইন রয়েছে। আপনি কি নতুন আগমন দেখতে চান?`;
      } else if (language === 'banglish') {
        return `Amader stunning Kurtis aar Tunics ${knowledgeBase.pricing_guide.kurtis_tunics} theke shuru 👗 Falgun collection e Basanti-yellow floral design ache. Latest arrivals dekhben?`;
      }
      return `Our stunning Kurtis and Tunics ${knowledgeBase.pricing_guide.kurtis_tunics} 👗 Our Falgun collection features beautiful Basanti-yellow floral designs. Would you like to explore our latest arrivals?`;
    }
    
    // Salwar Kameez pricing
    if (matchKeywords(message, ['salwar', 'kameez', 'সালোয়ার', 'কামিজ'])) {
      if (language === 'bengali') {
        return `আমাদের Designer Salwar Kameez ${knowledgeBase.pricing_guide.salwar_kameez} থেকে শুরু ✨ Eid 2026 কালেকশনে বিশেষ ডিজাইন রয়েছে। আরও জানতে চান?`;
      } else if (language === 'banglish') {
        return `Amader Designer Salwar Kameez ${knowledgeBase.pricing_guide.salwar_kameez} theke shuru ✨ Eid 2026 collection e exclusive design ache. Aro jante chan?`;
      }
      return `Our Designer Salwar Kameez ${knowledgeBase.pricing_guide.salwar_kameez} ✨ Our Eid 2026 collection features exclusive designs. Would you like to know more?`;
    }
    
    // Accessories pricing
    if (matchKeywords(message, ['accessories', 'jewelry', 'earring', 'necklace', 'bag', 'handbag', 'clutch'])) {
      if (language === 'bengali') {
        return `আমাদের Accessories ${knowledgeBase.pricing_guide.accessories} থেকে শুরু 💎 Earrings, Necklaces, Handbags, Clutches এবং Traditional Footwear রয়েছে। কোনটি দেখতে চান?`;
      } else if (language === 'banglish') {
        return `Amader Accessories ${knowledgeBase.pricing_guide.accessories} theke shuru 💎 Earrings, Necklaces, Handbags, Clutches aar Traditional Footwear ache. Konta dekhben?`;
      }
      return `Our Accessories ${knowledgeBase.pricing_guide.accessories} 💎 We have Earrings, Necklaces, Handbags, Clutches, and Traditional Footwear. What would you like to explore?`;
    }
    
    // General pricing
    if (language === 'bengali') {
      return `আমাদের দাম:\n• Kurtis ও Tunics: ${knowledgeBase.pricing_guide.kurtis_tunics}\n• Sarees: ${knowledgeBase.pricing_guide.sarees}\n• Salwar Kameez: ${knowledgeBase.pricing_guide.salwar_kameez}\n• Accessories: ${knowledgeBase.pricing_guide.accessories}\n\nবিশেষ অফার: ${knowledgeBase.pricing_guide.sale_offers} ✨`;
    } else if (language === 'banglish') {
      return `Amader pricing:\n• Kurtis & Tunics: ${knowledgeBase.pricing_guide.kurtis_tunics}\n• Sarees: ${knowledgeBase.pricing_guide.sarees}\n• Salwar Kameez: ${knowledgeBase.pricing_guide.salwar_kameez}\n• Accessories: ${knowledgeBase.pricing_guide.accessories}\n\nSpecial Offer: ${knowledgeBase.pricing_guide.sale_offers} ✨`;
    }
    return `Our pricing:\n• Kurtis & Tunics: ${knowledgeBase.pricing_guide.kurtis_tunics}\n• Sarees: ${knowledgeBase.pricing_guide.sarees}\n• Salwar Kameez: ${knowledgeBase.pricing_guide.salwar_kameez}\n• Accessories: ${knowledgeBase.pricing_guide.accessories}\n\nSpecial Offer: ${knowledgeBase.pricing_guide.sale_offers} ✨`;
  }
  
  // Fabric care queries
  const fabricCareKeywords = ['wash', 'clean', 'care', 'maintain', 'ধোয়া', 'পরিষ্কার', 'রক্ষণাবেক্ষণ', 'dhoya', 'porishkar'];
  if (matchKeywords(message, fabricCareKeywords)) {
    // Silk care
    if (matchKeywords(message, ['silk', 'সিল্ক', 'রেশম'])) {
      if (language === 'bengali') {
        return `সিল্ক শাড়ির জন্য ${knowledgeBase.fabric_care.silk} ✨ এটি আপনার মূল্যবান শাড়িকে দীর্ঘস্থায়ী রাখবে এবং উজ্জ্বলতা বজায় রাখবে।`;
      } else if (language === 'banglish') {
        return `Silk saree er jonno ${knowledgeBase.fabric_care.silk} ✨ Eta apnar valuable saree ke durable rakhbe aar shine maintain korbe.`;
      }
      return `For silk items: ${knowledgeBase.fabric_care.silk} ✨ This helps maintain the fabric's quality and beautiful sheen for years to come.`;
    }
    
    // Cotton care
    if (matchKeywords(message, ['cotton', 'কটন', 'সুতি'])) {
      if (language === 'bengali') {
        return `Cotton পোশাকের জন্য: ${knowledgeBase.fabric_care.cotton} 👗 এটি কাপড়ের গুণমান এবং রঙের উজ্জ্বলতা বজায় রাখতে সাহায্য করে।`;
      } else if (language === 'banglish') {
        return `Cotton items er jonno: ${knowledgeBase.fabric_care.cotton} 👗 Eta fabric er quality aar color vibrancy maintain korte help kore.`;
      }
      return `For cotton items: ${knowledgeBase.fabric_care.cotton} 👗 This helps maintain the fabric's quality and color vibrancy.`;
    }
    
    // Embroidered care
    if (matchKeywords(message, ['embroidered', 'embroidery', 'সূচিকর্ম', 'কাজ করা'])) {
      if (language === 'bengali') {
        return `সূচিকর্মের পোশাকের জন্য: ${knowledgeBase.fabric_care.embroidered} ✨ এটি আপনার সুন্দর কারুকাজকে সুরক্ষিত রাখবে।`;
      } else if (language === 'banglish') {
        return `Embroidered items er jonno: ${knowledgeBase.fabric_care.embroidered} ✨ Eta apnar beautiful karukormo ke protect korbe.`;
      }
      return `For embroidered items: ${knowledgeBase.fabric_care.embroidered} ✨ This protects your beautiful embroidery work.`;
    }
    
    // General care
    if (language === 'bengali') {
      return `আমাদের ফ্যাব্রিক কেয়ার গাইড:\n• Silk: ${knowledgeBase.fabric_care.silk}\n• Cotton: ${knowledgeBase.fabric_care.cotton}\n• সূচিকর্ম: ${knowledgeBase.fabric_care.embroidered}\n\nকোন নির্দিষ্ট পোশাক সম্পর্কে জানতে চান? 👗`;
    } else if (language === 'banglish') {
      return `Amader fabric care guide:\n• Silk: ${knowledgeBase.fabric_care.silk}\n• Cotton: ${knowledgeBase.fabric_care.cotton}\n• Embroidered: ${knowledgeBase.fabric_care.embroidered}\n\nKono specific item er care jante chan? 👗`;
    }
    return `Our fabric care guide:\n• Silk: ${knowledgeBase.fabric_care.silk}\n• Cotton: ${knowledgeBase.fabric_care.cotton}\n• Embroidered: ${knowledgeBase.fabric_care.embroidered}\n\nDo you have questions about a specific item? 👗`;
  }
  
  // Collection queries
  const collectionKeywords = ['collection', 'কালেকশন', 'সংগ্রহ', 'eid', 'ঈদ', 'falgun', 'ফাল্গুন', 'valentine'];
  if (matchKeywords(message, collectionKeywords)) {
    // Eid collection
    if (matchKeywords(message, ['eid', 'ঈদ'])) {
      if (language === 'bengali') {
        return `আমাদের Eid 2026 কালেকশন: ${knowledgeBase.collections.eid_26} ✨ এই বিশেষ উৎসবের জন্য আমরা অসাধারণ ডিজাইন নিয়ে এসেছি। দাম জানতে চান?`;
      } else if (language === 'banglish') {
        return `Amader Eid 2026 collection: ${knowledgeBase.collections.eid_26} ✨ Ei special utsob er jonno exclusive design enechi. Price jante chan?`;
      }
      return `Our Eid 2026 collection: ${knowledgeBase.collections.eid_26} ✨ We've curated exclusive designs for this special celebration. Would you like to know about pricing?`;
    }
    
    // Falgun/Valentine collection
    if (matchKeywords(message, ['falgun', 'ফাল্গুন', 'valentine', 'ভ্যালেন্টাইন', 'spring', 'বসন্ত'])) {
      if (language === 'bengali') {
        return `আমাদের Falgun ও Valentine কালেকশন: ${knowledgeBase.collections.falgun_valentine} 🌸 বসন্ত এবং ভালোবাসার উৎসবের জন্য পারফেক্ট! আরও জানতে চান?`;
      } else if (language === 'banglish') {
        return `Amader Falgun & Valentine collection: ${knowledgeBase.collections.falgun_valentine} 🌸 Boshonto aar love celebration er jonno perfect! Aro jante chan?`;
      }
      return `Our Falgun & Valentine collection: ${knowledgeBase.collections.falgun_valentine} 🌸 Perfect for spring and love celebrations! Would you like to know more?`;
    }
    
    // General collections
    if (language === 'bengali') {
      return `আমাদের কালেকশন:\n• Eid 2026: ${knowledgeBase.collections.eid_26}\n• Falgun & Valentine: ${knowledgeBase.collections.falgun_valentine}\n• Accessories: ${knowledgeBase.collections.accessories.join(', ')}\n\nকোনটি দেখতে চান? ✨`;
    } else if (language === 'banglish') {
      return `Amader collections:\n• Eid 2026: ${knowledgeBase.collections.eid_26}\n• Falgun & Valentine: ${knowledgeBase.collections.falgun_valentine}\n• Accessories: ${knowledgeBase.collections.accessories.join(', ')}\n\nKonta dekhte chan? ✨`;
    }
    return `Our collections:\n• Eid 2026: ${knowledgeBase.collections.eid_26}\n• Falgun & Valentine: ${knowledgeBase.collections.falgun_valentine}\n• Accessories: ${knowledgeBase.collections.accessories.join(', ')}\n\nWhat would you like to explore? ✨`;
  }
  
  // Delivery queries
  const deliveryKeywords = ['delivery', 'shipping', 'ডেলিভারি', 'পাঠানো', 'পৌঁছানো', 'pathano', 'pounchano'];
  if (matchKeywords(message, deliveryKeywords)) {
    if (language === 'bengali') {
      return `${knowledgeBase.customer_service.delivery} 🚚 আমরা নিশ্চিত করি যে আপনার সুন্দর পোশাক নিরাপদে এবং দ্রুত পৌঁছায়। অর্ডার করতে চান?`;
    } else if (language === 'banglish') {
      return `${knowledgeBase.customer_service.delivery} 🚚 Amra ensure kori je apnar beautiful pieces safely aar promptly pouchay. Order korte chan?`;
    }
    return `${knowledgeBase.customer_service.delivery} 🚚 We ensure your beautiful pieces reach you safely and promptly. Would you like to place an order?`;
  }
  
  // Return policy queries
  const returnKeywords = ['return', 'exchange', 'রিটার্ন', 'ফেরত', 'বদল', 'return policy'];
  if (matchKeywords(message, returnKeywords)) {
    if (language === 'bengali') {
      return `${knowledgeBase.customer_service.return_policy} 💌 আমরা চাই আপনি আপনার কেনাকাটায় সম্পূর্ণ সন্তুষ্ট থাকুন। কোনো প্রশ্ন থাকলে ${knowledgeBase.customer_service.contact.email} এ যোগাযোগ করুন।`;
    } else if (language === 'banglish') {
      return `${knowledgeBase.customer_service.return_policy} 💌 Amra chai apni purchase e completely satisfied thaken. Kono question thakle ${knowledgeBase.customer_service.contact.email} e contact korun.`;
    }
    return `${knowledgeBase.customer_service.return_policy} 💌 We want you to be completely satisfied with your purchase. Contact us at ${knowledgeBase.customer_service.contact.email} for any concerns.`;
  }
  
  // Contact queries
  const contactKeywords = ['contact', 'phone', 'email', 'address', 'যোগাযোগ', 'ফোন', 'ইমেইল', 'ঠিকানা'];
  if (matchKeywords(message, contactKeywords)) {
    if (language === 'bengali') {
      return `আমাদের সাথে যোগাযোগ করুন:\n📞 Phone: ${knowledgeBase.customer_service.contact.phone}\n📧 Email: ${knowledgeBase.customer_service.contact.email}\n📍 Address: ${knowledgeBase.customer_service.contact.address}\n\nআমরা সবসময় আপনাকে সাহায্য করতে প্রস্তুত! 💌`;
    } else if (language === 'banglish') {
      return `Amader sathe jogajog korun:\n📞 Phone: ${knowledgeBase.customer_service.contact.phone}\n📧 Email: ${knowledgeBase.customer_service.contact.email}\n📍 Address: ${knowledgeBase.customer_service.contact.address}\n\nAmra shobshomoy apnake help korte ready! 💌`;
    }
    return `Contact us:\n📞 Phone: ${knowledgeBase.customer_service.contact.phone}\n📧 Email: ${knowledgeBase.customer_service.contact.email}\n📍 Address: ${knowledgeBase.customer_service.contact.address}\n\nWe're always here to help! 💌`;
  }
  
  // Default response
  if (language === 'bengali') {
    return `আমি Zerin Heritage এর ফ্যাশন পরামর্শদাতা ✨ আমি আপনাকে সাহায্য করতে পারি:\n• দাম সম্পর্কে জানতে\n• কালেকশন দেখতে\n• ফ্যাব্রিক কেয়ার টিপস\n• ডেলিভারি ও রিটার্ন পলিসি\n\nআপনি কী জানতে চান?`;
  } else if (language === 'banglish') {
    return `Ami Zerin Heritage er fashion consultant ✨ Ami apnake help korte pari:\n• Pricing jante\n• Collections dekhte\n• Fabric care tips\n• Delivery aar return policy\n\nApni ki jante chan?`;
  }
  return `I'm your Zerin Heritage fashion consultant ✨ I can help you with:\n• Pricing information\n• Collection details\n• Fabric care tips\n• Delivery and return policies\n\nWhat would you like to know?`;
}

export async function sendMessage(message, conversationHistory = []) {
  try {
    const knowledgeBase = loadKnowledgeBase();
    
    // Simulate brief processing delay for natural feel (100-300ms)
    await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100));
    
    const responseText = generateResponse(message, knowledgeBase);
    
    return {
      success: true,
      message: responseText,
      timestamp: new Date().toISOString(),
      model: 'gemini-2.5-flash', // For UI consistency
      source: 'local-knowledge-base'
    };
  } catch (error) {
    console.error('Chat error:', error);
    return {
      success: false,
      message: 'I apologize for the inconvenience. Please contact us at support@zerinheritage.com for assistance 💌',
      error: error.message,
    };
  }
}
