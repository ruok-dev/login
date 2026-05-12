"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({ 
  size = 12, 
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY
}: PupilProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const pupil = pupilRef.current.getBoundingClientRect();
    const pupilCenterX = pupil.left + pupil.width / 2;
    const pupilCenterY = pupil.top + pupil.height / 2;

    const deltaX = mouseX - pupilCenterX;
    const deltaY = mouseY - pupilCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
};

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  isClosedTight?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({ 
  size = 48, 
  pupilSize = 16, 
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  isClosedTight = false,
  forceLookX,
  forceLookY
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;

    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  if (isClosedTight) {
    return (
      <div 
        className="flex items-center justify-center transition-all duration-150"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <div className="w-full h-1 bg-[#1E293B] rounded-full rotate-12" />
        <div className="absolute w-full h-1 bg-[#1E293B] rounded-full -rotate-12" />
      </div>
    );
  }

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: `${size}px`,
        height: isBlinking ? '2px' : `${size}px`,
        backgroundColor: eyeColor,
        overflow: 'hidden',
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
    </div>
  );
};

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"sign-in" | "sign-up">("sign-in");
  
  const toggleTab = () => {
    setActiveTab((prev) => (prev === "sign-in" ? "sign-up" : "sign-in"));
    setError("");
  };
  
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  
  const [isTealBlinking, setIsTealBlinking] = useState(false);
  const [isIndigoBlinking, setIsIndigoBlinking] = useState(false);
  
  const [focusedInput, setFocusedInput] = useState<'email' | 'password' | null>(null);
  const [isHoveringChars, setIsHoveringChars] = useState(false);

  const tealRef = useRef<HTMLDivElement>(null);
  const indigoRef = useRef<HTMLDivElement>(null);
  const amberRef = useRef<HTMLDivElement>(null);
  const coralRef = useRef<HTMLDivElement>(null);

  // Custom Cursor and Global Mouse Tracker
  useEffect(() => {
    // Character mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    // Custom Cursor logic — dot + lagging ring
    const dot = document.createElement("div");
    dot.style.cssText = `
      position: fixed; top: 0; left: 0;
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #a1a1aa;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: width 0.2s ease, height 0.2s ease, background 0.2s ease;
      will-change: transform;
    `;

    const ring = document.createElement("div");
    ring.style.cssText = `
      position: fixed; top: 0; left: 0;
      width: 36px; height: 36px;
      border-radius: 50%;
      border: 1.5px solid rgba(161,161,170,0.5);
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      transition: width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s ease, background 0.35s ease;
      will-change: transform;
    `;

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    // Hide default cursor
    const style = document.createElement("style");
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    // Dot follows mouse exactly
    let mouseClientX = 0, mouseClientY = 0;
    const onMouseMoveCursor = (e: MouseEvent) => {
      mouseClientX = e.clientX;
      mouseClientY = e.clientY;
      dot.style.transform = `translate(calc(-50% + ${e.clientX}px), calc(-50% + ${e.clientY}px))`;
    };

    // Ring follows with lerp lag
    let ringX = 0, ringY = 0;
    let rafId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animateRing = () => {
      ringX = lerp(ringX, mouseClientX, 0.12);
      ringY = lerp(ringY, mouseClientY, 0.12);
      ring.style.transform = `translate(calc(-50% + ${ringX}px), calc(-50% + ${ringY}px))`;
      rafId = requestAnimationFrame(animateRing);
    };
    rafId = requestAnimationFrame(animateRing);

    const interactiveSelectors = 'a, button, input, [role="tab"], label';
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest?.(interactiveSelectors)) {
        dot.style.width = "8px";
        dot.style.height = "8px";
        dot.style.background = "#71717a";
        ring.style.width = "52px";
        ring.style.height = "52px";
        ring.style.borderColor = "rgba(161,161,170,0.8)";
        ring.style.background = "rgba(161,161,170,0.05)";
      } else {
        dot.style.width = "6px";
        dot.style.height = "6px";
        dot.style.background = "#a1a1aa";
        ring.style.width = "36px";
        ring.style.height = "36px";
        ring.style.borderColor = "rgba(161,161,170,0.5)";
        ring.style.background = "transparent";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", onMouseMoveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", onMouseMoveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId);
      dot.remove();
      ring.remove();
      style.remove();
    };
  }, []);

  // Blinking effects
  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
    const scheduleBlink = (setBlink: React.Dispatch<React.SetStateAction<boolean>>) => {
      return setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          scheduleBlink(setBlink);
        }, 150);
      }, getRandomBlinkInterval());
    };
    
    const timeout1 = scheduleBlink(setIsTealBlinking);
    const timeout2 = scheduleBlink(setIsIndigoBlinking);
    return () => { clearTimeout(timeout1); clearTimeout(timeout2); };
  }, []);

  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>, factorX: number = 20, factorY: number = 30) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };

    if (isLoading && !isCelebrating) {
      return { faceX: 0, faceY: -5, bodySkew: 0 };
    }

    if (isLoginFailed) {
      return { faceX: 0, faceY: 10, bodySkew: 0 };
    }

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;

    // Turn away completely when password is SHOWN (Privacy!)
    if (password.length > 0 && showPassword) {
      return {
        faceX: -15, 
        faceY: -10,
        bodySkew: 10
      };
    }

    // Stare intently when password is HIDDEN and focused
    if (focusedInput === 'password' && !showPassword) {
      return {
        faceX: 15,
        faceY: 5,
        bodySkew: -5
      };
    }

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    const faceX = Math.max(-15, Math.min(15, deltaX / factorX));
    const faceY = Math.max(-10, Math.min(10, deltaY / factorY));

    const bodySkew = isHoveringChars ? 0 : Math.max(-6, Math.min(6, -deltaX / 120));

    return { faceX, faceY, bodySkew };
  };

  const tealPos = calculatePosition(tealRef, 20, 30);
  const indigoPos = calculatePosition(indigoRef, 25, 35);
  const amberPos = calculatePosition(amberRef, 15, 25);
  const coralPos = calculatePosition(coralRef, 18, 28);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoginFailed(false);

    const triggerError = (msg: string) => {
      setError(msg);
      setIsLoginFailed(true);
      setTimeout(() => setIsLoginFailed(false), 500);
      setIsLoading(false);
    };

    if (activeTab === "sign-up" && !name.trim()) {
      return triggerError("O nome é obrigatório.");
    }
    if (!email.trim()) {
      return triggerError("O e-mail é obrigatório.");
    }
    if (!email.includes("@") || !email.includes(".")) {
      return triggerError("Insira um endereço de e-mail válido.");
    }
    if (!password) {
      return triggerError("A senha é obrigatória.");
    }

    setIsLoading(true);

    try {
      const endpoint = activeTab === "sign-in" ? "/api/auth/login" : "/api/auth/signup";
      const payload = activeTab === "sign-in" 
        ? { email, password } 
        : { name, email, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        return triggerError(data.error || "Ocorreu um erro inesperado.");
      }

      // Sucesso
      setIsLoading(false);
      if (activeTab === "sign-up") {
        setIsSignUpSuccess(true);
      }
      setIsCelebrating(true);
      setTimeout(() => setIsCelebrating(false), 3000);

    } catch (err) {
      triggerError("Falha na conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };
  const isHidingEyes = password.length > 0 && showPassword;
  const isStaringAtPassword = focusedInput === 'password' && !showPassword;
  return (
    <>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        /* Custom scroll & animations */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        [data-state="active"] .stagger-1 { animation: fadeUp 0.4s ease forwards 0.05s; opacity: 0; }
        [data-state="active"] .stagger-2 { animation: fadeUp 0.4s ease forwards 0.1s; opacity: 0; }
        [data-state="active"] .stagger-3 { animation: fadeUp 0.4s ease forwards 0.15s; opacity: 0; }
        [data-state="active"] .stagger-4 { animation: fadeUp 0.4s ease forwards 0.2s; opacity: 0; }
        [data-state="active"] .stagger-5 { animation: fadeUp 0.4s ease forwards 0.25s; opacity: 0; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px) rotate(-1deg); }
          50% { transform: translateX(4px) rotate(1deg); }
          75% { transform: translateX(-4px) rotate(-1deg); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }

        @keyframes successPop {
          0% { opacity: 0; transform: scale(0.8); }
          70% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .success-icon { animation: successPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        @keyframes celebrateJump {
          0% { transform: translateY(0) rotate(0deg) scaleX(1); }
          20% { transform: translateY(-25px) rotate(-4deg) scaleX(0.95); }
          40% { transform: translateY(-40px) rotate(3deg) scaleX(1.02); }
          55% { transform: translateY(-15px) rotate(-2deg) scaleX(0.98); }
          70% { transform: translateY(-30px) rotate(2deg) scaleX(1.01); }
          85% { transform: translateY(-5px) rotate(-1deg) scaleX(0.99); }
          100% { transform: translateY(0) rotate(0deg) scaleX(1); }
        }
        .celebrate-1 { animation: celebrateJump 0.8s ease-in-out 0ms both; }
        .celebrate-2 { animation: celebrateJump 0.8s ease-in-out 80ms both; }
        .celebrate-3 { animation: celebrateJump 0.8s ease-in-out 160ms both; }
        .celebrate-4 { animation: celebrateJump 0.8s ease-in-out 240ms both; }

        /* Clean UI Utilities */
        .clean-font { font-family: 'Outfit', sans-serif; }
        
        .clean-input {
          background-color: #F9FAFB !important;
          border: 1px solid transparent !important;
          border-radius: 12px !important;
          padding: 0 16px !important;
          height: 48px !important;
          font-size: 14.5px !important;
          color: #111827 !important;
          transition: all 0.25s ease !important;
          width: 100% !important;
        }
        .clean-input:hover {
          background-color: #F3F4F6 !important;
        }
        .clean-input:focus {
          background-color: #FFFFFF !important;
          border-color: #D1D5DB !important;
          box-shadow: 0 0 0 4px rgba(243, 244, 246, 1) !important;
          outline: none !important;
        }
        .clean-input::placeholder {
          color: #9CA3AF !important;
        }
        
        .clean-btn {
          background-color: #111827 !important;
          color: white !important;
          border-radius: 12px !important;
          border: none !important;
          height: 48px !important;
          font-weight: 500 !important;
          font-size: 14.5px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: all 0.25s ease !important;
          width: 100% !important;
        }
        .clean-btn:hover {
          background-color: #000000 !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
        }
        .clean-btn:active {
          transform: translateY(0) !important;
        }

        .social-btn-clean {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          color: #374151;
          border-radius: 12px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 500;
          font-size: 14px;
          transition: all 0.2s ease;
        }
        .social-btn-clean:hover {
          background-color: #F9FAFB;
          border-color: #D1D5DB;
        }

        .left-panel-bg {
          background-color: #F0F2F5;
          background-image: radial-gradient(#D1D5DB 1px, transparent 1px);
          background-size: 32px 32px;
          position: relative;
        }
        .left-panel-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, transparent 20%, #F0F2F5 100%);
          pointer-events: none;
        }
      `}</style>

      <div className="min-h-screen flex w-full clean-font bg-white">
        {/* LEFT COLUMN - Characters */}
        <div 
          className="hidden lg:flex w-[55%] left-panel-bg flex-col justify-between items-center p-12 relative overflow-hidden"
          onMouseEnter={() => setIsHoveringChars(true)}
          onMouseLeave={() => setIsHoveringChars(false)}
        >
          {/* Logo Top Left */}
          <div className="absolute top-10 left-12 z-20">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
              <span className="text-xl font-bold tracking-tight text-gray-900">ruokDEV</span>
            </div>
          </div>

          <div className="flex-1 w-full flex items-center justify-center relative z-10">
            <div className={cn("relative w-[500px] h-[350px]", isLoginFailed && "animate-shake")}>
              
              {/* Floor Shadow */}
              <div className="absolute bottom-[-5px] w-full h-[15px] bg-gray-300/60 blur-lg rounded-[100%] z-0" />
              <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent z-10" />

              {/* Teal */}
              <div ref={tealRef} className={cn("absolute bottom-0 shadow-xl z-10 transition-all duration-500 ease-out", isHoveringChars && "translate-y-[-5px]", isCelebrating && "celebrate-1")}
                style={{
                  left: '60px', width: '160px', height: (focusedInput || password.length > 0) ? '380px' : '340px',
                  backgroundColor: '#0D9488', borderRadius: '35px 35px 0 0',
                  transform: `skewX(${tealPos.bodySkew}deg) ${isHidingEyes ? 'translateX(-20px)' : (isStaringAtPassword ? 'translateX(8px)' : '')}`,
                  transformOrigin: 'bottom center',
                }}>
                <div className="absolute flex gap-6 transition-all duration-500 ease-out"
                  style={{
                    left: isHidingEyes ? '15px' : (isStaringAtPassword ? '65px' : `${45 + tealPos.faceX}px`),
                    top: isHidingEyes ? '60px' : `${45 + tealPos.faceY}px`,
                  }}>
                  <EyeBall size={18} pupilSize={7} maxDistance={5} isBlinking={isTealBlinking || isHidingEyes} isClosedTight={isLoading && !isCelebrating} forceLookX={isHidingEyes ? -4 : (isStaringAtPassword ? 4 : undefined)} forceLookY={isHidingEyes ? 4 : (isStaringAtPassword ? 3 : undefined)} />
                  <EyeBall size={18} pupilSize={7} maxDistance={5} isBlinking={isTealBlinking || isHidingEyes} isClosedTight={isLoading && !isCelebrating} forceLookX={isHidingEyes ? -4 : (isStaringAtPassword ? 4 : undefined)} forceLookY={isHidingEyes ? 4 : (isStaringAtPassword ? 3 : undefined)} />
                </div>
              </div>

              {/* Indigo */}
              <div ref={indigoRef} className={cn("absolute bottom-0 shadow-xl z-20 transition-all duration-500 ease-out", isHoveringChars && "translate-y-[-8px]", isCelebrating && "celebrate-2")}
                style={{
                  left: '210px', width: '120px', height: '280px',
                  backgroundColor: '#4338CA', borderRadius: '25px 25px 0 0',
                  transform: `skewX(${indigoPos.bodySkew * 1.5}deg) ${isHidingEyes ? 'translateX(-30px)' : (isStaringAtPassword ? 'translateX(8px)' : '')}`,
                  transformOrigin: 'bottom center',
                }}>
                <div className="absolute flex gap-5 transition-all duration-500 ease-out"
                  style={{
                    left: isHidingEyes ? '10px' : (isStaringAtPassword ? '45px' : `${28 + indigoPos.faceX}px`),
                    top: isHidingEyes ? '45px' : `${35 + indigoPos.faceY}px`,
                  }}>
                  <EyeBall size={16} pupilSize={6} maxDistance={4} isBlinking={isIndigoBlinking || isHidingEyes} isClosedTight={isLoading && !isCelebrating} forceLookX={isHidingEyes ? -4 : (isStaringAtPassword ? 4 : undefined)} forceLookY={isHidingEyes ? 4 : (isStaringAtPassword ? 3 : undefined)} />
                  <EyeBall size={16} pupilSize={6} maxDistance={4} isBlinking={isIndigoBlinking || isHidingEyes} isClosedTight={isLoading && !isCelebrating} forceLookX={isHidingEyes ? -4 : (isStaringAtPassword ? 4 : undefined)} forceLookY={isHidingEyes ? 4 : (isStaringAtPassword ? 3 : undefined)} />
                </div>
              </div>

              {/* Coral */}
              <div ref={coralRef} className={cn("absolute bottom-0 shadow-xl z-30 transition-all duration-500 ease-out", isHoveringChars && "translate-y-[-3px]", isCelebrating && "celebrate-3")}
                style={{
                  left: '0px', width: '220px', height: '180px',
                  backgroundColor: '#F43F5E', borderRadius: '100px 100px 0 0',
                  transform: `skewX(${coralPos.bodySkew}deg) ${isHidingEyes ? 'translateX(-15px)' : (isStaringAtPassword ? 'translateX(4px)' : '')}`,
                  transformOrigin: 'bottom center',
                }}>
                <div className="absolute flex gap-7 transition-all duration-200 ease-out"
                  style={{
                    left: isHidingEyes ? '25px' : (isStaringAtPassword ? '105px' : `${80 + coralPos.faceX}px`),
                    top: isHidingEyes ? '100px' : `${85 + coralPos.faceY}px`,
                  }}>
                  {!isLoading ? (
                    <>
                      <Pupil size={13} maxDistance={5} forceLookX={isHidingEyes ? -4 : (isStaringAtPassword ? 4 : undefined)} forceLookY={isHidingEyes ? 4 : (isStaringAtPassword ? 3 : undefined)} />
                      <Pupil size={13} maxDistance={5} forceLookX={isHidingEyes ? -4 : (isStaringAtPassword ? 4 : undefined)} forceLookY={isHidingEyes ? 4 : (isStaringAtPassword ? 3 : undefined)} />
                    </>
                  ) : (
                    <>
                       <div className="w-3 h-[3px] bg-[#1E293B] rounded-full mt-1.5" />
                       <div className="w-3 h-[3px] bg-[#1E293B] rounded-full mt-1.5" />
                    </>
                  )}
                </div>
              </div>

              {/* Amber */}
              <div ref={amberRef} className={cn("absolute bottom-0 shadow-xl z-40 transition-all duration-500 ease-out", isHoveringChars && "translate-y-[-5px]", isCelebrating && "celebrate-4")}
                style={{
                  left: '290px', width: '130px', height: '220px',
                  backgroundColor: '#F59E0B', borderRadius: '65px 65px 15px 15px',
                  transform: `skewX(${amberPos.bodySkew}deg) ${isHidingEyes ? 'translateX(-8px)' : (isStaringAtPassword ? 'translateX(4px)' : '')}`,
                  transformOrigin: 'bottom center',
                }}>
                <div className="absolute flex gap-5 transition-all duration-200 ease-out"
                  style={{
                    left: isHidingEyes ? '12px' : (isStaringAtPassword ? '65px' : `${45 + amberPos.faceX}px`),
                    top: isHidingEyes ? '65px' : `${45 + amberPos.faceY}px`,
                  }}>
                  {!isLoading ? (
                    <>
                      <Pupil size={12} maxDistance={5} forceLookX={isHidingEyes ? -4 : (isStaringAtPassword ? 4 : undefined)} forceLookY={isHidingEyes ? 4 : (isStaringAtPassword ? 3 : undefined)} />
                      <Pupil size={12} maxDistance={5} forceLookX={isHidingEyes ? -4 : (isStaringAtPassword ? 4 : undefined)} forceLookY={isHidingEyes ? 4 : (isStaringAtPassword ? 3 : undefined)} />
                    </>
                  ) : (
                    <>
                      <div className="w-2.5 h-[3px] bg-[#1E293B] rounded-full mt-1.5" />
                      <div className="w-2.5 h-[3px] bg-[#1E293B] rounded-full mt-1.5" />
                    </>
                  )}
                </div>
                <div className={cn("absolute bg-[#1E293B] rounded-full transition-all duration-200 ease-out", isLoading ? "scale-x-50 w-5 left-[50px]" : "w-10 h-[5px]")}
                  style={!isLoading ? {
                    left: isHidingEyes ? '12px' : (isStaringAtPassword ? '60px' : `${40 + amberPos.faceX}px`),
                    top: isHidingEyes ? '90px' : `${85 + amberPos.faceY}px`,
                  } : { top: '85px' }}
                />
              </div>

            </div>
          </div>

          <div className="absolute bottom-10 z-20 flex gap-8 text-xs font-medium text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors">Termos</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Contato</a>
          </div>
        </div>

        {/* RIGHT COLUMN - Clean Form */}
        <div className="flex-1 flex items-center justify-center p-8 sm:p-12 relative bg-white">
          <div className="w-full max-w-[400px]">
            
            <div className="lg:hidden flex items-center gap-2 mb-10">
              <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
              <span className="text-xl font-bold tracking-tight text-gray-900">ruokDEV</span>
            </div>

            {isSignUpSuccess ? (
              <div className="flex flex-col items-center justify-center gap-6 py-12 text-center fadeUp">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-2 success-icon">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Conta Criada!</h2>
                <p className="text-gray-500 text-sm">Bem-vindo(a) <span className="text-gray-900 font-medium">{name}</span>, sua conta está pronta para uso.</p>
                <button
                  className="mt-4 text-sm font-semibold text-black hover:underline underline-offset-4 transition-all"
                  onClick={() => { setIsSignUpSuccess(false); setActiveTab("sign-in"); setEmail(""); setPassword(""); setName(""); }}
                >
                  Voltar para o Login
                </button>
              </div>
            ) : (
            <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as any); setError(""); }} className="w-full">
              
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
                  {activeTab === 'sign-in' ? 'Bem-vindo de volta' : 'Criar nova conta'}
                </h1>
                <p className="text-gray-500 text-sm">
                  {activeTab === 'sign-in' ? 'Insira seus dados para acessar o painel.' : 'Preencha os dados abaixo para começar.'}
                </p>
              </div>

              <TabsList className="flex w-full bg-gray-100 rounded-xl p-1 mb-8 h-auto">
                <TabsTrigger value="sign-in" className="flex-1 py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm text-gray-500 font-semibold transition-all border-none">Entrar</TabsTrigger>
                <TabsTrigger value="sign-up" className="flex-1 py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm text-gray-500 font-semibold transition-all border-none">Criar conta</TabsTrigger>
              </TabsList>

              {error && (
                <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm text-center font-medium animate-shake">
                  {error}
                </div>
              )}

              <TabsContent value="sign-in" className="outline-none">
                <div className="flex flex-col gap-6">
                  
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="space-y-2 stagger-1">
                      <Label htmlFor="signin-email" className="text-[13px] font-semibold text-gray-700 ml-1">Endereço de e-mail</Label>
                      <Input id="signin-email" type="email" placeholder="nome@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocusedInput('email')} onBlur={() => setFocusedInput(null)} required className="clean-input" />
                    </div>

                    <div className="space-y-2 stagger-2">
                      <Label htmlFor="signin-password" className="text-[13px] font-semibold text-gray-700 ml-1">Senha</Label>
                      <div className="relative">
                        <Input id="signin-password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} onFocus={() => setFocusedInput('password')} onBlur={() => setFocusedInput(null)} required className="clean-input pr-10" />
                        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between stagger-3 pt-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" className="border-gray-300 rounded-[4px] data-[state=checked]:bg-black data-[state=checked]:border-black" />
                        <Label htmlFor="remember" className="text-[13px] font-medium text-gray-500 cursor-pointer hover:text-gray-800 transition-colors">Lembrar de mim</Label>
                      </div>
                      <a href="#" className="text-[13px] font-semibold text-black hover:underline transition-colors">Esqueceu a senha?</a>
                    </div>

                    <button type="submit" disabled={isLoading} className="clean-btn mt-2 stagger-4">
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : "Entrar na Conta"}
                    </button>
                  </form>

                  <div className="flex items-center gap-3 stagger-5 mt-2">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Ou continue com</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 stagger-5">
                    <button type="button" className="social-btn-clean">
                      <FaGoogle className="text-[15px]" /> Google
                    </button>
                    <button type="button" className="social-btn-clean">
                      <FaGithub className="text-[15px]" /> GitHub
                    </button>
                  </div>

                </div>
              </TabsContent>

              <TabsContent value="sign-up" className="outline-none">
                <div className="flex flex-col gap-6">
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="space-y-2 stagger-1">
                      <Label htmlFor="signup-name" className="text-[13px] font-semibold text-gray-700 ml-1">Nome Completo</Label>
                      <Input id="signup-name" type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setFocusedInput('email')} onBlur={() => setFocusedInput(null)} className="clean-input" />
                    </div>
                    
                    <div className="space-y-2 stagger-2">
                      <Label htmlFor="signup-email" className="text-[13px] font-semibold text-gray-700 ml-1">E-mail</Label>
                      <Input id="signup-email" type="email" placeholder="nome@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocusedInput('email')} onBlur={() => setFocusedInput(null)} className="clean-input" />
                    </div>

                    <div className="space-y-2 stagger-3">
                      <Label htmlFor="signup-password" className="text-[13px] font-semibold text-gray-700 ml-1">Senha</Label>
                      <div className="relative">
                        <Input id="signup-password" type={showPassword ? "text" : "password"} placeholder="Crie uma senha" value={password} onChange={(e) => setPassword(e.target.value)} onFocus={() => setFocusedInput('password')} onBlur={() => setFocusedInput(null)} className="clean-input pr-10" />
                        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button type="submit" disabled={isLoading} className="clean-btn mt-4 stagger-4">
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : "Criar Conta Grátis"}
                    </button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
}

export const Component = LoginPage;
