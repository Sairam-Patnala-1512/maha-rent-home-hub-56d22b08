import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MessageSquare,
  Send,
  Bot,
  User,
  FileText,
  Shield,
  ClipboardList,
  HelpCircle,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const supportCategories = [
  {
    id: "application",
    icon: FileText,
    title: "Application Issue",
    description: "Issues with submitting or tracking applications",
  },
  {
    id: "verification",
    icon: Shield,
    title: "Verification Issue",
    description: "Problems with eKYC, DigiLocker, or Police verification",
  },
  {
    id: "agreement",
    icon: ClipboardList,
    title: "Agreement Issue",
    description: "Questions about rental agreement or signing",
  },
  {
    id: "other",
    icon: HelpCircle,
    title: "Other Query",
    description: "General questions or other concerns",
  },
];

const botResponses = {
  application: [
    { type: "bot", text: "I understand you're having an issue with your application. Could you please describe the problem in more detail?" },
  ],
  verification: [
    { type: "bot", text: "I see you need help with verification. Our verification process includes eKYC, DigiLocker integration, and Police verification. Which step are you facing issues with?" },
  ],
  agreement: [
    { type: "bot", text: "I can help you with agreement-related queries. Are you looking for help with viewing, signing, or downloading your rental agreement?" },
  ],
  other: [
    { type: "bot", text: "I'm here to help! Please describe your query and I'll do my best to assist you." },
  ],
  default: [
    { type: "bot", text: "Thank you for your message. I'm connecting you with our support team. Meanwhile, you can also raise a formal grievance ticket for faster resolution." },
  ],
};

export function ChatSupport({ open, onOpenChange }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! I'm MHADA Support Assistant. How can I help you today? Please select a category below." },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [ticketCreated, setTicketCreated] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id);
    setMessages((prev) => [
      ...prev,
      { type: "user", text: category.title },
      ...botResponses[category.id],
    ]);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", text: inputValue },
      ...botResponses.default,
    ]);
    setInputValue("");
  };

  const handleCreateTicket = () => {
    setTicketCreated(true);
    setMessages((prev) => [
      ...prev,
      { type: "bot", text: "✅ Support ticket #TKT" + Date.now().toString().slice(-6) + " has been created. Our team will reach out to you within 24-48 hours." },
    ]);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setTicketCreated(false);
    setMessages([
      { type: "bot", text: "Hello! I'm MHADA Support Assistant. How can I help you today? Please select a category below." },
    ]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 pb-3 border-b bg-primary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-base">MHADA Support</DialogTitle>
                <p className="text-xs text-muted-foreground">Online • Typically replies instantly</p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                "flex gap-2",
                msg.type === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.type === "bot" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[75%] px-3 py-2 rounded-lg text-sm",
                  msg.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {msg.text}
              </div>
              {msg.type === "user" && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}

          {!selectedCategory && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {supportCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium">{category.title}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {selectedCategory && !ticketCreated && (
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={handleCreateTicket}
              >
                <ClipboardList className="h-4 w-4 mr-2" />
                Create Support Ticket
              </Button>
            </div>
          )}

          {ticketCreated && (
            <div className="pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground"
                onClick={handleReset}
              >
                Start New Conversation
              </Button>
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-card">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={!selectedCategory}
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!inputValue.trim() || !selectedCategory}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
