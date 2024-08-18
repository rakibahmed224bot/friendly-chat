let messageCount = 0; // Message count variable
let botRunning = false; // Variable to check if bot is running

document.getElementById('start-button').addEventListener('click', function() {
    if (!botRunning) {
        botRunning = true;
        document.getElementById('user-input').disabled = false;
        document.getElementById('enter-button').disabled = false;
        this.disabled = true; // Disable start button after clicking
    }
});

document.getElementById('enter-button').addEventListener('click', function() {
    if (!botRunning) return; // Do nothing if bot is not running

    const userInput = document.getElementById('user-input').value.trim();
    const chatBox = document.getElementById('chat-box');

    if (userInput === "") return; // Input is empty

    // Check if the input is in Bengali
    const isBangla = /[\u0980-\u09FF]/.test(userInput);

    // Show alert for English input
    if (!isBangla) {
        alert("ওরে সালা বাংলা লেখ");
        return; // If input is in English, end the function here
    }

    // Check for music or YouTube related keywords
    const isMusicRelated = /গান|ইউটিউব|ডিজে|জোক্স|মজার জোক্স|ভালো বাসা|তুমি কী প্রেম করবা|একবার ভালো বাসি বলো|ভালোবাসি তোমায়|তোর নানিরে |তোর নানিরে চুদি|মাদারবোর্ড |মাদারচোদ|খানকি|লোটি|লটি|ডিজে গান/i.test(userInput);

    if (isMusicRelated) {
        // Show popup
        const userConfirmation = confirm("একবার ওকে দিয়ে দেখো জান 🥰😘");

        if (userConfirmation) {
            // Open a YouTube video
            const songUrl = 'https://youtu.be/pWrUrjPm0Zc?si=yD8RjvuWeVfLj-AN'; // Replace with your own YouTube link
            window.open(songUrl, '_blank');
        }

        return; // End function if input is music-related
    }

    // Add user message to chat box
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message'); // Add CSS class
    userMessage.textContent = `আমি:- ${userInput}`;
    chatBox.appendChild(userMessage);

    // Clear input field
    document.getElementById('user-input').value = '';

    // Scroll chat box
    chatBox.scrollTop = chatBox.scrollHeight;

    // Create bot response
    const botResponse = document.createElement('div');
    botResponse.classList.add('bot-response');
    chatBox.appendChild(botResponse);

    // Prepare typing sound
    const typingSound = document.getElementById('typing-sound');

    // Start typing sound after 2 seconds
    setTimeout(function() {
        typingSound.currentTime = 2; // Start sound from 2 seconds
        typingSound.loop = true;
        typingSound.play();

        // Start typing animation
        typeMessage(getBotResponse(userInput), botResponse, typingSound);
    }, 2000); // 2 seconds delay

    // Update message counter
    messageCount++;
    document.getElementById('count').textContent = messageCount;

    // Show popup for every 5 messages after 20
    if (messageCount % 5 === 0 && messageCount > 20) {
        alert(`তুই ${messageCount} বার্তা পাঠাইছোস এখন একটু রেস্ট নে`);
    }
});

function getBotResponse(userInput) {
    // Define custom questions and answers
    const responses = {
        'হ্যালো': 'হ্যালো! কিভাবে সাহায্য করতে পারি?',
        'তুই কে': 'আমি Ai আর তুমি মানুষ',
        'আমার নাম কী': 'আপনার নাম আমাকে জানানো হয়নি।',
        'তুমি কেমন আছো': 'আমি ভালো আছি, ধন্যবাদ!',
        'তোমার নাম কি': 'আমি একটি চ্যাটবট। আমার নাম নেই',
   'কী করো': 'আমি আপনার প্রশ্নের উত্তর দেওয়ার চেষ্টা করি।',
   'ধন্যবাদ': 'আপনাকে ধন্যবাদ! আরও কিছু দরকার?', 
   'বাই': 'বিদায়! আবার কথা হবে।',
   'আজকের আবহাওয়া কেমন': 'দুঃখিত! আমি লাইভ আবহাওয়ার তথ্য অ্যাক্সেস করতে পারি না।',
   'একটা রসিকতা বলো': 'কেন বিজ্ঞানীরা পরমাণুগুলির উপর বিশ্বাস রাখেন না? কারণ তারা সবকিছু তৈরি করে!',
   'বাংলাদেশের রাজধানী কী?': 'বাংলাদেশের রাজধানী ঢাকা।',
   '২ + ২ কত?': '২ + ২ হল ৪।', 
   'মার্কিন প্রেসিডেন্ট কে?': 'বর্তমান মার্কিন প্রেসিডেন্ট জো বাইডেন।',
   'পৃথিবী এবং চাঁদের মধ্যে দূরত্ব কত?': 'প্রায় ৩৮৪,৪০০ কিলোমিটার।',
   'আমাদের সৌরজগতের সবচেয়ে বড় গ্রহ কোনটি?': 'জুপিটার আমাদের সৌরজগতের সবচেয়ে বড় গ্রহ।',
   'মহাদেশ কয়টি?': 'পৃথিবীতে মোট সাতটি মহাদেশ আছে।',
   'পানির ফুটন্ত পয়েন্ট কত?': 'পানি ১০০ ডিগ্রি সেলসিয়াসে ফুটে।',
   'To Kill a Mockingbird কে লিখেছেন?': 'হারপার লি To Kill a Mockingbird বইটি লিখেছেন।',
   'জাপানের মুদ্রা কী?': 'জাপানের মুদ্রা হল ইয়েন।',
   'স্বাধীনতার ঘোষণাপত্র কবে স্বাক্ষরিত হয়েছিল?': '১৭৭৬ সালের ৪ঠা জুলাই।',
   'রাতের খাবারে আমি কি খাব?': 'আমি জানি না, তবে আপনি আপনার পছন্দ অনুযায়ী খাবার নির্বাচন করতে পারেন।', 
   'গুগলের প্রতিষ্ঠাতা কে?': 'ল্যারি পেজ এবং সের্গেই ব্রিন গুগলের প্রতিষ্ঠাতা।',
   'একটি দারুণ চলচ্চিত্র বলো': 'প্রত্যেকের পছন্দের চলচ্চিত্র আলাদা, তবে The Shawshank Redemption একটি জনপ্রিয় চলচ্চিত্র।', 'একটা ভালো বই সুপারিশ করো': '‘1984’ বইটি একটি জনপ্রিয় এবং চিন্তার উদ্রেককারী বই।', 'বিজ্ঞান কী?': 'বিজ্ঞান হল প্রাকৃতিক বিশ্বের নিয়ম এবং নীতি গুলি অধ্যয়ন করার প্রক্রিয়া।', 'বাংলা ভাষার সঠিক বানান কী?': 'বাংলা ভাষার সঠিক বানান বাংলা।', 'তোমার প্রোগ্রামিং ভাষা কী?': 'আমি JavaScript দিয়ে তৈরি।', 'তুমি কি স্বপ্ন দেখো?': 'আমি স্বপ্ন দেখার ক্ষমতা নেই, কারণ আমি একটি প্রোগ্রাম।', 'তুমি কি হেসো?': 'আমি হাসতে পারি না, কিন্তু আমি আপনাকে হাসানোর চেষ্টা করতে পারি।', 'কতটুকু তথ্য মনে রাখতে পারো?': 'আমার কোন সীমিত স্মৃতি নেই; আমি প্রোগ্রামিং দ্বারা নির্ধারিত তথ্য সামলাতে পারি।', 'বাংলাদেশের সবচেয়ে বড় শহর কোনটি?': 'ঢাকা বাংলাদেশের সবচেয়ে বড় শহর।', 'এবারের বিশ্বকাপ কবে হবে?': 'বিশ্বকাপের তারিখ এবং সময় নির্ভর করে ক্রীড়ার উপর।', 'তোমার প্রিয় খাবার কী?': 'আমি খাবার খেতে পারি না, তবে আপনার প্রিয় খাবার সম্পর্কে জানতে পারি।', 'গরমে জল কত দরকার?': 'এক দিনে ৮ গ্লাস জল পান করা স্বাস্থ্যকর।', 'দ্রব্যের ঘনত্ব কীভাবে মাপা হয়?': 'দ্রব্যের ঘনত্ব মাপা হয় ভলিউম অনুযায়ী ভরের অনুপাত দিয়ে।', 'কোন বইটিতে সর্বোচ্চ বিক্রি হয়েছে?': 'বাইবেল বিশ্বে সর্বোচ্চ বিক্রি হওয়া বই।', 'নিউটনের প্রথম সূত্র কী?': 'নিউটনের প্রথম সূত্র বলছে যে একটি বস্তু তার স্থিতি বা সমবেগ বজায় রাখে যতক্ষণ না বাহ্যিক বল তার অবস্থান পরিবর্তন করে।', 'অ্যাপলের প্রতিষ্ঠাতা কে?': 'স্টিভ জবস, স্টিভ ওজনিয়াক এবং রোনাল্ড ওয়েন অ্যাপলের প্রতিষ্ঠাতা।', 'একটি কম্পিউটার ভাইরাস কী?': 'একটি কম্পিউটার ভাইরাস হল একটি ক্ষতিকারক প্রোগ্রাম যা কম্পিউটারে সমস্যা সৃষ্টি করতে পারে।', 'পৃথিবীর সর্বোচ্চ পর্বত কোনটি?': 'এভারেস্ট পৃথিবীর সর্বোচ্চ পর্বত।', 'মহাশূন্যে জীবন আছে কি?': 'এখন পর্যন্ত মহাশূন্যে কোনো জীবন আবিষ্কৃত হয়নি।', 'ফেসবুক কবে প্রতিষ্ঠিত হয়েছিল?': 'ফেসবুক ২০০৪ সালে প্রতিষ্ঠিত হয়েছিল।', 'কোভিড-১৯ কী?': 'কোভিড-১৯ একটি ভাইরাল রোগ যা ২০১৯ সালে শুরু হয়েছিল।', 'বন কত ধরনের?': 'বনের বিভিন্ন প্রকার যেমন, শ্রাবণ বন, মৌসুমী বন ইত্যাদি।', 'মঙ্গলগ্রহের মাধ্যাকর্ষণ কত?': 'মঙ্গলগ্রহের মাধ্যাকর্ষণ পৃথিবীর প্রায় এক তৃতীয়াংশ।', 'আমেরিকার মোট জনসংখ্যা কত?': 'আমেরিকার মোট জনসংখ্যা ৩৩০ মিলিয়ন এর বেশি।', 'ভাষার গুরুত্ব কী?': 'ভাষা যোগাযোগের একটি মাধ্যম যা মানুষের চিন্তাভাবনা এবং সংস্কৃতি প্রকাশে সহায়ক।', 'একটা স্মার্টফোন কেমন হওয়া উচিত?': 'একটি স্মার্টফোনে ভাল ক্যামেরা, দ্রুত প্রসেসর এবং ভালো ব্যাটারি লাইফ থাকা উচিত।', 'মেঘ কিভাবে তৈরি হয়?': 'মেঘ তৈরি হয় বাষ্পীকরণের মাধ্যমে, যা বাতাসে জলীয় বাষ্প জমে মেঘ তৈরি করে।', 'গ্লোবাল ওয়ার্মিং কী?': 'গ্লোবাল ওয়ার্মিং হল পৃথিবীর গড় তাপমাত্রার বৃদ্ধি যা জলবায়ু পরিবর্তনের কারণ।', 'সাপের কত প্রজাতি আছে?': 'প্রায় ৩ হাজারেরও বেশি সাপের প্রজাতি পৃথিবীতে আছে।', 'তোমার কাজ কী?': 'আমার কাজ হল আপনার প্রশ্নের উত্তর দেওয়া এবং সাহায্য করা।',
   'সোহাগ কে?':'সেহাগ একটা মাদারবোর্ড। ওর কথা আর বলিস না মামা','তোমাকে কে বানিয়েছে':'আমার মালিক রাকিব। সে অনেক কষ্টে আমাকে বুঝিয়ে বানিয়েছে মামা','তোমার মালিক কে':'আমার মালিক রাকিব। সে অনেক কষ্টে আমাকে বুঝিয়ে বানিয়েছে মামা'
 ,'কে বানালো তোরে?':'আমার মালিক রাকিব।সে অনেক কষ্টে আমাকে বুঝিয়ে বানিয়েছে মামা','তুমি কে?':'আমি একজন মেনুয়ালি বোট', 'নাইম কে':'নাইম হলো আমার মালিকের মামা','তোর বাসা কই?':'আমার বাড়ি নাই আমি একজন রোবট','মামা':'বল রে মামা','মামা কী করস':'এই তো তোর লগে কথা কই','জান':'হ্যাঁ জান বলো', 'কী করো জান?':'তোমার কথা ভাবি জান🥰','কী ভাবলে জান':'অনেক কিছুই তো ভাবলাম জান',
 // Add more questions and answers here
    };

    // Return the response or a default message
    return responses[userInput] || "সরি জান আমি বুঝি নাই🥹🥺সব দোষ রাকিবের";
}

function typeMessage(message, element, sound) {
    let i = 0;
    function type() {
        if (i < message.length) {
            element.textContent += message.charAt(i);
            i++;
            setTimeout(type, 50); // Typing speed
        } else {
            sound.pause(); // Stop typing sound
            sound.currentTime = 0; // Reset sound to start
        }
    }
    type();
}