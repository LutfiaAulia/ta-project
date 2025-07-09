import React, { useState, useRef, useEffect } from "react";
import {
    Bot,
    Clock,
    MessageCircle,
    Send,
    User,
    X,
    CheckCheck,
} from "lucide-react";

type Message = {
    id: number;
    text: string;
    sender: "bot" | "user";
    timestamp: string;
    status: "read" | "sent";
};

interface ChatbotProps {}

const Chatbot: React.FC<ChatbotProps> = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'Halo! Selamat datang di layanan bantuan UMKM Sumatera Barat. Saya siap membantu Anda mencari informasi UMKM! 😊\n\nAnda bisa mencari berdasarkan:\n• Kategori (makanan, kerajinan, fashion)\n• Lokasi (padang, bukittinggi, dll)\n• Nama produk\n\nContoh: "makanan padang" atau "kerajinan payakumbuh"',
            sender: "bot",
            timestamp: new Date().toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            status: "read",
        },
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const quickReplies = [
        "makanan padang",
        "kerajinan tangan",
        "fashion bukittinggi",
        "bantuan",
    ];

    const handleSendMessage = async () => {
        if (inputMessage.trim() === "") return;

        const newMessage: Message = {
            id: messages.length + 1,
            text: inputMessage,
            sender: "user",
            timestamp: new Date().toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            status: "sent",
        };

        setMessages((prev) => [...prev, newMessage]);
        const currentMessage = inputMessage;
        setInputMessage("");
        setIsTyping(true);

        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            console.log("Sending message:", currentMessage); // Debug log

            const res = await fetch("/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken || "",
                },
                body: JSON.stringify({ message: currentMessage }),
            });

            console.log("Response status:", res.status); // Debug log

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log("Response data:", data); // Debug log

            const botMessage: Message = {
                id: newMessage.id + 1,
                text:
                    data.response ||
                    "Maaf, terjadi kesalahan dalam memproses pesan.",
                sender: "bot",
                timestamp: new Date().toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                status: "read",
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error:", error); // Debug log

            const errorMessage: Message = {
                id: newMessage.id + 1,
                text: "Maaf, terjadi kesalahan saat menghubungi server. Silakan coba lagi nanti atau hubungi admin di 0751-123456.",
                sender: "bot",
                timestamp: new Date().toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                status: "read",
            };

            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isChatOpen) {
            inputRef.current?.focus();
        }
    }, [isChatOpen, isTyping]);

    const MessageBubble: React.FC<{ message: Message }> = ({ message }) => (
        <div
            className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
            } mb-4`}
        >
            <div
                className={`flex items-end max-w-xs lg:max-w-md ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
            >
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === "user"
                            ? "bg-blue-500 ml-2"
                            : "bg-green-500 mr-2"
                    }`}
                >
                    {message.sender === "user" ? (
                        <User size={16} className="text-white" />
                    ) : (
                        <Bot size={16} className="text-white" />
                    )}
                </div>
                <div
                    className={`rounded-2xl px-4 py-3 shadow-sm ${
                        message.sender === "user"
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm"
                            : "bg-white text-gray-800 border rounded-bl-sm"
                    }`}
                >
                    <p className="text-sm whitespace-pre-line leading-relaxed">
                        {message.text}
                    </p>
                    <div
                        className={`flex items-center justify-end mt-1 text-xs ${
                            message.sender === "user"
                                ? "text-blue-100"
                                : "text-gray-500"
                        }`}
                    >
                        <Clock size={10} className="mr-1" />
                        <span>{message.timestamp}</span>
                        {message.sender === "user" && (
                            <CheckCheck size={12} className="ml-1" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const handleQuickReply = (reply: string) => {
        setInputMessage(reply);
        // Auto focus input setelah quick reply
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    };

    if (!isChatOpen) {
        return (
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 animate-pulse"
                >
                    <MessageCircle size={24} />
                </button>
            </div>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-80 h-96 flex flex-col overflow-hidden border">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                            <Bot size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold">Assistant UMKM</h3>
                            <p className="text-xs opacity-90">
                                Online • Siap membantu
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsChatOpen(false)}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    {messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                    ))}
                    {isTyping && (
                        <div className="flex justify-start mb-4">
                            <div className="flex items-end">
                                <div className="w-8 h-8 rounded-full bg-green-500 mr-2 flex items-center justify-center">
                                    <Bot size={16} className="text-white" />
                                </div>
                                <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length === 1 && (
                    <div className="px-4 pb-2">
                        <p className="text-xs text-gray-500 mb-2">
                            Coba pencarian cepat:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {quickReplies.map((reply, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuickReply(reply)}
                                    className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input */}
                <div className="p-4 border-t bg-white">
                    <div className="flex items-center space-x-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            placeholder="Ketik pesan Anda..."
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isTyping}
                        />

                        <button
                            onClick={handleSendMessage}
                            disabled={isTyping || inputMessage.trim() === ""}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
